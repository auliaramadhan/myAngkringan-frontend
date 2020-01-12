const initialState = {
   data: {},
   status: {}
  , idLoading: false
  , isError: false
  ,isSuccess: true
}

const checkout = (state = initialState, action) => {
  switch (action.type) {
     case 'GET_DETAILCHECKOUT_PENDING':
        return {
           ...state, isLoading: true
        }
     case 'GET_DETAILCHECKOUT_REJECTED':
        return {
           ...state, isLoading: false, isError: true
        }
        
     case 'GET_DETAILCHECKOUT_FULFILLED':
        return {
           ...state,
           data: action.payload.data.data&&action.payload.data.data
           , isLoading: false, isError: false
        }
        
     default:
        return state;
        
  }
}

export default checkout