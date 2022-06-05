import Head from "next/head";
import { NextPage, GetStaticProps, InferGetStaticPropsType } from "next";
import { getPostSrcFromIndex } from "../lib/helpers";
import ImageGrid from "../components/ImageGrid";
import { useImages } from "../hooks/";
import { getGridMeta } from "./api/meta";
import { ogImageDefault } from "../config";

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  initialMeta,
}) => {
  const { images } = useImages(initialMeta);

  const ogImage =
    images.length > 0 ? getPostSrcFromIndex(images[0].id) : ogImageDefault;

  return (
    <>
      <Head>
        <meta property="og:image" content={ogImage} />
      </Head>
      <ImageGrid images={images} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: { initialMeta: await getGridMeta(0) },
  };
};

export default Home;
