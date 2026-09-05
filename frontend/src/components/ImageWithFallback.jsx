import React, { useState } from 'react';

const ImageWithFallback = ({ src, alt, fallback = '/NexaCartLogo.png', ...props }) => {
  const [imageSource, setImageSource] = useState(src);

  return (
    <img
      {...props}
      src={imageSource || fallback}
      alt={alt}
      loading="lazy"
      onError={() => setImageSource(fallback)}
    />
  );
};

export default ImageWithFallback;
