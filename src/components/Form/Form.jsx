import s from "./style.module.css";

export const Form = ({ title, handleFormSubmit, children}) => {

  return (
    <form onSubmit={handleFormSubmit}>

      <h1 className={s.headTitle}>{title}</h1>
      {children}

    </form>
  );
};
