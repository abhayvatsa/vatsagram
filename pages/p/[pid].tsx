import { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { BackButton, Header, LazyImage } from '../../components/';
import { InfoIcon } from '../../icons';
import {
  getPostSrcFromIndex,
  getPostSrcSetsFromIndex,
} from '../../lib/helpers';
import { getMeta } from '../api/meta';

const Post: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  image: { id, description, postPreview },
  initialHistoryLength,
}) => {
  return (
    <>
      <style jsx>{`
        #post-page {
          padding-top: 49px;
          height: 100%;
        }

        p {
          margin-right: 8px;
          margin-left: 8px;
          line-wrap: nowrap;
          margin-top: 0px;
          margin-bottom: 0px;
          text-align: center;
          line-height: 20px;
        }
      `}</style>
      <Head>
        <title>{description}</title>
        <meta property="og:title" content={description} />
        <meta property="og:image" content={getPostSrcFromIndex(id)} />
      </Head>
      <Header>
        <BackButton
          isRouterBack={
            process.browser
              ? window.history.length > initialHistoryLength
              : false
          }
        />
        <p>{description}</p>
        <InfoIcon />
      </Header>
      <main id="post-page">
        <LazyImage
          src={getPostSrcFromIndex(id)}
          srcSets={getPostSrcSetsFromIndex(id)}
          alt={description}
          b64Image={postPreview}
        />
      </main>
    </>
  );
};

export async function getStaticPaths() {
  const { totalImages } = await getMeta();

  const paths = Array.from(Array(totalImages), (_x, i) => i)
    .reverse()
    .map((num) => ({
      params: {
        pid: num.toString(),
      },
    }));

  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async ({ params: { pid } }) => {
  const initialMeta = await getMeta(0);
  const id = parseInt(pid.toString());

  const { gridPreview, ...image } = (await getMeta()).images[
    initialMeta.totalImages - id - 1
  ]; // Images are ordered from max -> min

  return {
    props: {
      image,
    },
  };
};

export default Post;
