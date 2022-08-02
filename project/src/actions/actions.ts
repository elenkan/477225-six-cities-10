import {createAction} from '@reduxjs/toolkit';

export const setCurrentCity = createAction('setCurrentCity', (city) => ({payload: city}));

export const setCurrentOffersList = createAction('setCurrentOffersList', (offersListByCity) => ({payload: offersListByCity}));
