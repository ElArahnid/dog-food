import {
    VALIDATE_INPUTS_CONFIG,
  } from "../../Utilites/constants.js";
  import { useForm } from "react-hook-form";
  import { FormInput } from "../FormInput/FormInput.jsx";
  import { FormButton } from "../FormButton/FormButton.jsx";
  import { Form } from "../Form/Form.jsx";
import { useState } from "react";
import { Rate } from "../Rate/Rate.jsx";
import api from "../../Utilites/Api.js";
  
  export const ReviewForm = ({
    reviewTitle = 'Отзыв о товаре', 
    productName, 
    productId, 
    setProduct,
    scrollToReviewsStart
  }) => {

    const {
      register,
      handleSubmit,
      setValue,
      formState: { errors },
    } = useForm({ mode: "onBlur" });

    const [rating, setRating] = useState(5); 

    const sendReview = (data) => {
      api.postReviewProduct(productId, {...data, rating})
      .then(newReview => setProduct && setProduct(newReview))
      .then(setValue("text", ""))
      .then(scrollToReviewsStart())
    };
  
    const reviewText = register("text", {
      required: {
        value: true,
        message: VALIDATE_INPUTS_CONFIG.requiredArea,
      }
    });

    // console.log(reviewText);
  
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
            typeinput="textarea"
            placeholder={`Скажите, что вы думаете о товаре "${productName}"`}
          />
        <FormButton type="submit" color="yellow">Отправить отзыв</FormButton>
        </Form>
      </>
    );
  };
  