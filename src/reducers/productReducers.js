import {
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from '../constants/productConstans'

export const productListReducer = (state = { drones: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, drones: [] }
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        drones: action.payload,
      }
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const productDetailsReducer = (state = { drone: {} }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true }
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, drone: action.payload }
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}


// export const productCreateReducer = (state = {}, action) => {
//   switch (action.type) {
//     case PRODUCT_CREATE_REQUEST:
//       return { loading: true }
//     case PRODUCT_CREATE_SUCCESS:
//       return { loading: false, success: true, drone: action.payload }
//     case PRODUCT_CREATE_FAIL:
//       return { loading: false, error: action.payload }
//     case PRODUCT_CREATE_RESET:
//       return {}
//     default:
//       return state
//   }
// }