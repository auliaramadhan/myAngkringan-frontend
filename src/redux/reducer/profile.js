const initialState = {
    data: {},
    status: {}
   , idLoading: false
   , isError: false
   ,isSuccess: true
}

const profile = (state = initialState, action) => {
   switch (action.type) {
      case 'POST_PROFILE_PENDING':
         return {
            ...state, isLoading: true
         }
      case 'POST_PROFILE_REJECTED':
         return {
            ...state, isLoading: false, isError: true
         }
         
      case 'POST_PROFILE_FULFILLED':
         return {
            ...state,
            status: action.payload.data
            , isLoading: false, isError: false
         }
      case 'GET_PROFILE_PENDING':
         return {
            ...state, isLoading: true
         }
      case 'GET_PROFILE_REJECTED':
         return {
            ...state, isLoading: false, isError: true
         }
         
      case 'GET_PROFILE_FULFILLED':
         return {
            ...state,
            data: action.payload.data.data&&action.payload.data.data[0]
            , isLoading: false, isError: false
         }
         
      default:
         return state;
         
   }
}

export default profile 