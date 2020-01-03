// import React from 'react'
// import Slider from 'infinite-react-carousel'
// // import '../resources/style.css'
// import { Container } from 'react-bootstrap'


// class  Home extends React.Component{
//     constructor (props){
//         super(props)
//         this.state = {

//         }
//     }




//   render() {
//     const settings =  {
//       autoplay: true,
//       dots: true,
//       duration: 100,
//       initialSlide: false,
//       infinite: true,
//     };
//     return (
//         <Container>
//       <div>
//         {/* <span>CustomSlider</span> */}
//         <Slider autoplay dots infinite>
//             <div><img src={require('../images/Carousal 1.jpg')} alt=""/></div>
//             <div><img src={require('../images/Carousal 2.jpg')} alt="Credit to Alisa Anton on Unsplash"/></div>
//             <div><img src={require('../images/Carousal 3.jpg')} alt="Credit to Igor Ovsyannykov on Unsplash"/></div>
//             <div><img src={require('../images/Carousal 4.jpg')} alt="Credit to Pierre Châtel-Innocenti on Unsplash"/></div>
//             <div><img src={require('../images/Carousal 1.jpg')} alt="Credit to Richard Nolan on Unsplash"/></div>
//             <div><img src={require('../images/Carousal 3.jpg')} alt="Credit to Cristina Gottardi on Unsplash"/></div>
//         </Slider>
//       </div>
//         </Container>

//     )
//   }
// }

// export default Home

import React , {useState, Fragment}from 'react'
import { Carousel } from 'react-bootstrap'

export default function Home() {

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  return (
    <Fragment>
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://www.dumetschool.com/images/fck/html-carousel-hasil.JPG"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://www.dumetschool.com/images/fck/html-carousel-hasil.JPG"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://www.dumetschool.com/images/fck/html-carousel-hasil.JPG"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </Fragment>
  )
}




