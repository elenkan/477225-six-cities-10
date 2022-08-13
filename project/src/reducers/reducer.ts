import {createReducer} from '@reduxjs/toolkit';
import {
  setCurrentCity,
  getOffersList,
  getOffer,
  getReviews,
  getNearbyOffersList,
  setIsLoading,
  getFavoriteOffersList,
  requireAuth, setUserInfo, setIsRedirect, setCardId
} from '../actions/actions';
import {Card, Review} from '../types';
import {UserData} from '../types/auth';

type StateType = {
  city: string,
  offersList: Card[],
  offer: Card,
  reviewsList: Review[],
  nearbyOffersList: Card[],
  isLoading: boolean,
  favoriteOffersList: Card[],
  authorizationStatus: boolean,
  userInfo: UserData,
  isRedirect: boolean,
  cardId: null | number
}

const initialState: StateType = {
  city: 'Paris',
  offersList: [],
  offer: {
    bedrooms: 0,
    city: {
      location: {
        latitude: 0,
        longitude: 0,
        zoom: 0
      },
      name: ''
    },
    description: '',
    goods: [],
    host: {
      avatarUrl: '',
      id: null,
      isPro: false,
      name: ''
    },
    id: null,
    images: [],
    isFavorite: false,
    isPremium: false,
    location: {
      latitude: 0,
      longitude: 0,
      zoom: 0
    },
    maxAdults: 0,
    previewImage: '',
    price: 0,
    rating: 0,
    title: '',
    type: ''
  },
  reviewsList: [{
    comment: '',
    date: '',
    id: null,
    rating: 0,
    user: {
      avatarUrl: '',
      id: null,
      isPro: false,
      name: ''
    }
  }],
  nearbyOffersList: [],
  isLoading: false,
  favoriteOffersList: [],
  authorizationStatus: false,
  userInfo: {
    avatarUrl: '',
    email: '',
    id: null,
    isPro: false,
    name: '',
    token: ''
  },
  isRedirect: false,
  cardId: null
};

const reducer = createReducer(initialState, builder => {
  builder
    .addCase(setCurrentCity, (state, action) => {
      state.city = action.payload;
    });

  builder
    .addCase(getOffersList, (state, action) => {
      state.offersList = action.payload;
    });

  builder
    .addCase(getOffer, (state, action) => {
      state.offer = action.payload;
    });

  builder
    .addCase(getReviews, (state, action) => {
      state.reviewsList = action.payload;
    });

  builder
    .addCase(getNearbyOffersList, (state, action) => {
      state.nearbyOffersList = action.payload;
    });

  builder
    .addCase(setIsLoading, (state, action) => {
      state.isLoading = action.payload;
    });

  builder
    .addCase(getFavoriteOffersList, (state, action) => {
      state.favoriteOffersList = action.payload;
    });

  builder
    .addCase(requireAuth, (state, action) => {
      state.authorizationStatus = action.payload;
    });

  builder
    .addCase(setUserInfo, (state, action) => {
      state.userInfo = action.payload;
    });

  builder
    .addCase(setIsRedirect, (state, action) => {
      state.isRedirect = action.payload;
    });

  builder
    .addCase(setCardId, (state, action) => {
      state.cardId = action.payload;
    });
});

export {reducer};

