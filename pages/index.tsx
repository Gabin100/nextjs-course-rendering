import path from 'path';
import fs from 'fs/promises';

type HomePageProps = {
  products: {
    id: string;
    title: string;
    description: string;
  }[];
};

function HomePage(props: HomePageProps) {
  const { products } = props;
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.title}</li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData.toString()) as HomePageProps;
  return {
    props: {
      products: data.products,
    },
  };
}

export default HomePage;
