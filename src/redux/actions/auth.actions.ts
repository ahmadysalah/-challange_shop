import { AxiosResponse } from "axios";
import { Dispatch } from "redux";
import { ILogin, ISignUp, ActionsType, IUser } from "../../@types/auth.types";
import { ICart, ActionsType as CartActionsType } from "../../@types/cart.types";
import API from "../../api";
import { notify, uploadPhoto } from "../../utils/helpers";
import { AuthConstants } from "../contants/auth.constants";
import { CartConstants } from "../contants/cart.constants";

export const login =
  (data: ILogin, callback?: Function) =>
  async (dispatch: Dispatch<ActionsType | CartActionsType>) => {
    try {
      dispatch({
        type: AuthConstants.LOGIN_START,
      });
      const res: AxiosResponse<IUser> = await API.post<ILogin>(
        "/users/login",
        data
      );

      localStorage.setItem("user-data", JSON.stringify(res.data));
      dispatch({
        type: AuthConstants.LOGIN_SUCCESS,
        payload: res.data,
      });

      dispatch({
        type: CartConstants.GET_CART_SUCCESS,
        payload: res.data.cart as ICart,
      });
      callback?.();
    } catch (error: any) {
      console.log(error);
      notify("error", error?.response?.data?.message || error.message);
      dispatch({
        type: AuthConstants.LOGIN_FAIL,
        payload: error?.response?.data?.message || error.message,
      });
    }
  };

export const createUser =
  (data: ISignUp, callback?: Function) =>
  async (dispatch: Dispatch<ActionsType | CartActionsType>) => {
    try {
      dispatch({
        type: AuthConstants.CREATE_USER_START,
      });
      const res: AxiosResponse<IUser> = await API.post<ISignUp>(
        "/users/signup",
        data
      );

      localStorage.setItem("user-data", JSON.stringify(res.data));

      dispatch({
        type: AuthConstants.CREATE_USER_SUCCESS,
        payload: res.data,
      });

      dispatch({
        type: CartConstants.GET_CART_SUCCESS,
        payload: res.data.cart as ICart,
      });

      callback?.();
    } catch (error: any) {
      dispatch({
        type: AuthConstants.CREATE_USER_FAIL,
        payload: error.message,
      });
    }
  };

export const logout =
  (callback?: Function) =>
  (dispatch: Dispatch<ActionsType | CartActionsType>) => {
    localStorage.removeItem("user-data");
    callback?.();
    dispatch({
      type: CartConstants.CLEAR_CART,
    });
    dispatch({
      type: AuthConstants.LOG_OUT,
    });
  };

export const getProfile = () => async (dispatch: Dispatch<ActionsType>) => {
  try {
    dispatch({
      type: AuthConstants.GET_PROFILE_START,
    });

    const res: AxiosResponse<IUser> = await API.get("/users/profile");

    dispatch({
      type: AuthConstants.GET_PROFILE_SUCCESS,
      payload: res.data,
    });
  } catch (error: any) {
    notify("error", error?.response?.data?.message || error.message);
    dispatch({
      type: AuthConstants.GET_PROFILE_FAIL,
      payload: error?.response?.data?.message || error.message,
    });
  }
};

export const editProfile =
  (user: IUser, callback?: Function) =>
  async (dispatch: Dispatch<ActionsType>) => {
    try {
      const { token, cart, _id, ...rest } = user;
      dispatch({
        type: AuthConstants.UPDATE_USER_START,
      });
      let profileImage: string = "";
      if (typeof user.profileImage === "object") {
        const { data } = await uploadPhoto(user.profileImage as File);
        profileImage = data;
      }
      await API.put("/users/profile", {
        ...rest,
        profileImage: profileImage || user.profileImage,
      });
      localStorage.setItem(
        "user-data",
        JSON.stringify({
          ...user,
          profileImage,
        })
      );
      dispatch({
        type: AuthConstants.UPDATE_USER_SUCCESS,
        payload: {
          ...user,
          profileImage,
        },
      });
      callback?.();
    } catch (error: any) {
      notify("error", error?.response?.data?.message || error.message);
      dispatch({
        type: AuthConstants.UPDATE_USER_FAIL,
        payload: error?.response?.data?.message || error.message,
      });
    }
  };

export const changePassword =
  (user: IUser, callback?: Function) =>
  async (dispatch: Dispatch<ActionsType>) => {
    try {
      const { token, cart, _id, ...rest } = user;
      dispatch({
        type: AuthConstants.UPDATE_PASSWORD_START,
      });

      await API.put("/users/profile", {
        ...rest,
        password: user.password,
      });

      dispatch({
        type: AuthConstants.UPDATE_PASSWORD_SUCCESS,
      });
      callback?.();
    } catch (error: any) {
      notify("error", error?.response?.data?.message || error.message);
      dispatch({
        type: AuthConstants.UPDATE_PASSWORD_FAIL,
        payload: error?.response?.data?.message || error.message,
      });
    }
  };
