// src/components/Carousel/CarouselItem.tsx
import React from 'react';

interface CarouselItemProps {
  title: string;
  description: string;
  image: string;
  link: string;
  order: number;
  isActive: boolean;
}

export const CarouselItem: React.FC<CarouselItemProps> = ({
  title,
  description,
  image,
  link,
  // order,
  isActive,
}) => {

  const handleLinkClick = () => {
    window.open(link, '_blank');
  };
  
  return (
    <div
      style={{
        display: isActive ? 'flex' : 'none',
        maxWidth: '1000px',
        // maxHeight: '450px',
        maxHeight: '400px',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        margin: 'auto', 
        cursor: 'pointer',
        backgroundColor: 'white'
      }}
      onClick={handleLinkClick}
    >
      <div style={{ flex: '40%', padding: '20px', textAlign: 'start', fontSize: '16px', color:'black' }}>
        <h2>{title}</h2>
        <p style={{ fontSize: '12px', color: 'gray' }}>{description}</p>
      </div>
      <div style={{ flex: '60%', overflow: 'hidden' }}>
        <img
          src={image}
          alt={title}
          style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
    </div>
  );
};
