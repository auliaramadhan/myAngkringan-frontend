const initialState = {
    data: {}
   , idLoading: false
   , isError: false
   ,isSuccess: true
}

const profile = (state = initialState, action) => {
   switch (action.type) {
      case 'GET_PROFILE_PENDING':
         return {
            ...state, isLoading: true
         }
         
      case 'GET_PROFILE_PENDING_REJECTED':
         return {
            ...state, isLoading: false, isError: true
         }
         
      case 'GET_PROFILE_FULFILLED':
         return {
            data: action.payload.data.data&&action.payload.data.data[0]
            , isLoading: false, isError: false
         }
         

      default:
         return state;
         
   }
}

export default profile 