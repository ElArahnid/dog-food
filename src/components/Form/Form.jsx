// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { FormInput } from "../FormInput/FormInput";
// import { FormButton } from "../FormButton/FormButton";
// import cn from "classnames";
import s from "./style.module.css";

export const Form = ({ title, handleFormSubmit, children}) => {
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm({ mode: "onBlur" });

  return (
    <form onSubmit={handleFormSubmit}>

      <h1 className={s.headTitle}>{title}</h1>
      {children}


        {/* <div>
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
        )} */}

    </form>
  );
};
