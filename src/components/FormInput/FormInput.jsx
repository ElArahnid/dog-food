import { forwardRef } from 'react';
import s from './style.module.css';
import cn from 'classnames';

export const FormInput = forwardRef((props, ref) => {
    // console.log(props);
    return (
        props.typeinput === 'textarea' 
        ?
            <textarea ref={ref} {...props} className={cn(s.input, s.textarea)} />
        : 
            <input ref={ref} {...props} className={s.input} />

    )
})