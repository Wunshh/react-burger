import { useSelector } from 'react-redux';
import preloaderStyle from './preloader.module.css'

function Preloader() {

    const isSerch = useSelector((store: any) => store.ingredient.orederRequest);

    return (
        <div className={ isSerch ? preloaderStyle.preloader : preloaderStyle.preloaderInvisible }>
            <div className={preloaderStyle.preloader__container}>
                <span className={preloaderStyle.preloader__round}></span>
            </div>
        </div>
    )
};

export default Preloader;