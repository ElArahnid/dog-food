import React from 'react';
import './styles.css';
import LogoSrc from '../../assets/images/logo.svg';
import { Link } from 'react-router-dom';

function Logo({className, href, ...props}) {
    return (
        <Link to='/' className={className ? className : "logo"} {...props}>
            <img src={LogoSrc} alt="Dog Food Logo" className='logo__pic' />
        </Link>
    )
}

// React.memo не дает ререндериться коду компонента
export default React.memo(Logo);
