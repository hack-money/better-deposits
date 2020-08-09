import React from 'react';

interface ImageBoxProps {
  src: string;
}

export default function ImageBox({ src }: ImageBoxProps) {
  return (
    <img
      src={src}
      alt=""
      width="100%"
      height="100%"
      style={{ padding: '20px' }}
    ></img>
  );
}
