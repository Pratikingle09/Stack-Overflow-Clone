import * as api from "../API";
import{ setCurrentUser } from './currentUser'
import toast, { Toaster } from 'react-hot-toast';

export const signup = (authData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(authData);
    dispatch({ type: "AUTH", data });
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

export const login = (authData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.logIn(authData);
    if(data.message === 'Invalid Credentials' )
    {
      toast.error('Invalid Credentials')
      return navigate('/Auth')
    }else{
      toast.success('Login Successfully')
    dispatch({ type: "AUTH", data });
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
    navigate("/");
    }
  } catch (error) {
    console.log(error);
  }
};
