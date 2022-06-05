// A script to process images in a dir.
import fs from "fs/promises";
import path from "path";
import sharp from "sharp";
import smartcrop from "smartcrop-sharp";
import Exifr from "exifr";

import {
  gridWidths,
  postWidths,
  sigma1,
  gridPreviewSize,
  sigma2,
  postPreviewSize,
} from "../config";

const srcDir = process.argv[2];
const destDir = process.argv[3];
// Intended to be executed from root dir
async function main() {
  // FUTURE: Refactor into a pipeline to run on new image[s], reuse buffers.
  console.log("Starting...");

  const files = (await fs.readdir(srcDir))
    .filter((e: string) => e.match(/^[0-9]*.jpeg$/)) // This is the expected filename
    .sort(function sortByFileId(a: string, b: string) {
      return parseInt(a.split(".")[0]) - parseInt(b.split(".")[0]);
    });

  if (files.length === 0) {
    return console.error("No files found!");
  }
  const totalImages = files.length;

  console.log("Creating responsive image sizes...");
  await Promise.all(files.map(generateGridImages));
  await Promise.all(files.map(generatePostImages));

  console.log(`Generating blurred images for manifest...`);
  const descriptions = await Promise.all(files.map(getExif));
  const gridPreviews = await Promise.all(files.map(generateGridPreview));
  const postPreviews = await Promise.all(files.map(generatePostPreview));

  let images = [];
  for (let i = 0; i < totalImages; i++) {
    images.push({
      id: i,
      gridPreview: gridPreviews[i],
      postPreview: postPreviews[i],
      description: descriptions[i],
    });
  }
  images.reverse();

  console.log("Writing manifest...`");
  await fs.writeFile(
    `${destDir}/manifest.json`,
    JSON.stringify({
      images,
      totalImages: files.length,
      version: new Date().getTime(), // Used to see if manifest has changed.
    })
  );
}

main();

async function getExif(filename: string) {
  const buffer = await fs.readFile(`${srcDir}/${filename}`);
  const output = await Exifr.parse(buffer, { xmp: true });
  const description = output.ImageDescription || output.description.value; // Note: Hacky. Apple Photos puts captions in both these places

  if (!description) console.warn(`${filename} was missing a caption!`);
  if (description.length > 60) {
    console.error(`${filename} has a caption > 60 characters!`); // TODO: rough estimate, will optimize later
  }

  return description;
}

// REFACTOR: gridPreview is based on the context-aware grid photo, so dirty
// destDir is hackily passed
async function generateGridPreview(_filename: string, i: number) {
  return (
    await sharp(`${destDir}/g-${i}-${gridWidths[gridWidths.length - 1]}.jpeg`)
      .blur(sigma1)
      .jpeg()
      .resize(gridPreviewSize)
      .toBuffer()
  ).toString("base64");
}

async function generatePostPreview(filename: string) {
  return (
    await sharp(`${srcDir}/${filename}`)
      .jpeg()
      .resize(postPreviewSize)
      .blur(sigma2)
      .toBuffer()
  ).toString("base64");
}

// These take the default image aspect ratio
async function generatePostImages(filename: string, i: number) {
  await Promise.all([
    ...postWidths.map((width: number) =>
      sharp(`${srcDir}/${filename}`)
        .resize(width)
        .jpeg()
        .toFile(`${destDir}/${i}-${width}.jpeg`)
    ),
    ...postWidths.map((width: number) =>
      sharp(`${srcDir}/${filename}`)
        .resize(width)
        .webp({ reductionEffort: 6 })
        .toFile(`${destDir}/${i}-${width}.webp`)
    ),
  ]);
}

// Generate context-aware images cropped to be square
async function generateGridImages(filename: string, index: number) {
  await Promise.all([
    ...gridWidths.map(async (width: number) =>
      (await applySmartCrop(path.join(srcDir, filename), width, width))
        .jpeg()
        .toFile(path.join(destDir, `g-${index}-${width}.jpeg`))
    ),
    ...gridWidths.map(async (width: number) =>
      (await applySmartCrop(path.join(srcDir, filename), width, width))
        .webp({ reductionEffort: 6 })
        .toFile(path.join(destDir, `g-${index}-${width}.webp`))
    ),
  ]);
}

// Finds the best crop of src and writes the cropped and resized image to dest.
async function applySmartCrop(src: string, width: number, height: number) {
  return smartcrop
    .crop(src, {
      //ruleOfThirds: false,
      width: width,
      height: height,
      minScale: 1.0,
    })
    .then(function (result) {
      const crop = result.topCrop;
      return sharp(src)
        .extract({
          width: crop.width,
          height: crop.height,
          left: crop.x,
          top: crop.y,
        })
        .resize(width, height);
    });
}
