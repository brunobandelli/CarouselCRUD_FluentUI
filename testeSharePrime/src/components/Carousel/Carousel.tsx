// src/components/Carousel.tsx
import React, { useState } from 'react';
import { CarouselItem } from './CarouselItem';
import { carouselData } from '../../services/carouselData';
import { IconButton } from '@fluentui/react/lib/Button';
import { initializeIcons } from '@fluentui/react/lib/Icons';
import { Stack } from '@fluentui/react/lib/Stack';
// import { Image } from '@fluentui/react/lib/Image';
import next from '../../assets/next.png';
import previous from '../../assets/previous.png';

initializeIcons();

const Carousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % carouselData.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? carouselData.length - 1 : prevSlide - 1
    );
  };

  // Ordenar o array com base na propriedade 'order'
  const sortedCarouselData = [...carouselData].sort((a, b) => a.order - b.order);

  return (
    <div>
      <Stack horizontal  horizontalAlign="center" verticalAlign="center" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '45px' }} >
      <IconButton 
        iconProps={{
        iconName: '',
        imageProps: {
        src: previous,
        alt: 'Chevron Left',
        },
        }}
        styles={{
          root: {
            width: 'auto', // ou 'inherit' para herdar do elemento pai
            height: 'auto', // ou 'inherit' para herdar do elemento pai
            padding: '0', // Remova o padding padrão, se desejado
          },
        }}
        onClick={prevSlide}
        />
        <div style={{ maxWidth: '1000px', maxHeight: '450px', overflow: 'hidden' }}>
          {sortedCarouselData.map((item, index) => (
            <CarouselItem key={index} {...item} isActive={index === currentSlide} />
          ))}
        </div>
        <IconButton
        iconProps={{
        iconName: '',
        imageProps: {
        src: next,
        alt: 'Chevron Right',
        },
        }}
        onClick={nextSlide}
        styles={{
          root: {
            width: 'auto', // ou 'inherit' para herdar do elemento pai
            height: 'auto', // ou 'inherit' para herdar do elemento pai
            padding: '0', // Remova o padding padrão, se desejado
          },
        }}
        />
      </Stack>
      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        {sortedCarouselData.map((_, index) => (
          <span
            key={index}
            onClick={() => setCurrentSlide(index)}
            style={{
              cursor: 'pointer',
              display: 'inline-block',
              margin: '0 5px',
              borderRadius: '50%',
              width: '10px',
              height: '10px',
              backgroundColor: index === currentSlide ? '#ffb500' : '#ccc',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
