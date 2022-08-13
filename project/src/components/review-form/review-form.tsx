import {FormEvent, Fragment, useEffect, useState} from 'react';
import {RequestData} from '../../types';
import {ChangeEvent} from 'react';
import {useParams} from 'react-router-dom';
import {store} from '../../store';
import {sendReview} from '../../actions/api-actions';
import {MIN_COMMENT_LENGTH, RATING_DATA} from '../../constants';

const ReviewForm = () => {
  const {id} = useParams();
  const [formData, setFormData] = useState<RequestData>({
    comment: '',
    rating: '',
    offerId: id
  });

  const [isDisabledButton, setIsDisabledButton] = useState<boolean>(false);

  const fieldChangeHandle = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = evt.target;
    setFormData({...formData, [name]: value});
  };

  useEffect(() => {
    setIsDisabledButton(!(formData.rating && formData.comment.length > MIN_COMMENT_LENGTH));
  }, [formData]);

  const submitHandle = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    store.dispatch(sendReview(formData)).then(() => {
      evt.currentTarget.reset();
    });
  };

  return (
    <form className="reviews__form form" onSubmit={submitHandle}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {
          RATING_DATA.map(rating => (
            <Fragment key={rating.id}>
              <input className="form__rating-input visually-hidden"
                     name="rating"
                     value={rating.value}
                     id={rating.id}
                     type="radio"
                     onChange={fieldChangeHandle}/>
              <label htmlFor={rating.id}
                     className="reviews__rating-label form__rating-label"
                     title={rating.title}>
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star"/>
                </svg>
              </label>
            </Fragment>
          ))
        }
      </div>
      <textarea className="reviews__textarea form__textarea"
                id="review"
                name="comment"
                placeholder="Tell how was your stay, what you like and what can be improved"
                onChange={fieldChangeHandle}/>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and
          describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button"
                type="submit"
                disabled={isDisabledButton}>Submit
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;
