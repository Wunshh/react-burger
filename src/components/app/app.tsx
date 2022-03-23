import { useEffect, useState } from 'react';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import * as api from '../../utils/api';

function App() {

  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    api.getIngredientsData()
    .then((res) => {
      setIngredients(res.data);      
    })
  }, []);

  return (
    <div className={appStyles.app} id="react-modals">
      <AppHeader />
      
      <main className={appStyles.main}>
        <BurgerIngredients data={ingredients}/>
        <BurgerConstructor />
      </main>
    </div>
  );
}

export default App;
