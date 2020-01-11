import React from 'react'
import { Link } from 'react-router-dom'


export default function Product(props) {
   return (

      <div class="product" >
         <div class="product-img">
            <img src={"http://localhost:8080".concat(props.item.image)} alt="" />
         </div>
         <div class="product-body">
            <p class="product-category"> <Link href="#">{props.item.category}</Link></p>
            <h3 class="product-name">{props.item.name}</h3>
            <h4 class="product-price">{props.item.price}</h4>
            {!props.norestaurant && <p class="product-category"> <Link href="#"> {props.item.restauran} </Link></p>}
            <div class="product-rating">
               {Array(Math.round(props.item.rating)).fill(
                  <i class="fa fa-star"></i>
               )}
            </div>
            <Link to={{ pathname: '/detail/' + props.item.id, state: props.item }}>
               <button class="add-to-cart-btn">
                  <i class="fa fa-eye"></i> See Detail
            </button>
            </Link>
            <div class="product-btns">
            </div>
         </div>
      </div>

   )
}
