export type CityCoordinate = {
  latitude: number,
  longitude: number,
  zoom?: number
}

export type User = {
  avatarUrl: string,
  id: number | null,
  isPro: boolean,
  name: string
}

export type Card = {
  bedrooms: number,
  city: {
    location: CityCoordinate,
    name: string
  },
  description: string,
  goods: string[],
  host: User,
  id: number | null,
  images: string[],
  isFavorite: boolean,
  isPremium: boolean,
  location: CityCoordinate,
  maxAdults: number,
  previewImage: string,
  price: number,
  rating: number,
  title: string,
  type: string
}

export type RequestData = {
  review: string,
  rating: string
}

export type Review = {
  comment: string,
  date: string,
  id: number | null,
  rating: number,
  user: User
}
