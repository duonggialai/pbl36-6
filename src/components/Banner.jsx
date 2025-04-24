import React, { useState, useEffect } from 'react';
import '../styles/Banner.css';

const Banner = () => {
    const images = [ "../img/banner1.png", "../img/Banner2.png", "../img/Banner3.png" ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="banner">
      <img src={images[currentImageIndex]} alt="Banner" className="banner-image" />
      <button className="prev" onClick={goToPreviousImage}>&#10094; </button>
      <button className="next" onClick={goToNextImage}>&#10095;</button>
    </div>
  );
};

export default Banner;
