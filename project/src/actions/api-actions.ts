import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {AppDispatch, State} from '../types/state';
import {getOffersList} from './actions';

export const fetchOfferList = createAsyncThunk<void, undefined,{
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance }>('fetchOfferList',
    async (_args, {dispatch,extra:api}) => {
      const {data} = await api.get('/hotels');
      dispatch(getOffersList(data));
    });
