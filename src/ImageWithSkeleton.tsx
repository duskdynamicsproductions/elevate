import React, { useState, useEffect, ImgHTMLAttributes, useRef } from 'react';

interface ImageWithSkeletonProps extends ImgHTMLAttributes<HTMLImageElement> {
  containerClassName?: string;
  skeletonClassName?: string;
}

export function ImageWithSkeleton({ className = '', containerClassName = '', skeletonClassName = '', src, alt, ...props }: ImageWithSkeletonProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);
    
    // If the image is already cached/completed before React attaches onLoad, force loaded state
    if (imgRef.current && imgRef.current.complete) {
      setIsLoaded(true);
    }
  }, [src]);

  return (
    <div className={`relative overflow-hidden w-full h-full ${containerClassName}`}>
      {/* Skeleton Pulse */}
      {(!isLoaded && !hasError) && (
        <div className={`absolute inset-0 bg-elevate-paper/5 animate-pulse z-0 ${skeletonClassName}`} />
      )}
      
      {/* Actual Image */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={`transition-opacity duration-700 ease-in-out relative z-10 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        {...props}
      />
    </div>
  );
}
