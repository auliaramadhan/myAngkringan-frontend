import React, { Fragment } from 'react'
import ListItem from './ListItem/ListItem'
import imgProduct from '../assets/img/product04.png'
import useDataFetching from '../service/fetchHook';


export default function Restaurants(props) {
   
   const {location, match} = props
   const { loading, results, error } = useDataFetching("http://127.0.0.1:8080/item?",
    {byRestaurant:match.params.id});
   return (
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
                  <h2 class="product-name">{location.state.logo}</h2>
                  <div>
                     <h3 class="product-price">lorem ipsum</h3>
                  </div>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

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
               <ListItem byrestaurant={1} />
            </div>
         </div>

      </div>
   )
}
