import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {AppDispatch, State} from '../types/state';
import {APIRoute} from '../router/enums';
import {getOffersList, getOffer, getReviews, getNearbyOffersList, setIsLoading, getFavoriteOffersList} from './actions';

export const fetchOfferList = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>('fetchOfferList',
  async (_args, {dispatch, extra: api}) => {
    dispatch(setIsLoading(true));
    const {data} = await api.get(APIRoute.offers);
    dispatch(getOffersList(data));
    dispatch(setIsLoading(false));
  });

export const fetchOffer = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>('fetchOffer',
  async (id: number|null, {dispatch, extra: api}) => {
    if (id) {
      dispatch(setIsLoading(true));
      const {data} = await api.get(`${APIRoute.offers}/${id}`);
      dispatch(getOffer(data));
      dispatch(setIsLoading(false));
    }
  });

export const fetchReviews = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>('fetchReviews',
  async (id: number|null, {dispatch, extra: api}) => {
    if (id) {
      const {data} = await api.get(`${APIRoute.reviews}/${id}`);
      dispatch(getReviews(data));
    }
  });

export const fetchNearbyOffersList = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>('fetchNearbyOffersList',
  async (id: number|null, {dispatch, extra: api}) => {
    if (id) {
      const {data} = await api.get(`${APIRoute.offers}/${id}/nearby`);
      dispatch(getNearbyOffersList(data));
    }
  });

export const fetchFavoriteOffersList = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>('fetchFavoriteOffersList',
  async (_args, {dispatch, extra: api}) => {
    const {data} = await api.get(APIRoute.favorite);
    dispatch(getFavoriteOffersList(data));
  });
