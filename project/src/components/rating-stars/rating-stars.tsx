type PropsType = {
  rating: number,
  classTitle: string
}

const RatingStars = ({rating, classTitle}: PropsType) => {
  const ratingStyle = {width: `${Math.round(rating) * 20}%`};
  return (
    <div className={`${classTitle}__rating rating`}>
      <div className={`${classTitle}__stars rating__stars`}>
        <span style={ratingStyle}/>
        <span className="visually-hidden">Rating</span>
      </div>
      {classTitle === 'property' && <span className="property__rating-value rating__value">{rating}</span>}
    </div>
  );
};

export default RatingStars;
