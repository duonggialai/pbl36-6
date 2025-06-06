import React, { useState, useEffect } from 'react';
import '../styles/Banner.css';

const Banner = () => {
    const images = [ "../img/banner1.png", "../img/Banner2.png", "../img/Banner3.png","https://images.unsplash.com/photo-1567581935884-3349723552ca?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" ];

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
