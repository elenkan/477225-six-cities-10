import {createAction} from '@reduxjs/toolkit';

export const setCurrentCity = createAction('setCurrentCity', city => ({payload: city}));

export const getOffersList = createAction('getOffersList', offersList => ({payload: offersList}));

export const getOffer = createAction('getOffer', offer => ({payload: offer}));

export const getReviews = createAction('getReviews', review => ({payload: review}));

export const getNearbyOffersList = createAction('getNearbyOffersList', nearbyOffer => ({payload: nearbyOffer}));

export const setIsLoading = createAction('setIsLoading', value => ({payload: value}));

export const getFavoriteOffersList = createAction('getFavoriteOffersList', list => ({payload: list}));
