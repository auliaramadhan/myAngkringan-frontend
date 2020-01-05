import React from 'react'
import { Link } from 'react-router-dom'


export default function Product(props) {
   return (
      <div class="product" >
         <div class="product-img">
            <img src={"http://localhost:8080".concat(props.item.image.substr(6))} alt="" />
            {/* <div class="product-label">
               <span class="sale">-30%</span>
            </div> */}
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
            <Link to={{pathname:'/detail/'+props.item.id,state:props.item}}
             class="add-to-cart-btn"><i class="fa fa-eye"></i> See Detail</Link>
            <div class="product-btns">
               {/* <button class="add-to-wishlist"><i class="fa fa-heart-o"></i><span class="tooltipp">add to wishlist</span></button>
                     <button class="add-to-compare"><i class="fa fa-exchange"></i><span class="tooltipp">add to compare</span></button>
                     <button class="quick-view"><i class="fa fa-eye"></i><span class="tooltipp">quick view</span></button> */}
            </div>
         </div>
         {/* <div class="add-to-cart">
                  <button class="add-to-cart-btn"><i class="fa fa-shopping-cart"></i> add to cart</button>
               </div> */}
      </div>

   )
}
