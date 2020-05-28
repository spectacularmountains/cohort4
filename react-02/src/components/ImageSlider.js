import React, {Component} from 'react'
import SimpleImageSlider from "react-simple-image-slider";
import Img1 from '../assets/IMG_4216.jpg'
import Img2 from '../assets/IMG_4217.jpg'
import Img3 from '../assets/IMG_4218.jpg'
import Img4 from '../assets/IMG_4219.jpg'
import Img5 from '../assets/IMG_4220.jpg'
import Img6 from '../assets/IMG_4221.jpg'

class ImageSlider extends Component {
    render() {
        const images = [
            { url: Img1 },
            { url: Img2 },
            { url: Img3 },
            { url: Img4 },
            { url: Img5 },
            { url: Img6 },
        ];

        return (
            <div>
                <SimpleImageSlider
                    style={{marginTop: "10px"}}
                    width={733}
                    height={550}
                    images={images}
                />
            </div>
        );
    }
}

export default ImageSlider; 