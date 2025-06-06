import React, { useState, useEffect } from 'react';
import '../styles/Banner2.css';

const Banner2 = () => {
  const images = [ "https://plus.unsplash.com/premium_photo-1680985551009-05107cd2752c?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "/img/b2.png", "/img/b3.png" ]; 

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
