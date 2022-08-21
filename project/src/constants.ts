import leaflet from 'leaflet';

export const URL = 'https://10.react.pages.academy/six-cities';

export const REQUEST_TIMEOUT = 5000;

export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
  'August', 'September', 'October', 'November', 'December'] as const;

export const CITIES_LIST: readonly string[] = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export const DEFAULT_MAP_HEIGHT = '512px';

export const MAP_HEIGHT = '579px';

export const CUSTOM_ICON = leaflet.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

export const CUSTOM_ACTIVE_ICON = leaflet.icon({
  iconUrl: 'img/pin-active.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

export const MIN_COMMENT_LENGTH = 50;

export const MAX_COMMENT_LENGTH = 300;

export const RATING_DATA = [
  {
    title: 'perfect',
    value: '5',
    id: '5-stars'
  },
  {
    title: 'good',
    value: '4',
    id: '4-stars'
  },
  {
    title: 'not bad',
    value: '3',
    id: '3-stars'
  },
  {
    title: 'badly',
    value: '2',
    id: '2-stars'
  },
  {
    title: 'terribly',
    value: '1',
    id: '1-stars'
  }
];

export const SORTING_DATA = [
  {
    title: 'Popular',
    value: 'popular'
  },
  {
    title: 'Price: low to high',
    value: 'low'
  },
  {
    title: 'Price: high to low',
    value: 'high'
  },
  {
    title: 'Top rated first',
    value: 'rating'
  }
];

export const REVIEWS_LIMIT_COUNT = 10;
