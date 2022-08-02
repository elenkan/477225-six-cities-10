import {Review} from '../../types';
import {MONTHS} from '../../constants';

type PropsType = {
  review: Review
}

const ReviewsItem = ({review: {avatar, name, text, dateTime}}: PropsType) => {

  const getCreateReviewDateString = (dateString: string) => {
    const dateElements: string[] = dateString.split('-');
    return `${MONTHS[Number(dateElements[1]) - 1]} ${dateElements[0]}`;
  };

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={avatar} width="54" height="54" alt="Reviews avatar"/>
        </div>
        <span className="reviews__user-name">{name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: '80%'}}/>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{text}</p>
        <time className="reviews__time" dateTime={dateTime}>{getCreateReviewDateString(dateTime)}</time>
      </div>
    </li>);
};

export default ReviewsItem;
