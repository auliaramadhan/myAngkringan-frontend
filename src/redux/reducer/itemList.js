const initialState = {
   data: {}
   , idLoading: false
   , isError: false
   ,isSuccess: true
}

const itemList = (state = initialState, action) => {
   switch (action.type) {
      case 'GET_ITEM_LIST_PENDING':
         return {
            ...state, isLoading: true
         }
         
      case 'GET_ITEM_LIST_REJECTED':
         return {
            ...state, isLoading: false, isError: true
         }
         
      case 'GET_ITEM_LIST_FULFILLED':
         return {
            ...state,
            data: action.payload.data
            , isLoading: false, isError: false
         }
         
      default:
         return state;
         
   }
}

export default itemList 