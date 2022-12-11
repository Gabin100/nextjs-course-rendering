import React, { useEffect, useState } from 'react';
import useSWR from 'swr';

interface SalesData {
  id: string;
  username: string;
  volume: number;
}

const LastSales = () => {
  const [sales, setSales] = useState<SalesData[]>();
  // const [isLoading, setIsLoading] = useState(false);

  const { data, error } = useSWR('url', (url) =>
    fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    if (data) {
      const transformedSales: SalesData[] = [];
      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: Number(data[key].volume),
        });
      }
      setSales(transformedSales);
    }
  }, [data]);

  // useEffect(() => {
  //   setIsLoading(true);
  //   fetch('https://jibuchat.firebaseio.com/sales.json')
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const transformedSales: SalesData[] = [];
  //       for (const key in data) {
  //         transformedSales.push({
  //           id: key,
  //           username: data[key].username,
  //           volume: Number(data[key].volume),
  //         });
  //       }
  //       setSales(transformedSales);
  //       setIsLoading(false);
  //     })
  //     .catch((error) => {
  //       setIsLoading(false);
  //       console.log(error);
  //     });
  // }, []);

  if (error) {
    return <p>No data Found!</p>;
  }

  if (!data || !sales) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <ul>
        {sales?.map((sale) => (
          <li key={sale.id}>
            {sale.username} - ${sale.volume}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LastSales;
