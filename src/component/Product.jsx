import React from 'react'
import imgProduct from '../assets/img/product04.png'
import { Link } from 'react-router-dom'


export default function Product(props) {
   return (
      <div class="product" >
         <div class="product-img">
            <img src={imgProduct} alt="" />
            <div class="product-label">
               <span class="sale">-30%</span>
            </div>
         </div>
         <div class="product-body">
            <p class="product-category"> <Link href="#">Category</Link></p>
            <h3 class="product-name">product name goes here</h3>
            <h4 class="product-price">$980.00</h4>
            {!props.norestaurant && <p class="product-category"> <Link href="#">Restaurant</Link></p>}
            <div class="product-rating">
               <i class="fa fa-star"></i>
               <i class="fa fa-star"></i>
               <i class="fa fa-star"></i>
               <i class="fa fa-star"></i>
            </div>
            <button class="add-to-cart-btn"><i class="fa fa-eye"></i> See Detail</button>
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
