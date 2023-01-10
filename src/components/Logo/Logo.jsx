import React from 'react';
import './styles.css';
import LogoSrc from '../../assets/images/logo.svg';
import { Link } from 'react-router-dom';

function Logo({className, href, ...props}) {
    const hrefVariables = href ? href : "#";
    return (
        hrefVariables ?
        <Link to={{pathname: hrefVariables}} className={className ? className : "logo"} {...props}>
            <img src={LogoSrc} alt="Dog Food Logo" className='logo__pic' />
        </Link>
        :
        <Link href="#" className={className ? className : "logo"} {...props}>
            <img src={LogoSrc} alt="Dog Food Logo" className='logo__pic' />
        </Link>
    )
}

// React.memo не дает ререндериться коду компонента
export default React.memo(Logo);
