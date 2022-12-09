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

async function getData() {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData.toString()) as HomePageProps;

  return data;
}

function ProductDetailsPage(props: HomePageProps) {
  const { loadedProduct } = props;

  // if (!loadedProduct) {
  //   return <p>Loading...</p>;
  // }

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
  const data = await getData();

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
  const data = await getData();
  const ids = data.products.map((product) => product.id);
  const pathsWithparams = ids.map((id) => ({ params: { pid: id } }));
  return {
    paths: pathsWithparams,
    fallback: false,
  };
};

export default ProductDetailsPage;
