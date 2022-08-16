import {Link} from 'react-router-dom';
import {useAppSelector} from '../../hooks/stateHooks';
import {AppRouteList} from '../../router/enums';
import {store} from '../../store';
import {logout} from '../../actions/api-actions';
import {memo} from 'react';

type HeaderProps = {
  isLoginPage: boolean
}

const Header = ({isLoginPage}: HeaderProps) => {
  const authorizationStatus = useAppSelector(state => state.authorizationStatus);
  const userInfo = useAppSelector(state => state.userInfo);
  const favoriteList = useAppSelector(state => state.favoriteOffersList);
  const clickHandler = () => store.dispatch(logout());


  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link" to={AppRouteList.Main}>
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </Link>
          </div>
          {!isLoginPage &&
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <div className="header__nav-link header__nav-link--profile">
                  <div className="header__avatar-wrapper user__avatar-wrapper"
                       style={{'backgroundImage': authorizationStatus ? `url(${userInfo.avatarUrl})` : 'url(../img/avatar.svg)'}}/>
                  {authorizationStatus &&
                  <div>
                    <Link className="header__logo-link" to={AppRouteList.Favorites}>
                      <span className="header__user-name user__name">{userInfo.name}</span>
                    </Link>
                    <span className="header__favorite-count">{favoriteList.length}</span>
                  </div>}
                  {!authorizationStatus &&
                  <Link to={AppRouteList.Login}>
                    <span className="header__login">Sign in</span>
                  </Link>}
                </div>
              </li>
              {authorizationStatus &&
              <li className="header__nav-item">
                <a className="header__nav-link" href="#">
                  <span className="header__signout header__nav-link" onClick={clickHandler}>Sign out</span>
                </a>
              </li>}
            </ul>
          </nav>}
        </div>
      </div>
    </header>
  );
};

export default memo(Header);
