import ReviewsItem from '../reviews-item';
import ReviewForm from '../review-form';
import {Review} from '../../types';

type PropsType = {
  reviewsList: Review[]
}

const ReviewsList = ({reviewsList}: PropsType) => (
  <section className="property__reviews reviews">
    <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviewsList.length}</span></h2>
    <ul className="reviews__list">
      {
        reviewsList.map((item) => <ReviewsItem review={item} key={item.id}/>)
      }
    </ul>
    <ReviewForm/>
  </section>

);

export default ReviewsList;
