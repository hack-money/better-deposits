import React from "react";

interface ImageBoxProps {
  src: string;
}

const ImageBox: React.FC<ImageBoxProps> = ({ src }) => {
  return (
    <img
      src={src}
      alt=""
      width="100%"
      height="100%"
      style={{ padding: "20px" }}
    ></img>
  );
};

export default ImageBox;
