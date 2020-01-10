const initialState = {
   data: []
   , status : {}
   , idLoading: false
   , isError: false
   ,isSuccess: true
}

const cart = (state = initialState, action) => {
   switch (action.type) {
      case 'POST_CART_PENDING':
         return {
            ...state, isLoading: true
         }
      case 'POST_CART_PENDING_REJECTED':
         return {
            ...state, isLoading: false, isError: true
         }
         
      case 'POST_CART_FULFILLED':
         return {
            data: action.payload.data.data
            , isLoading: false, isError: false
         }
      case 'PUT_CART_PENDING':
         return {
            ...state, isLoading: true
         }
      case 'PUT_CART_PENDING_REJECTED':
         return {
            ...state, isLoading: false, isError: true
         }
         
      case 'PUT_CART_FULFILLED':
         return {
            data: action.payload.data.data
            , isLoading: false, isError: false
         }
      case 'GET_CART_PENDING':
         return {
            ...state, isLoading: true
         }
      case 'GET_CART_PENDING_REJECTED':
         return {
            ...state, isLoading: false, isError: true
         }
         
      case 'GET_CART_FULFILLED':
         return {
            data: action.payload.data.data
            , isLoading: false, isError: false
         }
         
      default:
         return state;
         
   }
}

export default cart 