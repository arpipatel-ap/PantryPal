import React from 'react';
import '../style/home.scss';
const CustomImage = ({imgSrc, pt}) =>{
  
  return (
    <div className="custom-image" style={{paddingTop: pt}}>
       <img src={imgSrc} alt="" style={{ width: '100%', objectfit: 'cover' }} />
  </div>
  );
}

export default CustomImage;