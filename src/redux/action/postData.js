import axios from 'axios'
import qs from 'qs'

import { APP_URL } from './config'


const url = "http://127.0.0.1:8080"


export const postCart = (token, data) => {
   return {
      type: 'POST_CART',
      payload: axios({
         method: 'post',
         url: `${url}/cart`,
         data: data,
         headers: { 'Authorization': 'Bearer ' + token }
      })
   }
}

export const putCarts = (token, data) => {
   return {
      type: 'POST_CART',
      payload: axios({
         method: 'post',
         url: `${url}/cart`,
         data: data,
         headers: { 'Authorization': 'Bearer ' + token }
      })
   }
}

export const postReview = (token, data) => {
   return {
      type: 'POST_REVIEW',
      payload: axios({
         method: 'post',
         url: `${url}/review`,
         data,
         headers: { 'Authorization': 'Bearer ' + token }
      })
   }
}

export const postCheckout = (token, data) => {
   return {
      type: 'POST_CHECKOUT',
      payload: axios({
         method: 'post',
         url: `${url}/checkout`,
         data,
         headers: { 'Authorization': 'Bearer ' + token }
      })
   }
}

export const postProfile = (token, data) => {
   return {
      type: 'POST_REVIEW',
      payload: axios({
         method: 'post',
         url: `${url}/review`,
         data,
         headers: { 'Authorization': 'Bearer ' + token }
      })
   }
}

export const postEmployee = (data) => {
   return {
      type: 'POST_EMPLOYEE',
      payload: axios.post(url, qs.stringify(data))
   }
}