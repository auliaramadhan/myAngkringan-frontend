const initialState = {
   data: {},
   status: {}
  , idLoading: false
  , isError: false
  ,isSuccess: true
}

const checkout = (state = initialState, action) => {
  switch (action.type) {
     case 'POST_CHECKOUT_PENDING':
        return {
           ...state, isLoading: true
        }
     case 'POST_CHECKOUT_REJECTED':
        return {
           ...state, isLoading: false, isError: true
        }
        
     case 'POST_CHECKOUT_FULFILLED':
        return {
           ...state,
           status: action.payload.data.data
           , isLoading: false, isError: false
        }
     case 'GET_CHECKOUT_PENDING':
        return {
           ...state, isLoading: true
        }
     case 'GET_CHECKOUT_REJECTED':
        return {
           ...state, isLoading: false, isError: true
        }
        
     case 'GET_CHECKOUT_FULFILLED':
        return {
           ...state,
           data: action.payload.data.data&&action.payload.data.data[0]
           , isLoading: false, isError: false
        }
        
     default:
        return state;
        
  }
}

export default checkout