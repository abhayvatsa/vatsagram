import { useEffect, useRef, FC } from 'react';
import { useInView } from 'react-intersection-observer';
import { useBooleanState } from '../hooks/';

function b64ToDataUrl(b64String: string) {
  // Schema: data:[<mediatype>][;base64],<data>
  return `data:image/jpeg;base64,${b64String}`; // Keep this jpeg for compatibility
}

// Blur up technique to improve percieved loading time
// Inspiration: https://css-tricks.com/the-blur-up-technique-for-loading-background-images/
const LazyImage: FC<{
  src: string;
  srcSets: { srcSet: string; type: string }[]; // Allow for multiple srcSets to enable webp + jpeg
  alt: string;
  b64Image: string;
  className?: string;
}> = ({ src, srcSets, alt, b64Image, className, ...delegated }) => {
  const imageEl = useRef<HTMLImageElement>();
  const [isLoaded, setIsLoaded] = useBooleanState(false);
  const { ref, inView } = useInView({ triggerOnce: true });

  useEffect(() => {
    setIsLoaded(imageEl?.current?.complete || false);
  }, [isLoaded]);

  return (
    <div className={className}>
      <style jsx>{`
        div {
          width: 100%;
          height: 100%;
          position: relative;
          display: flex;
          align-items: center;
        }

        .parent {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          position: absolute;
          width: 100%;
        }

        .image {
          max-height: 100%;
          width: 100%;
          object-fit: contain;
        }

        .show {
          z-index: 1;
        }

        .preview {
          position: relative;
        }
      `}</style>
      {inView ? (
        <picture className={`parent ${isLoaded ? 'show' : ''}`}>
          {srcSets.map(({ srcSet, type }) => (
            <source key={type} srcSet={srcSet} type={`image/${type}`} />
          ))}
          <img
            className="image"
            loading="lazy" // NOTE: Only supported in Blink
            alt={alt}
            ref={imageEl}
            onLoad={() => setIsLoaded(true)}
            src={src}
            {...delegated}
          />
        </picture>
      ) : null}
      <img
        ref={ref}
        alt={alt}
        className="preview image"
        crossOrigin="anonymous"
        src={b64ToDataUrl(b64Image)}
      />
    </div>
  );
};

export default LazyImage;
