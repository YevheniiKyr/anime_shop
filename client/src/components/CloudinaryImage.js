import React from 'react';

const CloudinaryImage = ({publicId, width = 500, height = 500, format = 'auto', quality = 'auto', alt = 'Image', styles}) => {

    const imageUrl = `https://res.cloudinary.com/${process.env.REACT_APP_CLOUD_NAME}/image/upload/c_scale,w_${width},q_${quality},f_${format}/${publicId}.jpg`;

    return (
        <img
            src={imageUrl}
            alt={alt}
            style={styles}
        />
    );
}

export default CloudinaryImage;