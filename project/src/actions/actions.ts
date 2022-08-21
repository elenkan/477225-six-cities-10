import {createAction} from '@reduxjs/toolkit';

export const setCurrentCity = createAction('setCurrentCity', city => ({payload: city}));

export const getOffersList = createAction('getOffersList', offersList => ({payload: offersList}));

export const getOffer = createAction('getOffer', offer => ({payload: offer}));

export const getReviews = createAction('getReviews', reviews => ({payload: reviews}));

export const getNearbyOffersList = createAction('getNearbyOffersList', nearbyOffers => ({payload: nearbyOffers}));

export const setIsLoading = createAction('setIsLoading', value => ({payload: value}));

export const getFavoriteOffersList = createAction('getFavoriteOffersList', list => ({payload: list}));

export const requireAuth = createAction('requireAuth', auth => ({payload: auth}));

export const setUserInfo = createAction('setUserInfo', value => ({payload: value}));

export const setIsRedirect = createAction('setIsRedirect', value => ({payload: value}));

export const setCardId = createAction('setCardId', value => ({payload: value}));

export const setIsDisabledField = createAction('setIsDisabledField', value => ({payload: value}));

export const setResetForm = createAction('setResetForm', value => ({payload: value}));
