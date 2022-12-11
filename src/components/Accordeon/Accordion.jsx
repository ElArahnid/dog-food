import { useState } from 'react';
import cn from 'classnames';
import s from './style.module.css';

export const Accordion = ({children, title}) => {
    const [selected, setSelected] = useState(false);

    function switcherStateAccordion() {
        setSelected(!selected);
    }

    return (
        <div className={cn(s.accordion, {[s.active]: selected})}>
            <button onClick={switcherStateAccordion} className={s.accordionButton}>
                <p className={s.title}>{title}</p></button>
                <div className={s.content}>
                    <p className={s.text}>{children}</p>
                </div>
            
        </div>
    )
}