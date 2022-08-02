import {lorem} from 'faker';

const reviews =
  [
    {
      'avatar': 'img/avatar-max.jpg',
      'name': 'Max',
      'text': 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.The building is green and from 18th century.',
      'dateTime': '2019-04-24',
      'rating': 4,
      'id': 20
    },
    {
      'avatar': 'img/avatar-max.jpg',
      'name': 'John',
      'text': lorem.paragraph(),
      'dateTime': '2020-05-24',
      'rating': 5,
      'id': 21
    },
    {
      'avatar': 'img/avatar-max.jpg',
      'name': 'Jane',
      'text': lorem.paragraph(),
      'dateTime': '2022-03-24',
      'rating': 5,
      'id': 22
    }
  ];

export default reviews;
