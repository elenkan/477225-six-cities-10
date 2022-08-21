import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {State} from '../types/state';
import {Action} from '@reduxjs/toolkit';
import {APIRoute} from '../router/enums';
import {fetchOfferList, checkAuth} from './api-actions';
import {requireAuth, setUserInfo} from './actions';
import axios, {AxiosInstance} from 'axios';
import {getOffersList, setIsLoading} from './actions';
import * as token from '../services/token';
import {URL, REQUEST_TIMEOUT} from '../constants';

describe('check async actions', () => {
  const createApi = (): AxiosInstance => axios.create({baseURL: URL, timeout: REQUEST_TIMEOUT});
  const api = createApi();
  const mockApi = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<State,
    Action,
    ThunkDispatch<State, typeof api, Action>>(middlewares);

  it('check fetchOfferList', async () => {
    const store = mockStore();
    mockApi.onGet(APIRoute.offers).reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchOfferList());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchOfferList.pending.type,
      setIsLoading.type,
      getOffersList.type,
      setIsLoading.type,
      fetchOfferList.fulfilled.type
    ]);
  });

  it('check checkAuth actions', async () => {
    const store = mockStore();
    const SUCCESS_RESPONSE_CODE = 200;
    mockApi.onGet(APIRoute.login).reply(SUCCESS_RESPONSE_CODE, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuth());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      checkAuth.pending.type,
      requireAuth.type,
      setUserInfo.type,
      checkAuth.fulfilled.type,
    ]);
  });

  it('check checkAuth actions when server returns 401', async () => {
    const store = mockStore();
    const UNAUTHORIZED_RESPONSE_CODE = 401;
    mockApi.onGet(APIRoute.login).reply(UNAUTHORIZED_RESPONSE_CODE, {error: ''});

    expect(store.getActions()).toEqual([]);

    const spy = jest.spyOn(token, 'removeToken');
    await store.dispatch(checkAuth());
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      checkAuth.pending.type,
      requireAuth.type,
      checkAuth.fulfilled.type,
    ]);

    expect(spy).toBeCalled();
  });
});
