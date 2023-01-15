import { forwardRef } from 'react';
import s from './style.module.css';

export const FormInput = forwardRef((props, ref) => {
    // console.log(props);
    return (
        <input ref={ref} {...props} className={s.input} />
    )
})