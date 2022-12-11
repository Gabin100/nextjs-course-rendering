import React, { useEffect, useState } from 'react';

interface SalesData {
  id: string;
  username: string;
  volume: number;
}

const LastSales = () => {
  const [sales, setSales] = useState<SalesData[]>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch('https://jibuchat.firebaseio.com/sales.json')
      .then((response) => response.json())
      .then((data) => {
        const transformedSales: SalesData[] = [];
        for (const key in data) {
          transformedSales.push({
            id: key,
            username: data[key].username,
            volume: Number(data[key].volume),
          });
        }
        setSales(transformedSales);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!sales) {
    return <p>No data Found!</p>;
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
