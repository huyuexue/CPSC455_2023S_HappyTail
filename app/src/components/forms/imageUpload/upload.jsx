import React, { useState } from 'react';
import uploadImageToS3 from './imageUpload';

const ImageUpload = ({handleChange}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = () => {
    if (selectedFile) {
      uploadImageToS3(selectedFile)
        .then((url) => {
          //setImageUrl(url);
          console.log(url);
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
      {imageUrl && <img src={imageUrl} alt="Uploaded" />}
    </div>
  );
};

export default ImageUpload;
