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

// const [index, setIndex] = useState(0);

// const handleSelect = (selectedIndex, e) => {
//   setIndex(selectedIndex);
// };

import React, { useState, useEffect, Fragment } from 'react'
import { Carousel, Card, Container, Button } from 'react-bootstrap'
import imgProduct from '../assets/img/product04.png'
import Cookies from "js-cookie";
import Axios from "axios";
import { Link } from 'react-router-dom';


export default function Home() {
  const [restaurants, setRestaurants] = useState([])
  const [resto, setResto] = useState({})

  useEffect(() => {
    const token = Cookies.get('token')
    async function getdata() {
      const result = await Axios({
        method: 'get',
        url: "http://127.0.0.1:8080/restaurant",
        headers: { 'Authorization': 'Bearer ' + token }
      })
      console.log(result.data.data)
      setRestaurants(result.data.data)
      setResto(restaurants[0])
    }
    getdata()
  }, [])
  return (
    <Container>
      <div class="row justify-content-sm-center">

        <div class="col-sm-10 col-sm-push-1">
          <div class="product" >
            <div class="product-img">
              <img src={"http://localhost:8080"+resto.logo.substr(6)} alt="" />
            </div>
            <div class="product-body">
              <h3 class="product-name">{resto.name}</h3>
              <h4 class="product-price"> {resto.description} </h4>
              {/* <button class="restauran-detail-btn"><i class="fa fa-eye"></i> See Detail</button> */}
              <Link to={{pathname:'/restaurant/'.concat(resto.id),
                      state:resto}} class="restauran-detail-btn"><i class="fa fa-eye"></i> See Detail</Link>
            </div>
          </div>
        </div>

        {resto.map((v, i) =>

          <div class="col-md-4 col-sm-6" onMouseEnter={()=> setResto(v)}>
            <div class="product" >
              <div class="product-img">
                <img src={"http://localhost:8080"+v.logo.substr(6)} alt="" />
              </div>
              <div class="product-body">
              <h3 class="product-name">{resto.name}</h3>
              <h4 class="product-price"> {resto.description} </h4>
              </div>
            </div>
          </div>
        )}

      </div>
    </Container>
  )
}






    // <Carousel activeIndex={index} onSelect={handleSelect}>
    //   <Carousel.Item>
    //     <img
    //       className="d-block w-100"
    //       src="https://www.dumetschool.com/images/fck/html-carousel-hasil.JPG"
    //       alt="First slide"
    //       onClick={(e)=>console.log(e)}
    //     />
    //     <Carousel.Caption>
    //       <h3>nama restaurant</h3>
    //       <p>deskripsi restaurant</p>
    //     </Carousel.Caption>
    //   </Carousel.Item>
    // </Carousel>