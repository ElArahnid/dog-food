import React from 'react';
import './styles.css';
import LogoSrc from '../../assets/images/logo.svg';

function Logo({className, href, ...props}) {
    return (
        <a href={href ? href : "#"} className={className ? className : "logo"} {...props}>
            <img src={LogoSrc} alt="Dog Food Logo" className='logo__pic' />
        </a>
    )
}

// React.memo не дает ререндериться коду компонента
export default React.memo(Logo);
