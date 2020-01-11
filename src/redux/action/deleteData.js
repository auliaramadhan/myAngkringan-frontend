import axios from 'axios'
import qs from 'qs'

import { APP_URL } from './config'


const url = "http://127.0.0.1:8080"


export const deleteCart = (token, id) => {
   return {
      type: 'DELETE_CART',
      payload: axios(({
         method: 'delete',
         url: "http://127.0.0.1:8080/cart/" + id,
         headers: { 'Authorization': 'Bearer ' + token }
      }))
   }
}
