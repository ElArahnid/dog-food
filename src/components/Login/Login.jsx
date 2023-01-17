import {
  EMAIL_REGEXP,
  PASSWORD_REGEXP,
  VALIDATE_INPUTS_CONFIG,
} from "../../Utilites/constants.js";
import s from "./style.module.css";
import cn from "classnames";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { FormInput } from "../FormInput/FormInput.jsx";
import { FormButton } from "../FormButton/FormButton.jsx";
import { Form } from "../Form/Form.jsx";

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const location = useLocation();
  const firstPath = location.state?.firstPath;
  const navigate = useNavigate();

  const handleToReset = (event) => {
    event.preventDefault();
    navigate("/reset-password", {replace: true, state: { backLocation: location, firstPath }});
  };

  const handleToRegister = (event) => {
    event.preventDefault();
    navigate("/register", {replace: true, state: { backLocation: location, firstPath }});
  };

  const sendRegisterApi = (data) => {
    console.log(data);
  };

  const emailRegister = register("email", {
    required: {
      value: true,
      message: VALIDATE_INPUTS_CONFIG.requiredArea,
    },
    pattern: {
      value: EMAIL_REGEXP,
      message: VALIDATE_INPUTS_CONFIG.emailValidateFormat,
    },
  });

  const passwordRegister = register("password", {
    required: {
      value: true,
      message: VALIDATE_INPUTS_CONFIG.requiredArea,
    },
    pattern: {
      value: PASSWORD_REGEXP,
      message: VALIDATE_INPUTS_CONFIG.passwordValifate,
    },
    minLength: {
      value: 7,
      message: VALIDATE_INPUTS_CONFIG.passwordValifate,
    },
  });

  return (
    <>
      <Form title="Вход" handleFormSubmit={handleSubmit(sendRegisterApi)}>
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
        <FormInput
          {...passwordRegister}
          id="password"
          type="password"
          placeholder="Пароль"
        />
      </Form>
      <p className={cn(s.infotext, s.link)} onClick={handleToReset}>
        Восстановить пароль
      </p>
      <FormButton type="submit" color="yellow">
        Авторизоваться
      </FormButton>
      <FormButton type="button" color="white" onClick={handleToRegister}>
        Хочу зарегистрироваться
      </FormButton>
    </>
  );
};
