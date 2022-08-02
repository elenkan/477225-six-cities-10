import classNames from 'classnames';
import {useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/stateHooks';
import {setCurrentCity} from '../../actions/actions';

type PropsType = {
  citiesList: readonly string[]
}

const LocationsList = ({citiesList}:PropsType) => {
  const currentCity = useAppSelector((state) => state.city);
  const dispatch = useAppDispatch();
  const [city, setCity] = useState<string>(currentCity);

  const getTabActiveClass = (item:string) => classNames(
    {
      'locations__item-link tabs__item': true,
      'tabs__item--active': item === city
    });

  return (
    <section className="locations container">
    <ul className="locations__list tabs__list">
      {citiesList.map((item) =>
        <li className="locations__item" onClick={()=> {setCity(item); dispatch(setCurrentCity(item));}} key={item}>
          <a className={getTabActiveClass(item)} href="#">
            <span>{item}</span>
          </a>
        </li>)}
    </ul>
    </section>
  );
};

export default LocationsList;
