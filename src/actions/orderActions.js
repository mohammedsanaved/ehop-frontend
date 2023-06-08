import axios from 'axios';
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_REQUEST,
} from '../constants/OrderConstants';
import { server } from '../App.jsx';
import { toastError, toastSuccess } from '../components/UI/Toast';
// import mongoose from 'mongoose';

export const createOrder = (order) => async (dispatch, getState) => {
  // console.warn(order);
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    // console.warn(userInfo);
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // console.warn(config);
    const { data } = await axios.post(`${server}/api/orders`, order, config);
    // console.warn('api data', data);
    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    toastError(error.response.data.message);
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
  console.warn(id);
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    console.warn(userInfo);
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    console.warn(config);

    const { data } = await axios.get(`${server}/api/orders/${id}`, config);
    console.warn(data);
    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    toastError(error.response.data.message);
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const payOrder =
  (orderId, paymentResult) => async (dispatch, getState) => {
    // console.warn(id);
    try {
      dispatch({
        type: ORDER_PAY_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();
      // console.warn(userInfo);
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      console.log(config);

      const { data } = await axios.put(
        `${server}/api/orders/${orderId}/pay`,
        paymentResult,
        config
      );
      console.warn('Data from orderPay', data);
      dispatch({
        type: ORDER_PAY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      toastError(error.response.data.message);
      dispatch({
        type: ORDER_PAY_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listMyOrders = () => async (dispatch, getState) => {
  // console.warn(id);
  try {
    dispatch({
      type: ORDER_LIST_MY_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    // console.warn(userInfo);
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    console.warn(config);
    // const userId = mongoose.Types.ObjectId(userInfo._id); // convert _id to ObjectId

    const { data } = await axios.get(`${server}/api/orders/myorders`, config);
    // console.warn('data from listmyoreder', data);
    dispatch({
      type: ORDER_LIST_MY_SUCCESS,
      payload: data,
    });
    toastSuccess('Order display Successfully');
  } catch (error) {
    toastError(
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    );
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const listOrders = () => async (dispatch, getState) => {
  // console.warn(id);
  try {
    dispatch({
      type: ORDER_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    console.warn(config);
    // const userId = mongoose.Types.ObjectId(userInfo._id); // convert _id to ObjectId

    const { data } = await axios.get(`${server}/api/orders`, config);
    // console.warn('data from listmyoreder', data);
    dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: data,
    });
    toastSuccess('All Orders');
  } catch (error) {
    toastError(
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    );
    dispatch({
      type: ORDER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const deliverOrders = (order) => async (dispatch, getState) => {
  // console.warn(id);
  try {
    dispatch({
      type: ORDER_DELIVER_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    console.warn(config);
    // const userId = mongoose.Types.ObjectId(userInfo._id); // convert _id to ObjectId

    const { data } = await axios.put(
      `${server}/api/orders/${order._id}/deliver`,
      {},
      config
    );
    // console.warn('data from listmyoreder', data);
    dispatch({
      type: ORDER_DELIVER_SUCCESS,
      payload: data,
    });
    toastSuccess('Order DELIVERED');
  } catch (error) {
    toastError(
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    );
    dispatch({
      type: ORDER_DELIVER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
