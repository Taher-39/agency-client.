import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import  slide1   from'../../../images/carousel-1.png';
import slide2 from'../../../images/carousel-2.png';
import slide3 from'../../../images/carousel-3.png';
import slide4 from'../../../images/carousel-4.png';
import './Works.css';

function Works() {
    return (
        <div className='works bg-dark my-5'>
            <div>
                <Carousel className='py-5'>
                    <div>
                        <img src={slide2} alt="" style={{width: '500px'}} />
                    </div>
                    <div>
                        <img src={slide1} alt="" style={{width: '500px'}} />
                    </div>
                    <div>
                        <img src={slide3} alt="" style={{width: '500px', height: '400px'}} />
                    </div>
                    <div>
                        <img src={slide4} alt="" style={{width: '500px'}} />
                    </div>
                </Carousel>
            </div>
        </div>
    );
}

export default Works;
