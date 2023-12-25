import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CarouselItem } from './CarouselItem';
import { IconButton } from '@fluentui/react/lib/Button';
import { initializeIcons } from '@fluentui/react/lib/Icons';
import { Stack } from '@fluentui/react/lib/Stack';
import next from '../../assets/next.png';
import previous from '../../assets/previous.png';

initializeIcons();

interface CarouselDataItem {
  title: string;
  description: string;
  image: string;
  link: string;
  key: string;
  order: number; 
}

const Carousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [carouselData, setCarouselData] = useState<CarouselDataItem[]>([]);

  useEffect(() => {
    axios.get<CarouselDataItem[]>('https://6584f29b022766bcb8c7b0b2.mockapi.io/api/carouselData/items')
      .then(response => setCarouselData(response.data))
      .catch(error => console.error('Error fetching carousel data:', error));
  }, []); 

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
      <Stack horizontal horizontalAlign="center" verticalAlign="center" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '45px' }}>
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
              width: 'auto',
              height: 'auto',
              padding: '0',
            },
          }}
          onClick={prevSlide}
        />
        <div style={{ maxWidth: '1000px', maxHeight: '450px', overflow: 'hidden' }}>
          {sortedCarouselData.map((item, index) => (
            <CarouselItem
              title={item.title || ''}
              description={item.description || ''}
              image={item.image || ''}
              link={item.link || ''}
              key={item.key} 
              isActive={index === currentSlide} order={item.order} />
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
              width: 'auto',
              height: 'auto',
              padding: '0',
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
