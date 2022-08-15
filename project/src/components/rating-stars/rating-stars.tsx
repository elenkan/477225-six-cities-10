import {useLocation} from 'react-router-dom';

type PropsType = {
  rating: number
}

const RatingStars = ({rating}: PropsType) => {
  const ratingStyle = {width: `${Math.round(rating) * 20}%`};
  const isOfferPage = useLocation().pathname.includes('offer');
  return (
    <div className={`${isOfferPage ? 'property__rating' : 'place-card__rating'} rating`}>
      <div className={`${isOfferPage ? 'property__stars' : 'place-card__stars'} rating__stars`}>
        <span style={ratingStyle}/>
        <span className="visually-hidden">Rating</span>
      </div>
      {isOfferPage && <span className="property__rating-value rating__value">{rating}</span>}
    </div>
  );
};

export default RatingStars;
