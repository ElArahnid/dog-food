import s from "./style.module.css";
import cn from 'classnames';

export const IndexBanner = ({ title, subtitle, bg, price, extraClass, colorBg }) => {
    return (
    <>
      <div 
      className={cn(s.banner, {[s[extraClass]]: !!extraClass})} 
      style=
        {{
            backgroundImage: `url(${bg})`,
            backgroundColor: colorBg,
        }}>
        <h2 className={s.title}>{title}</h2>
        <h3 className={s.subtitle}>{subtitle}</h3>
        <span className={s.price}>{price}</span>
      </div>
    </>
  );
};
