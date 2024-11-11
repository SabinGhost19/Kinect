import React, { useEffect, useState } from 'react';
import { customAxios } from '../utils/axiosFetchInstance';
interface HomePageProps {
  title?: string; // Prop opțional
}

const HomePage: React.FC<HomePageProps> = ({ title = 'HOME PAGE' }) => {
  const url = 'data/all_data/67324934fab1b6585cb3db44';
  //const id = '67324317635eaa39e072b74b';
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const handleFetching = async () => {
      try {
        const response = await customAxios.get(`${url}`);
        if (response.status === 200) {
          console.log(response.data);
        }
      } catch (error) {
        console.log('ERRORRR:.....', error);
      }
    };
    handleFetching();
  }, [index]);

  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">{title}</h1>
      <button
        onClick={() => {
          setIndex(index + 1);
        }}
      >
        HOME
      </button>
    </div>
  );
};

export default HomePage;
