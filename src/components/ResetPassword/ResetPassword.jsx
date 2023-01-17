import s from './style.module.css';
import cn from 'classnames';
import { EMAIL_REGEXP, VALIDATE_INPUTS_CONFIG } from '../../Utilites/constants';
import { Form } from '../Form/Form';
import { FormInput } from '../FormInput/FormInput';
import { FormButton } from '../FormButton/FormButton';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

export const ResetPassword = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({ mode: "onBlur" });
    
      const location = useLocation();
      const firstPath = location.state?.firstPath;
      const navigate = useNavigate({
        replace: true,
        state: { backLocation: location, firstPath },
      });
    
      const handleToLogin = (event) => {
        event.preventDefault();
        navigate("/login", {replace: true, state: { backLocation: location, firstPath }});
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
    
      return (
        <>
          <Form
            title="Сброс пароля"
            handleFormSubmit={handleSubmit(sendRegisterApi)}
          >
          <p className="infoText">
          Для получения временного пароля необходимо вспомнить и ввести E-Mail, указанный при регистрации
          </p>
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
          </Form>
          <p className="infoText">
          Срок жизни временного пароля 24 часа
          </p>
          <FormButton type="submit" color="yellow">
            Сбросить пароль!
          </FormButton>
          <FormButton type="button" color="white" onClick={handleToLogin}>
            Я вспомнил(а) пароль, хочу авторизоваться
          </FormButton>
        </>
      );
}