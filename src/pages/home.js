import { useState } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import IngredientDetail from '../components/ingredient-details/ingredient-details';
import OrderDetails from '../components/order-details/order-details';
import Modal from '../components/modal/modal';

import homePageStyle from './home.module.css'

function HomePage() {

    const [isIngredientModalShown, setIsIngredientModalShown] = useState(false);
    const [isOrderModalShown, setIsOrderModalShown] = useState(false);
  
    function handleIngredientClick() {
      setIsIngredientModalShown(true);
    }
  
    function handleModalClose() {
      setIsIngredientModalShown(false);
      setIsOrderModalShown(false);
    }
  
    function handleOrderClick() {
      setIsOrderModalShown(true);
    }

    return (
        <>
            <main className={homePageStyle.main}>
                <DndProvider backend={HTML5Backend}>
                    <BurgerIngredients 
                        onCardClick={handleIngredientClick} 
                    />
                    
                    <BurgerConstructor 
                        onButtonClick={handleOrderClick} 
                    />
                </DndProvider>
            </main>
            
            {isIngredientModalShown && 
                <Modal 
                    header="Детали ингридиента"
                    onClose={handleModalClose}
                >
                    <IngredientDetail />
                </Modal>
            }

            {isOrderModalShown && 
                <Modal
                    onClose={handleModalClose}
                >
                    <OrderDetails />
                </Modal>
            }
        </>
    );
}

export default HomePage;