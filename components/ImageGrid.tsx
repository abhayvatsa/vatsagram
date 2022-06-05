import { FC } from 'react';
import Link from 'next/link';
import LazyImage from '../components/LazyImage';
import { getGridSrcFromIndex, getGridSrcSetsFromIndex } from '../lib/helpers';
import { Image } from '../pages/api/meta';

function range(start: number, count: number) {
  return Array.apply(0, Array(count)).map(
    (_element: number, index: number) => index + start
  );
}

function chunk<T>(array: Array<T>, size: number) {
  let result = [];
  for (let value of array) {
    let lastArray = result[result.length - 1];
    if (!lastArray || lastArray.length == size) {
      result.push([value]);
    } else {
      lastArray.push(value);
    }
  }
  return result;
}

const Spacer = ({ remaining }) => {
  return remaining > 0
    ? range(0, remaining).map((i: number) => (
        <a className="grid-item" key={i} />
      ))
    : null;
};

const ImageGrid: FC<{ images: Image[] }> = ({ images }) => {
  const chunks = chunk(images, 3);

  return (
    // TODO: global jsx not ideal
    <main>
      <style global jsx>{`
        .image-grid {
          width: 100%;
          display: flex;
          flex-flow: row wrap;
        }

        .image-grid div:last-child {
          margin-bottom: 0px;
        }

        .image-row {
          width: 100%;
          display: flex;
          flex-direction: row;

          margin-bottom: 3px;
        }
        .image-row a:last-child {
          margin-right: 0px;
        }
        .grid-item {
          width: 33.33%;
          width: calc(100% / 3);
          margin-right: 3px;
        }
      `}</style>
      <div className="image-grid">
        {chunks.map((images, i: number) => (
          <div key={i} className="image-row">
            {images.map(({ id, description, gridPreview }) => {
              return (
                <Link key={id} href={`/p/${id}`}>
                  <a className="grid-item">
                    <LazyImage
                      key={id}
                      alt={description}
                      src={getGridSrcFromIndex(id)}
                      srcSets={getGridSrcSetsFromIndex(id)}
                      b64Image={gridPreview}
                    />
                  </a>
                </Link>
              );
            })}
            <Spacer remaining={3 - images.length} />
          </div>
        ))}
      </div>
    </main>
  );
};

export default ImageGrid;
