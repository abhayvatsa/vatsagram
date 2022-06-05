import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import util from 'util';
import path from 'path';
const readFile = util.promisify(fs.readFile);
import { PromiseValue } from '../../lib/utils';
import { IMAGES_PER_PAGE } from '../../config';

export interface Image {
  id: number;
  gridPreview: string;
  postPreview: string;
  description: string;
}

function getImagesInPageRange(page: number | undefined, totalImages: number) {
  if (typeof page === 'undefined') {
    return [0, totalImages];
  }

  if (page === 0) {
    const start = totalImages - IMAGES_PER_PAGE * (page + 1);
    const end = totalImages - IMAGES_PER_PAGE * page;
    return [start, end];
  }
  if (page === 1) {
    const start = 0;
    const end = totalImages - IMAGES_PER_PAGE;
    return [start, end];
  }

  // FUTURE: implement pagination
  return [IMAGES_PER_PAGE, totalImages];
}

export type Meta = PromiseValue<ReturnType<typeof getMeta>>;
export const getMeta: (page?: number) => Promise<{
  totalImages: number;
  images: Image[];
  version: number;
}> = async function (page) {
  const manifest = await readFile(
    path.resolve('./public/manifest.json'),
    'utf8'
  );

  const { images, totalImages, version } = JSON.parse(manifest);
  const [start, end] = getImagesInPageRange(page, totalImages);

  return {
    images: images.slice(totalImages - end, totalImages - start), // images array is reversed
    totalImages,
    version,
  };
};

export const getGridMeta: (page?: number) => Promise<{
  totalImages: number;
  images: Omit<Image, 'postPreview'>[];
  version: number;
}> = async function (page) {
  const { images: rawImages, totalImages, version } = await getMeta(page);

  // Drop a property
  const images = rawImages.map(({ postPreview, ...rest }) => rest);

  return {
    images,
    totalImages,
    version,
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(`Server: requesting ${req.url}...`);

  res.setHeader('Cache-Control', 'max-age=31536000'); // 'never expires': https://www.ietf.org/rfc/rfc2616.txt

  const page = parseInt(req.query.page?.toString()) || undefined;
  const { images, totalImages } = await getGridMeta(page);

  if (req.method === 'GET') {
    return res.json({
      images,
      totalImages,
    });
  } else {
    res.statusCode = 501;
    res.json({});
  }
}
