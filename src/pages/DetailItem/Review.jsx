import React, { useState, useEffect } from 'react'
import useDataFetching from '../../service/fetchHook';
import Cookies from "js-cookie";
import Axios from "axios";

export default function Review({ url_review, id_item }) {
   const [urlReview, setUrlReview] = useState(url_review)
   const { loading, results, error } = useDataFetching(url_review);
   const [reviews, setReviews] = useState({id_item:id_item})

   // console.log()
   useEffect(() => {
      setReviews(results.data)
   }, [])

   const submitReview =
      async (e) => {
         e.preventDefault();
         const token = Cookies.get('token')
         const result = await Axios({
            // method: 'post', url: "http://127.0.0.1:8080/review/" + id_item,
            method: 'post', url: "http://127.0.0.1:8080/review/" ,
            headers: { 'Authorization': 'Bearer ' + token },
            data: {...reviews, id_item}
         })

         // setUrlReview("http://127.0.0.1:8080/review/" + id_item)
         console.log(result)
      }


   console.log(reviews)
   return (
      <div id="product-tab">
         <div class="row">
            <div class="col-md-7">
               <div id="reviews">
                  <ul class="reviews">
                     {results.data && results.data.length > 0 &&
                        results.data.map((v, i) => <li>
                           <div class="review-heading">
                              <h5 class="name">{v.first_name+" " || "john"} 
                                 {v.last_name || "snow"}</h5>
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
                     <textarea class="input" style={{height:"100%"}}  rows={6} placeholder="Your Review"
                        onChange={(e) => setReviews({ ...reviews, review: e.target.value })}
                        value={reviews && reviews.review} required />
                     <div class="input-rating">
                        <span>Your Rating: </span>
                        <div class="stars">
                           <input id="star5" name="rating" value="5" type="radio"
                              onClick={(e) => setReviews({ ...reviews, rating: e.target.value })} /><label for="star5"></label>
                           <input id="star4" name="rating" value="4" type="radio"
                              onClick={(e) => setReviews({ ...reviews, rating: e.target.value })} /><label for="star4"></label>
                           <input id="star3" name="rating" value="3" type="radio"
                              onClick={(e) => setReviews({ ...reviews, rating: e.target.value })} /><label for="star3"></label>
                           <input id="star2" name="rating" value="2" type="radio"
                              onClick={(e) => setReviews({ ...reviews, rating: e.target.value })} /><label for="star2"></label>
                           <input id="star1" name="rating" value="1" type="radio"
                              onClick={(e) => setReviews({ ...reviews, rating: e.target.value })} /><label for="star1"></label>
                        </div>
                     </div>
                     <button class="primary-btn"
                        onClick={submitReview} >Submit</button>
                  </form>
               </div>
            </div>

         </div>
      </div>

   )
}
