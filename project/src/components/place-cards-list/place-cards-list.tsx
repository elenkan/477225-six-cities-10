import {useState, useEffect, useMemo} from 'react';
import {useLocation} from 'react-router-dom';
import {Card} from '../../types';
import PlaceCard from '../place-card';
import classNames from 'classnames';

type PropsType = {
  cardsList: Card[]
}

const PlaceCardsList = ({cardsList}: PropsType) => {
  const [classTitle, setClassTitle] = useState<string>('');
  const location = useLocation();
  const memoCardList = useMemo(() => cardsList,[cardsList]);
  const classListTitle = classNames(
    {
      'favorites__places': location.pathname.includes('favorites'),
      'cities__places-list places__list tabs__content': location.pathname === '/',
      'near-places__list places__list': location.pathname.includes('offer')
    }
  );

  const getClassTitle = (path: string) => {
    if (path === '/') {
      setClassTitle('cities');
    }
    if (path.includes('favorites')) {
      setClassTitle('favorites');
    }
    if (path.includes('offer')) {
      setClassTitle('near-places');
    }
    return '';
  };

  useEffect(() => {
    getClassTitle(location.pathname);
  }, [location]);

  return (
    <div className={classListTitle}>
      {memoCardList.map(item => <PlaceCard cardItem={item}
                                       classTitle={classTitle}
                                       key={item.id}
      />)}
    </div>
  );
};

export default PlaceCardsList;
