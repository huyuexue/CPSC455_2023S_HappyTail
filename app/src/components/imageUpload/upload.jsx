import React, { useState } from 'react';
import uploadImageToS3 from './imageUpload';

const ImageUpload = ({handleChange}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = () => {
    if (selectedFile) {
      uploadImageToS3(selectedFile)
        .then((url) => {
          handleChange("setPhoto", {picture: url});
        })
        .catch((error) => {
          console.error('Error uploading image:', error);
        });
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default ImageUpload;
