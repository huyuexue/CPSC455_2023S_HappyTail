import React from 'react';
import AWS from 'aws-sdk';

//const s3 = new AWS.S3();
const s3 = new AWS.S3({
    accessKeyId: 'KEY',
    secretAccessKey: 'SECKEY',
    region: 'us-east-1',
  });
const bucketName = 'happytailsimages';

AWS.config.credentials.refresh((error) => {
    if (error) {
      console.error('Error refreshing credentials:', error);
      return;
    }
  
    // Your S3 upload code here
  });

async function uploadImageToS3(file) {
    const fileName = file.name;
    const fileKey = `images/${fileName}`; 
    const params = {
      Bucket: bucketName,
      Key: fileKey,
      Body: file,
      ACL: 'public-read', 
    };
    params.ContentType = file.type;
  
    try {
      const data = await s3.upload(params).promise();
      return data.Location; 
    } catch (error) {
      console.error('Error uploading image:', error);
      throw new Error('Image upload failed');
    }
  }
  
  export default uploadImageToS3;
  
