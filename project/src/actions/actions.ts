import {createAction} from '@reduxjs/toolkit';

export const setCurrentCity = createAction('setCurrentCity', (city) => ({payload: city}));

export const getOffersList = createAction('getOffersList', (offersList) => ({payload: offersList}));
