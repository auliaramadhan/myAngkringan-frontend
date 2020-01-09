const initialState = {
   count: 0
   , data: []
   , idLoading: false
   , isError: false
}

const employee = (state = initialState, action) => {
   switch (action.type) {
      case 'GET_EMPLOYEE_PENDING':
         return {
            ...state, isLoading: true
         }
         break;
      case 'GET_EMPLOYEE_PENDING_REJECTED':
         return {
            ...state, isLoading: false, isError: true
         }
         break;
      case 'GET_EMPLOYEE_FULFILLED':
         return {
            count: action.payload.data.data.length,
            data: action.payload.data.data
            , isLoading: false, isError: false
         }
         break;

      default:
         return state;
         break;
   }
}

export default employee 