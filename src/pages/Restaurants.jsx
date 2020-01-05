import React, { Fragment } from 'react'
import ListItem from './ListItem/ListItem'
import imgProduct from '../assets/img/product04.png'


export default function Restaurants(props) {
   console.log(props)

   const {location, match} = props
   return (

      <div className="section">
         <div class='container'>
            <div className="row">
               <div class="col-md-6">
                  <div id="product-main-img">
                     <div class="product-preview">
                        <img src={"http://localhost:8080"+location.state.logo.substr(6)} alt={imgProduct} />
                     </div>
                  </div>
               </div>
   
               <div class="col-md-6">
                  <div class="product-details">
                     <h2 class="product-name">{location.state.name}</h2>
                     {/* <div>
                        <h3 class="product-price">lorem ipsum</h3>
                     </div> */}
                     <p> {location.state.description} </p>
   
                     <ul class="product-links">
                        <li>Share:</li>
                        <li><a href="#"><i class="fab fa-facebook"></i></a></li>
                        <li><a href="#"><i class="fab fa-twitter"></i></a></li>
                        <li><a href="#"><i class="fab fa-google-plus"></i></a></li>
                        <li><a href="#"><i class="fa fa-envelope"></i></a></li>
                     </ul>
                  </div>
               </div>
            </div>
   
            <div class="card">
               <div class="card-body">
                  <ListItem byrestaurant={match.params.id}  />
               </div>
            </div>
   
         </div>
      </div>
   )
}
