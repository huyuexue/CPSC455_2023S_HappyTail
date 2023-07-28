import React from 'react';
import AWS from 'aws-sdk';

const awsKey = process.env.REACT_APP_ACCESS_KEY_ID;
const awsSecretKey = process.env.REACT_APP_SECRET_ACCESS_KEY;

//const s3 = new AWS.S3();
const s3 = new AWS.S3({
    accessKeyId: awsKey,
    secretAccessKey: awsSecretKey,
    region: 'us-east-1',
  });
const bucketName = 'happytailsimages';

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
  
