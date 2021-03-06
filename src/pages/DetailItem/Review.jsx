import React, { useState, useEffect, Fragment } from 'react'
import useDataFetching from '../../service/fetchHook';
import Cookies from "js-cookie";
import Axios from "axios";
import { connect } from 'react-redux'
import { getReview } from '../../redux/action/getData'
import { postReview } from '../../redux/action/postData'
import { Toast } from 'react-bootstrap';

function Review({ id_item, dispatch, review }) {
   const [inputreviews, setInputReviews] = useState({})
   useEffect(() => {
      console.log(review.status)
      dispatch(getReview(id_item))
      if (review.isError) {
         settoastmsg('terdapat error')
         setShowToast(true)
      }
   }, [review.isError, review.status, id_item, dispatch])

   const submitReview = e => {
      e.preventDefault()

      dispatch(postReview(Cookies.get('token') ,{...inputreviews, id_item}))
   }
   const [showToast, setShowToast] = useState(false);
  const [toastmsg, settoastmsg] = useState("")
  const toggleShowToast = () => setShowToast(!showToast);

   return (
      <Fragment>
      <div id="product-tab">
         <div class="row">
            <div class="col-md-8">
               <div id="reviews">
                  <ul class="reviews">
                     {/* {results.data && results.data.length > 0 && */}
                     {review.isLoading &&  <div class="lds-ring"><div></div><div></div><div></div></div> }
                     {!review.isLoading && review.data.length > 0 &&
                        review.data.map((v, i) => <li>
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
                  {/* <ul class="reviews-pagination">
                     <li><a href="#"><i class="fa fa-angle-left"></i></a></li>
                     <li class="active">1</li>
                     <li><a href="#">2</a></li>
                     <li><a href="#">3</a></li>
                     <li><a href="#">4</a></li>
                     <li><a href="#"><i class="fa fa-angle-right"></i></a></li>
                  </ul> */}
               </div>
            </div>

            <div class="col-md-4">
               <div id="review-form">
                  <form class="review-form">
                     <textarea class="input" style={{height:"100%"}}  rows={10} placeholder="Your Review"
                        onChange={(e) => setInputReviews({ ...inputreviews, review: e.target.value })}
                        value={inputreviews && inputreviews.review} required />
                     <div class="input-rating">
                        <span>Your Rating: </span>
                        <div class="stars">
                           <input id="star5" name="rating" value="5" type="radio"
                              onClick={(e) => setInputReviews({ ...inputreviews, rating: e.target.value })} /><label for="star5"></label>
                           <input id="star4" name="rating" value="4" type="radio"
                              onClick={(e) => setInputReviews({ ...inputreviews, rating: e.target.value })} /><label for="star4"></label>
                           <input id="star3" name="rating" value="3" type="radio"
                              onClick={(e) => setInputReviews({ ...inputreviews, rating: e.target.value })} /><label for="star3"></label>
                           <input id="star2" name="rating" value="2" type="radio"
                              onClick={(e) => setInputReviews({ ...inputreviews, rating: e.target.value })} /><label for="star2"></label>
                           <input id="star1" name="rating" value="1" type="radio"
                              onClick={(e) => setInputReviews({ ...inputreviews, rating: e.target.value })} /><label for="star1"></label>
                        </div>
                     </div>
                     <button class="primary-btn"
                        onClick={submitReview} >Submit</button>
                  </form>
               </div>
            </div>

         </div>
      </div>
      <Toast show={showToast} onClose={toggleShowToast}>
      <Toast.Header>
          <strong className="mr-auto">Notif</strong>
        </Toast.Header>
        <Toast.Body>{toastmsg}</Toast.Body>
      </Toast>
      </Fragment>
   )
}
const mapStateToProps = state => {
	return {
		review: state.review
	}
}

export default connect(mapStateToProps)(Review)