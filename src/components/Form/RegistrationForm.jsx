import { useForm } from "react-hook-form";
import { FormInput } from "../FormInput/FormInput";
import "./style.module.css";

function RegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
  mode: "onBlur",
  });

  // тут просто консолим данные, отправленные формой
  const callBackSubmit = (dataFromHookForm) => {
    console.log(dataFromHookForm);
  };

  for (const errRef in errors) {
    errors[errRef].ref.parentElement.firstChild.classList.add("errorStyle");
    // console.log(errors[errRef].ref.parentElement.firstChild);
  }

  return (
    <form onSubmit={handleSubmit(callBackSubmit)}>
      <h3>Регистрация</h3>

      <label>
        <span>{errors?.name && errors.name.message}</span>
        <FormInput
          {...register("name", {
            required: "Имя обязательно",
            minLength: { value: 3, message: `Минимум 3 символа` },
          })}
          type="text"
          placeholder="Имя"
        />
      </label>

      <label>
        <span>{errors?.email && errors.email.message}</span>
        <input
          {...register("email", {
            required: "E-Mail обязателен для заполнения",
            pattern: {
              value: /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/,
              message: "Формат E-mail неправильный",
            },
          })}
          type="email"
          placeholder="E-Mail"
        />
      </label>

      <label>
        <span>{errors?.password && errors.password.message}</span>
        <input
          {...register("password", {
            required: "Пароль обязателен для заполнения",
            minLength: {
              value: 7,
              message: "Минимальная длина пароля 7 символов",
            },
            pattern: {
              value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/,
              message:
                "Пароль должен сожержать цифры, латинские буквы и символы",
            },
          })}
          type="password"
          placeholder="Пароль"
        />
      </label>

      <button>Зарегистрироваться</button>
    </form>
  );
}

export default RegistrationForm;
