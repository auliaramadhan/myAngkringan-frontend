import axios from 'axios'
import qs from 'qs'

import { APP_URL } from './config'


const url = "http://52.91.248.206:8080"


export const putCart = (token, id, qty,total) => {
   return {
      type: 'PUT_CART',
      payload: axios(({
         method: 'put',
         url: "http://52.91.248.206:8080/cart/changeitemqty/",
         headers: { 'Authorization': 'Bearer ' + token },
         data:{qty, total, id}

      }))
   }
}
export const deleteCart = (token, id) => {
   return {
      type: 'DELETE_CART',
      payload: axios(({
         method: 'delete',
         url: "http://52.91.248.206:8080/cart/" + id,
         headers: { 'Authorization': 'Bearer ' + token },
      }))
   }
}
