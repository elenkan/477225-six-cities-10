import leaflet from 'leaflet';

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
