import {Review} from '../../types';
import {MONTHS} from '../../constants';
import RatingStars from '../rating-stars';

type PropsType = {
  review: Review
}

const ReviewsItem = ({review: { comment, date, user, rating}}: PropsType) => {

  const getCreateReviewDateString = (dateString: string) => {
    const dateElements: string[] = dateString.split('-');
    return `${MONTHS[Number(dateElements[1]) - 1]} ${dateElements[0]}`;
  };

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={user.avatarUrl} width="54" height="54" alt="Reviews avatar"/>
        </div>
        <span className="reviews__user-name">{user.name}</span>
      </div>
      <div className="reviews__info">
        <RatingStars rating={rating} classTitle={'reviews'} />
        <p className="reviews__text">{comment}</p>
        <time className="reviews__time" dateTime={date}>{getCreateReviewDateString(date)}</time>
      </div>
    </li>);
};

export default ReviewsItem;
