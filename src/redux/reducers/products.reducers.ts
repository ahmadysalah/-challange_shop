import { ActionsType, IProduct, ICategory } from "../../@types/products.types";
import { ProductConstants } from "../contants/products.constants";

interface IState {
  loading: boolean;
  error: string;
  topProducts: IProduct[];
  product: IProduct | undefined;
  products: {
    page: number;
    pages: number;
    products: IProduct[];
  };
  allProducts: IProduct[];
  categories: ICategory[];
  categoryProducts: IProduct[];
}

const initial_state: IState = {
  loading: false,
  error: "",
  topProducts: [],
  products: {
    page: 0,
    pages: 0,
    products: [],
  },
  allProducts: [],
  categories: [],
  categoryProducts: [],
  product: undefined,
};

export const ProductsReducer = (state = initial_state, action: ActionsType) => {
  switch (action.type) {
    case ProductConstants.CREATE_PRODUCT_START:
      return {
        ...state,
        loading: true,
      };
    case ProductConstants.CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case ProductConstants.CREATE_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
      };
    case ProductConstants.UPDATE_PRODUCT_START:
      return {
        ...state,
        loading: true,
      };
    case ProductConstants.UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case ProductConstants.UPDATE_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
      };
    case ProductConstants.DELETE_PRODUCT_START:
      return {
        ...state,
        loading: true,
      };
    case ProductConstants.DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: {
          ...state.products,
          products: state.products.products.filter(
            (product) => product._id !== action.payload
          ),
        },
      };
    case ProductConstants.DELETE_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ProductConstants.GET_TOP_PRODUCTS_START:
      return {
        ...state,
        loading: true,
      };
    case ProductConstants.GET_TOP_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        topProducts: action.payload,
      };
    case ProductConstants.GET_TOP_PRODUCTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ProductConstants.GET_PRODUCTS_START:
      return {
        ...state,
        loading: true,
      };
    case ProductConstants.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
      };
    case ProductConstants.GET_PRODUCTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ProductConstants.GET_ALL_PRODUCTS_START:
      return {
        ...state,
        loading: true,
      };
    case ProductConstants.GET_ALL_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        allProducts: action.payload,
      };
    case ProductConstants.GET_ALL_PRODUCTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ProductConstants.GET_PRODUCT_START:
      return {
        ...state,
        loading: true,
      };
    case ProductConstants.GET_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.payload,
      };
    case ProductConstants.GET_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ProductConstants.CLEAR_PRODUCT:
      return {
        ...state,
        product: undefined,
      };
    case ProductConstants.GET_CATEGORIES_START:
      return {
        ...state,
        loading: true,
      };
    case ProductConstants.GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.payload,
      };
    case ProductConstants.GET_CATEGORIES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ProductConstants.GET_CATEGORY_PRODUCTS_START:
      return {
        ...state,
        loading: true,
      };
    case ProductConstants.GET_CATEGORY_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        categoryProducts: action.payload,
      };
    case ProductConstants.GET_CATEGORY_PRODUCTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ProductConstants.ADD_REVIEW_START:
      return {
        ...state,
      };
    case ProductConstants.ADD_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        product: {
          ...state.product,
          reviews: state.product?.reviews
            ? [...state.product?.reviews, action.payload]
            : [action.payload],
        },
      };
    case ProductConstants.ADD_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
