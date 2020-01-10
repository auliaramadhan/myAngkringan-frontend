const initialState = {
   data: {}
   , idLoading: false
   , isError: false
   ,isSuccess: true
}

const itemDetail = (state = initialState, action) => {
   switch (action.type) {
      case 'GET_ITEM_DETAIL_PENDING':
         return {
            ...state, isLoading: true
         }
         
      case 'GET_ITEM_DETAIL_PENDING_REJECTED':
         return {
            ...state, isLoading: false, isError: true
         }
         
      case 'GET_ITEM_DETAIL_FULFILLED':
         return {
            data: action.payload.data
            , isLoading: false, isError: false
         }
      default:
         return state;
         
   }
}

export default itemDetail 