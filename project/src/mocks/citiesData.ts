const citiesData: any = {
  'Paris': {
    list: [
      {
        'image': 'img/apartment-01.jpg',
        'isFavorite': true,
        'price': 120,
        'name': 'Beautiful luxurious apartment at great location',
        'type': 'Apartment',
        'bookMark': true,
        'isPremium': true,
        'rating': 0,
        'id': 11
      },
      {
        'image': 'img/room.jpg',
        'isFavorite': true,
        'price': 80,
        'name': 'Wood and stone place',
        'type': 'Private room',
        'bookMark': true,
        'isPremium': false,
        'rating': 0,
        'id': 12
      }]
  },
  'Cologne': {
    list: [{
      'image': 'img/apartment-02.jpg',
      'isFavorite': true,
      'price': 132,
      'name': 'Canal View Prinsengracht',
      'type': 'Apartment',
      'bookMark': true,
      'isPremium': false,
      'rating': 0,
      'id': 13
    }]
  },
  'Brussels': {
    list: [{
      'image': 'img/apartment-03.jpg',
      'isFavorite': false,
      'price': 180,
      'name': 'Nice, cozy, warm big bed apartment',
      'type': 'Apartment',
      'bookMark': true,
      'isPremium': true,
      'rating': 0,
      'id': 14
    }]
  },
  'Amsterdam': {
    list: [{
      'image': 'img/room.jpg',
      'isFavorite': false,
      'price': 80,
      'name': 'Wood and stone place',
      'type': 'Private room',
      'bookMark': true,
      'isPremium': false,
      'rating': 0,
      'id': 15
    }]
  },
  'Hamburg': {
    list: [{
      'image': 'img/room.jpg',
      'isFavorite': false,
      'price': 100,
      'name': 'Wood and stone and metal place',
      'type': 'Flat',
      'bookMark': true,
      'isPremium': false,
      'rating': 0,
      'id': 15
    }]
  },
  'Dusseldorf': {
    list: [{
      'image': 'img/room.jpg',
      'isFavorite': false,
      'price': 100,
      'name': 'Wood and stone and metal place',
      'type': 'Flat',
      'bookMark': true,
      'isPremium': false,
      'rating': 0,
      'id': 16
    },
    {
      'image': 'img/room.jpg',
      'isFavorite': false,
      'price': 100,
      'name': 'Wood l place',
      'type': 'Apartment',
      'bookMark': true,
      'isPremium': false,
      'rating': 0,
      'id': 15
    }]
  }
} as const;

export default citiesData;
