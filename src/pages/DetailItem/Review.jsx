import React from 'react'

export default function Review() {
   return (
      <div id="product-tab">
         <div class="row">

            <div class="col-md-7">
               <div id="reviews">
                  <ul class="reviews">
                     <li>
                        <div class="review-heading">
                           <h5 class="name">John</h5>
                           <p class="date">27 DEC 2018, 8:0 PM</p>
                           <div class="review-rating">
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star-o empty"></i>
                           </div>
                        </div>
                        <div class="review-body">
                           <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
                        </div>
                     </li>
                     <li>
                        <div class="review-heading">
                           <h5 class="name">John</h5>
                           <p class="date">27 DEC 2018, 8:0 PM</p>
                           <div class="review-rating">
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star empty"></i>
                           </div>
                        </div>
                        <div class="review-body">
                           <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
                        </div>
                     </li>
                     <li>
                        <div class="review-heading">
                           <h5 class="name">John</h5>
                           <p class="date">27 DEC 2018, 8:0 PM</p>
                           <div class="review-rating">
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star-o empty"></i>
                           </div>
                        </div>
                        <div class="review-body">
                           <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
                        </div>
                     </li>
                  </ul>
                  <ul class="reviews-pagination">
                     <li><a href="#"><i class="fa fa-angle-left"></i></a></li>
                     <li class="active">1</li>
                     <li><a href="#">2</a></li>
                     <li><a href="#">3</a></li>
                     <li><a href="#">4</a></li>
                     <li><a href="#"><i class="fa fa-angle-right"></i></a></li>
                  </ul>
               </div>
            </div>

            <div class="col-md-5">
               <div id="review-form">
                  <form class="review-form">
                     <input class="input" type="text" placeholder="Your Name" />
                     <input class="input" type="email" placeholder="Your Email" />
                     <textarea class="input" placeholder="Your Review"></textarea>
                     <div class="input-rating">
                        <span>Your Rating: </span>
                        <div class="stars">
                           <input id="star5" name="rating" value="5" type="radio" /><label for="star5"></label>
                           <input id="star4" name="rating" value="4" type="radio" /><label for="star4"></label>
                           <input id="star3" name="rating" value="3" type="radio" /><label for="star3"></label>
                           <input id="star2" name="rating" value="2" type="radio" /><label for="star2"></label>
                           <input id="star1" name="rating" value="1" type="radio" /><label for="star1"></label>
                        </div>
                     </div>
                     <button class="primary-btn">Submit</button>
                  </form>
               </div>
            </div>

         </div>
      </div>

   )
}
