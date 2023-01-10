import { useState } from "react";
import s from "./style.module.css";

export const FormLogin = ({serializeCallBack}) => {

const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    phoneNumber: '',
});

const [titleForm, setTitleForm] = useState('Введите данные');

const formChange = (e) => {
    console.log(e.target.value);
    setFormData({
        ...formData, // добавляем к старому состоянию новые значения
        // name - это параметр input, а не name, который в name=""
        [e.target.name] : e.target.value, // квадратная скобка - стандарт для ключа с переменной
    })
}

const buttonSubmit = (e) => {
    e.preventDefault();
    serializeCallBack(formData)
    setTitleForm('Данные отправлены');
    setFormData({
        name: '',
        lastName: '',
        phoneNumber: '',
    });
}

  return (
    <form onSubmit={buttonSubmit}>
      <h3>{titleForm}</h3>

      <input 
        type="text" 
        name="name" 
        placeholder="Имя" 
        value={formData.name}
        onChange={formChange}
        required
        />
      <input 
        type="text" 
        name="lastName" 
        placeholder="Фамилия" 
        value={formData.lastName}
        onChange={formChange}
        required
        />

      <input 
        type="number" 
        name="phoneNumber" 
        placeholder="Номер телефона" 
        value={formData.phoneNumber}
        onChange={formChange}
        />

      <button>Отправить</button>
    </form>
  );
};