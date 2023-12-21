// src/pages/CarouselPage.tsx
import React from 'react';
import Carousel from '../components/Carousel/Carousel';

const CarouselPage: React.FC = () => {
  return (
    <div style={{ maxWidth: '1280px', margin: '90px', padding: '2rem', textAlign: 'center'}}>
      <Carousel />
    </div>
  );
};

export default CarouselPage;
