import {useState} from 'react';
import PropTypes from 'prop-types';
import Slider from "react-slick";
import {Overlay,Header,Indicator} from './styles'

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


const ImagesZoom = ({images,onClose}) => {
    const [currentSlide,setCurrentSlide] = useState(0);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        afterChange:(slider)=>setCurrentSlide(slider),
        slidesToShow: 1,
        slidesToScroll: 1
      };        
    return(
        <Overlay>
            <Header>
                <h1>상세이미지</h1>
                <button onClick={onClose}>x</button>
            </Header>
            <div>
                <Slider {...settings}>
                    {images.map((img)=>{
                        return <div key={img.src}><img src={img.src} alt={img.src}/></div>
                    })}
                </Slider>
                <Indicator>
                    {currentSlide +'/'+ images.length}
                </Indicator>
            </div>
        </Overlay>
    )
}

ImagesZoom.propTypes = {
    images:PropTypes.arrayOf(PropTypes.object).isRequired,
    onClose:PropTypes.func.isRequired,
}

export default ImagesZoom;