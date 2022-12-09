import { Fragment } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import path from 'path';
import fs from 'fs/promises';

type HomePageProps = {
  products: {
    id: string;
    title: string;
    description: string;
  }[];
  loadedProduct: {
    id: string;
    title: string;
    description: string;
  };
};

function ProductDetailsPage(props: HomePageProps) {
  const { loadedProduct } = props;
  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const productId = params?.pid;

  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData.toString()) as HomePageProps;

  if (!productId) {
    return {
      props: {},
      redirect: {
        destination: '/nodata',
      },
    };
  }

  const product = data.products.find((product) => product.id === productId);

  if (!product) {
    return { props: {}, notFound: true };
  }

  return {
    props: {
      loadedProduct: product,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { pid: 'p1' } },
      { params: { pid: 'p2' } },
      { params: { pid: 'p3' } },
    ],
    fallback: false,
  };
};

export default ProductDetailsPage;
