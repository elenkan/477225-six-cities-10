import Header from '../../components/header';
import {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {AuthData} from '../../types/auth';
import {store} from '../../store';
import {login} from '../../actions/api-actions';
import {useNavigate} from 'react-router-dom';

type PropsType = {
  isAuth: boolean
}

const Login = ({isAuth}: PropsType) => {
  const [formData, setFormData] = useState<AuthData>({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate('/', { replace: true });
    }
  },[]);

  const fieldChangeHandle = (evt: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = evt.target;
    setFormData({...formData, [name]: value});
  };

  const submitHandle = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    store.dispatch(login(formData)).then(() => {
      navigate('/', { replace: true });
    });
  };

  return (
    <div className="page page--gray page--login">
      <Header isLoginPage/>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" onSubmit={submitHandle}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input className="login__input form__input"
                       type="email"
                       name="email"
                       placeholder="Email"
                       required
                       onChange={fieldChangeHandle}/>
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input className="login__input form__input"
                       type="password"
                       name="password"
                       placeholder="Password"
                       required
                       onChange={fieldChangeHandle}/>
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Login;


