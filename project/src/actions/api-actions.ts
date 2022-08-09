import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {AppDispatch, State} from '../types/state';
import {APIRoute} from '../router/enums';
import {Card, Review} from '../types';
import {
  getOffersList,
  getOffer,
  getReviews,
  getNearbyOffersList,
  setIsLoading,
  getFavoriteOffersList,
  requireAuth, setUserInfo
} from './actions';
import {AuthData, UserData} from '../types/auth';
import {removeToken, saveToken} from '../services/token';

export const fetchOfferList = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>('fetchOfferList',
  async (_args, {dispatch, extra: api}) => {
    dispatch(setIsLoading(true));
    const {data} = await api.get<Card[]>(APIRoute.offers);
    dispatch(getOffersList(data));
    dispatch(setIsLoading(false));
  });

export const fetchOffer = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>('fetchOffer',
  async (id: number | null, {dispatch, extra: api}) => {
    if (id) {
      dispatch(setIsLoading(true));
      const {data} = await api.get<boolean>(`${APIRoute.offers}/${id}`);
      dispatch(getOffer(data));
      dispatch(setIsLoading(false));
    }
  });

export const fetchReviews = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>('fetchReviews',
  async (id: number | null, {dispatch, extra: api}) => {
    if (id) {
      const {data} = await api.get<Review[]>(`${APIRoute.reviews}/${id}`);
      dispatch(getReviews(data));
    }
  });

export const fetchNearbyOffersList = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>('fetchNearbyOffersList',
  async (id: number | null, {dispatch, extra: api}) => {
    if (id) {
      const {data} = await api.get<Card[]>(`${APIRoute.offers}/${id}/nearby`);
      dispatch(getNearbyOffersList(data));
    }
  });

export const fetchFavoriteOffersList = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>('fetchFavoriteOffersList',
  async (_args, {dispatch, extra: api}) => {
    const {data} = await api.get<Card[]>(APIRoute.favorite);
    dispatch(getFavoriteOffersList(data));
  });

export const checkAuth = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>('checkAuth',
  async (_args, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<boolean>(APIRoute.login);
      dispatch(requireAuth(true));
      dispatch(setUserInfo(data));
    } catch {
      dispatch(requireAuth(false));
    }
  });

export const login = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>('login',
  async ({email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<UserData>(APIRoute.login, {email, password});
    saveToken(data.token);
    dispatch(setUserInfo(data));
    dispatch(requireAuth(true));
  });

export const logout = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>('logout',
  async (_args, {dispatch, extra: api}) => {
    await api.delete(APIRoute.logout);
    removeToken();
    dispatch(requireAuth(false));
  });
