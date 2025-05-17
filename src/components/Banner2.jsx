import React, { useState, useEffect } from 'react';
import '../styles/Banner2.css';

const Banner2 = () => {
  const images = [ "/img/b1.png", "/img/b2.png", "/img/b3.png" ]; 

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); 

    return () => clearInterval(interval);
  }, [images.length]);

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
  <>
    <div className="banner-container">
      <img
        src={images[currentImageIndex]}
        alt="Banner"
        className="banner-image"
      />
      <button className="banner-btn prev" onClick={goToPreviousImage}>&#10094;</button>
      <button className="banner-btn next" onClick={goToNextImage}>&#10095;</button>
    </div>
    <div className='space'>


    </div>
  </>
  );
};

export default Banner2;
