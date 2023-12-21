// import { useState, useEffect } from 'react';
// import { getCarouselData } from '../services/carouselData';

// interface CarouselItem {
//   title: string;
//   description: string;
//   image: string;
//   link: string;
//   order: number;
// }

// export const useCarousel = () => {
//   const [carouselData, setCarouselData] = useState<CarouselItem[]>([]);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const fetchData = async () => {
//       const data = await getCarouselData();
//       setCarouselData(data.sort((a, b) => a.order - b.order));
//     };

//     fetchData();
//   }, []);

//   const handleNext = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === carouselData.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   const handlePrev = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === 0 ? carouselData.length - 1 : prevIndex - 1
//     );
//   };

//   return { carouselData, handleNext, handlePrev };
// };
