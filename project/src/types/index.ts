export type Card = {
  image: string,
  price: number,
  name: string,
  type: string,
  bookMark: boolean,
  isPremium: boolean,
  rating: number,
  isFavorite: boolean,
  id: number
}

export type RequestData = {
  review: string,
  rating: string
}

export type CityCoordinate = {
  title: string,
  lat: number,
  lng: number,
  zoom?: number
}

export type Review = {
  avatar: string,
  name: string,
  text: string,
  dateTime: string,
  rating: number,
  id: number
}
