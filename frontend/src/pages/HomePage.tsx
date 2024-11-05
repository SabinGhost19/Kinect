import React from 'react';

interface HomePageProps {
  title?: string; // Prop opțional
}

const HomePage: React.FC<HomePageProps> = ({ title = 'HOME PAGE' }) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">{title}</h1>
    </div>
  );
};

export default HomePage;
