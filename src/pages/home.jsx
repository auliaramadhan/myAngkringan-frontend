import React, { useState, useEffect, Fragment } from 'react'
import { Container } from 'react-bootstrap'
import Axios from "axios";
import { Link } from 'react-router-dom';
import { getRestaurants } from '../redux/action/getData'
import { connect } from 'react-redux';


function Home(props) {
  const [restos, setRestos] = useState([])
  useEffect(() => {
    // async function getdata() {
    //   const result = await Axios({
    //     method: 'get', url: "http://127.0.0.1:8080/restaurant",
    //     headers: { 'Authorization': 'Bearer ' }
    //   })
    //   console.log(result.data.data[0])
    //   setRestos(result.data.data)
    // }
    // getdata()
    props.dispatch(getRestaurants)
  }, [])
  const [restoran, setRestoran] = useState(restos[0])
  useEffect(() => {
    setRestos(props.restaurants.data)
    setRestoran(props.restaurants.data[0])
  }, [props.restaurants.data])

  return (
    <Container>
      <div class="row justify-content-sm-center">

        {!!restoran? <div class="col-sm-10 col-sm-push-1">
          <div class="product" >
            <div class="product-img">
              <img src={"http://localhost:8080" + restoran.logo} alt="" />
            </div>
            <div class="product-body">
              <h3 class="product-name">{restoran.name}</h3>
              <h4 class="product-price"> {resto.description} </h4>
              <button  class="restauran-detail-btn">
                <Link to={{pathname: '/restaurant/'.concat(resto.id),
                state: resto}}>
                  <i class="fa fa-eye"></i> See Detail
                </Link>
                </button>
            </div>
          </div>
        </div>: '' }

        {restos.map((v, i) =>

          <div class="col-md-4 col-sm-6" onClick={() => setRestoran(v)}>
            <div class="product" >
              <div class="product-img">
                <img src={"http://localhost:8080" + v.logo} alt="" />
              </div>
              <div class="product-body">
                <h3 class="product-name">{v.name}</h3>
                <h4 class="product-price"> {v.description} </h4>
              </div>
            </div>
          </div>
        )}

      </div>
    </Container>
  )
}

const mapStateToProps = state => {
  return {
    restaurants: state.restaurants
  }
}

export default connect(mapStateToProps)(Home)







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