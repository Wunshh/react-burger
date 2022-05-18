import { Link } from 'react-router-dom';

import  notFoundImg from '../images/ufo.png';

import notFoundStyle from './not-found.module.css';

function NotFound404() {
    return (
        <section className={notFoundStyle.page}>
            <img 
                className={notFoundStyle.img} 
                src={notFoundImg} 
                alt="Страница не найдена"
            />

            <p className={`${notFoundStyle.text} text text_type_main-default text_color_inactive`}>
                Страница не найдена.
                <Link 
                    to="/" 
                    className={notFoundStyle.link}
                >
                    Вернуться на главную
                </Link>
            </p>
        </section>
    );
}

export default NotFound404;