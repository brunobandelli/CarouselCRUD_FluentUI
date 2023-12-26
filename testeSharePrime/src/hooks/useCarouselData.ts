import { useState, useEffect } from 'react';
import axios from 'axios';

import { initializeIcons } from '@fluentui/react/lib/Icons';

initializeIcons();


interface CarouselDataItem {
  title: string;
  description: string;
  image: string;
  link: string;
  key: string;
  order: number;
}

export const useCarouselData = () => {
  const [carouselData, setCarouselData] = useState<CarouselDataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    axios.get<CarouselDataItem[]>('https://6584f29b022766bcb8c7b0b2.mockapi.io/api/carouselData/items')
      .then(response => setCarouselData(response.data))
      .catch(error => console.error('Error fetching carousel data:', error));
  }, []);

  const updateListAfterEvent = async () => {
    setLoading(true);
    try {
      const response = await axios.get<CarouselDataItem[]>('https://6584f29b022766bcb8c7b0b2.mockapi.io/api/carouselData/items');
      setCarouselData(response.data);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  return { carouselData, loading, error, updateListAfterEvent };
};
