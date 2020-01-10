import axios from 'axios'
import qs from 'qs'

import { APP_URL } from './config'


const url = "http://127.0.0.1:8080"


export const getItems = (query) => {
   return {
      type: 'GET_ITEM_LIST',
      payload: axios({
         method: 'get',
         url: `${url}/item`,
         params: query
      })
   }
}

export const getItemDetail = (id) => {
   return {
      type: 'GET_ITEM_DETAIL',
      payload: axios({
         method: 'get',
         url: `${url}/item/${id}`
      })
   }
}

export const getProfile = (token) => {
   return {
      type: 'GET_PROFILE',
      payload: axios({
         method: 'get',
         url: `${url}/profile`,
         headers: { 'Authorization': 'Bearer ' + token }
      })
   }
}

export const getCart = (token) => {
   return {
      type: 'GET_CART',
      payload: axios({
         method: 'get',
         url: `${url}/cart`,
         headers: { 'Authorization': 'Bearer ' + token }
      })
   }
}

export const getReview = (id_item) => {
   return {
      type: 'GET_CART',
      payload: axios({
         method: 'get',
         url: `${url}/review/${id_item}`,
         // headers: { 'Authorization': 'Bearer ' + token }
      })
   }
}

export const getRestaurants = () => {
   return {

      type: 'GET_RESTAURANTS',
      payload: axios({
         method: 'get',
         url: `${url}/restaurant`,
         // headers: { 'Authorization': 'Bearer ' + token }
      })
   }
}

export const postEmployee = (data) => {
   return {
      type: 'POST_EMPLOYEE',
      payload: axios.post(url, qs.stringify(data))
   }
}