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
import { useState } from "react";
import { Rate } from "../Rate/Rate.jsx";
  
  export const ReviewForm = ({reviewTitle = 'Отзыв о товаре', productName}) => {

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({ mode: "onBlur" });

    const [rating, setRating] = useState(null); 

    const sendReview = (data) => {
      console.log({...data, rating});
    };
  
    const reviewText = register("text", {
      required: {
        value: true,
        message: VALIDATE_INPUTS_CONFIG.requiredArea,
      }
    });
  
    return (
      <>
        <Form title={reviewTitle} handleFormSubmit={handleSubmit(sendReview)}>
        <Rate rating={rating} setRating={setRating} isEditable />
          <div>
            {errors?.text && (
              <p className="errorMessage">{errors?.text?.message}</p>
            )}
          </div>
          <FormInput
            {...reviewText}
            id="review"
            type="text"
            placeholder={`Скажите, что вы думаете о товаре "${productName}"`}
          />
        <FormButton type="submit" color="yellow">Отправить отзыв</FormButton>
        </Form>
      </>
    );
  };
  