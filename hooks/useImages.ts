import useSWR, { cache } from 'swr';
import fetch from 'cross-fetch';
import { Meta } from '../pages/api/meta';

const fetcher = ({ images }: Pick<Meta, 'images'>, path: string) => {
  return async () => {
    const res = await fetch(path).then((res) => res.json());
    return { images: [...images, ...res.images] };
  };
};

export default function useImages({ images, totalImages, version }: Meta) {
  const key = 'images';

  const shouldRequest = images.length < totalImages; // Don't have all images yet.

  // FUTURE: proper pagination
  const { data, error } = useSWR(
    key,
    fetcher({ images }, `/api/meta?page=1&v=${version}`),
    {
      initialData: { images },
      revalidateOnMount: !cache.has(key) && shouldRequest, // Fetch data on mount & not in cache
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    }
  );

  return {
    images: data.images,
    totalImages,
    isLoading: !error && !data,
    isError: error,
  };
}
