import axios from 'axios'

import { APP_URL } from './config'

export const getEmployee = () =>{
   return {
      type: 'GET_EMPLOYEE'
      , payload: axios.get(APP_URL).concat('user')
   }
}