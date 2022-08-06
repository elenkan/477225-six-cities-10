import {createReducer} from '@reduxjs/toolkit';
import {setCurrentCity, getOffersList} from '../actions/actions';

const initialState = {
  city: 'Paris',
  offersList: []
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCurrentCity, (state, action) => {
      state.city = action.payload;
    });

  builder
    .addCase(getOffersList, (state, action) => {
      state.offersList = action.payload;
    });
});

export {reducer};

