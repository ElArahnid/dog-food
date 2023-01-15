import { useState } from "react";
import { Form } from '../Form/Form';

import s from "./style.module.css";

export const FormModal = () => {
  const [modalType, setModalType] = useState('registration');

  if (modalType === "registration") {
    return <Form 
    title='Регистрация'
    input={{email: 'E-Mail', password: 'Пароль'}}
    button={{submit: 'Зарегистрироваться', redirect: 'Войти'}}
    infotext='Регистрируясь на сайте вы соглашаетесь со всем, с чем соглашаетесь'
    formType='registration'
    changeType={setModalType}
    redirect={'login'}
    />;
  }

  if (modalType === "login") {
    return <Form 
    title='Авторизация'
    input={{email: 'E-Mail', password: 'Пароль'}}
    button={{submit: 'Войти', redirect: 'Зарегистрироваться'}}
    infotext='Восстановить пароль'
    formType='login'
    changeType={setModalType}
    redirect={'registration'}
    />;
  }

  if (modalType === "reset") {
    return <Form 
    title='Сброс пароля'
    input={{email: 'E-Mail'}}
    button={{submit: 'Сбросить пароль'}}
    infotext={{info: 'Для получения временного пароля необходимо вспомнить и ввести E-Mail, указанный при регистрации', timeToLive: 'Скрок действия временного пароля 10 секунд', }}
    formType='reset'
    changeType={setModalType}
    />;
  }

  return <></>;
};
