import { Form } from "../Form/Form";
import { FormInput } from "../FormInput/FormInput";
import '../../Utilites/constants.js'
import { EMAIL_REGEXP, PASSWORD_REGEXP, VALIDATE_INPUTS_CONFIG } from "../../Utilites/constants.js";
import { useForm } from "react-hook-form";
import { FormButton } from "../FormButton/FormButton";
import { useNavigate } from "react-router-dom";
import './style.module.css';

export const Register = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({ mode: "onBlur" });

      const navigate = useNavigate();

      const handleToLogin = (event) => {
        event.preventDefault();
        navigate('/login');
    }

    const sendRegisterApi = (data) => {
        console.log(data);
    }

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
    <Form title="Регистрация" handleFormSubmit={handleSubmit(sendRegisterApi)}>
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
    <p className="infoText">Регистрируясь на сайте вы соглашаетесь со всем, с чем соглашаетесь</p>
    <FormButton type='submit' color='yellow'>Зарегистрироваться</FormButton>
    <FormButton type='button' color='white' onClick={handleToLogin}>Хочу авторизоваться</FormButton>
    </>
  );
};
