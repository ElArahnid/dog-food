import { useState } from "react";
import { useForm } from "react-hook-form";
import { FormInput } from "../FormInput/FormInput";
import s from "./style.module.css";
import cn from "classnames";
import { FormButton } from "../FormButton/FormButton";

export const Form = ({
  title,
  input,
  button,
  infotext,
  formType,
  changeType,
  redirect,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const callBackSubmit = (dataFromHookForm) => {
    console.log(dataFromHookForm);
  };

  const emailRegExp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const passwordRegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const emailRegister = register("email", {
    required: {
      value: true,
      message: "E-Mail обязателен для заполнения",
    },
    pattern: {
      value: emailRegExp,
      message: "Что-то не так с форматом E-Mail",
    },
  });

  const passwordRegister = register("password", {
    required: {
      value: true,
      message: "Пароль обязателен для заполнения",
    },
    pattern: {
      value: passwordRegExp,
      message: "Пароль должен содержать цифры, латинские буквы и символы",
    },
    minLength: {
      value: 7,
      message: "Минимальная длина пароля 7 символов",
    },
  });

  return (
    <form onSubmit={handleSubmit(callBackSubmit)}>

      <h1 className={s.title}>{title}</h1>

        <div>
          {errors?.email && (
            <p className="errorMessage">{errors?.email?.message}</p>
          )}
        </div>
        <FormInput
          {...emailRegister}
          id="email"
          type="text"
          placeholder="E-Mail"
        />

        <div>
          {errors?.password && (
            <p className="errorMessage">{errors?.password?.message}</p>
          )}
        </div>
        {["registration", "login"].includes(formType) && (
          <FormInput 
          {...passwordRegister} 
          id="password" 
          type="password" 
          />
        )}

        {(formType === 'login') && (
            <p className={cn(s.infotext, s.link)} onClick={() => changeType('reset')}>{infotext}</p>
        )}

        {["registration", "reset"].includes(formType) && (
          <p className={s.infotext}>{infotext}</p>
        )}

        <FormButton type='submit' color='yellow'>{button.submit}</FormButton>

        {["registration", "login"].includes(formType) && (
          <FormButton type='button' color='white' 
          onClick={() => changeType(redirect)}>{button.redirect}</FormButton>
        )}

    </form>
  );
};
