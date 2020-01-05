import React, {useState, useEffect} from 'react'
import useDataFetching from '../../service/fetchHook';

export default function Review({id_item}) {
   const { loading, results, error } = useDataFetching("http://127.0.0.1:8080/review/"+id_item);
   const [reviews, setReviews] = useState([])

   useEffect(() => {
      setReviews(results.data)

   }, [])

   return (
      <div id="product-tab">
         <div class="row">
            <div class="col-md-7">
               <div id="reviews">
                  <ul class="reviews">
                     {reviews && reviews.length > 0 &&
                     reviews.map((v,i) => <li>
                        <div class="review-heading">
                           <h5 class="name">{v.first_name||"john"}
                           {v.last_name||"snow"} </h5>
                           <p class="date">{v.created_on}</p>
                           <div class="review-rating">
                           {Array(Math.round(v.rating)).fill(
										<i class="fa fa-star"></i>
									)}
									{Array(5 - Math.round(v.rating)).fill(
										<i class="fa fa-star-0"></i>
									)}
                           </div>
                        </div>
                        <div class="review-body">
                           <p>{v.review} </p>
                        </div>
                     </li>)}
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
