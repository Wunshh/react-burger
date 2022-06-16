import { BASE_URL } from '../../src/utils/data';

describe('серсив доступен', function() {
    it('доступен по адресу localhost:3000', () => {
      cy.visit('http://localhost:3000');
    });

    it('перетаскивание ингредиента в контруктор', () => {
        cy.get('*[class^="burger-ingredient"]').contains('Флюоресцентная булка R2-D3').trigger('dragstart');
        cy.get('*[class^="burger-constructor_section"]').trigger('drop');
        cy.get('*[class^="burger-ingredient"]').contains('Соус фирменный Space Sauce').trigger('dragstart');
        cy.get('*[class^="burger-constructor_section"]').trigger('drop');
    });

    it('открыть модальное окно с ингредиентом', () => {
        cy.get('*[class^="burger-ingredient"]').contains('Соус фирменный Space Sauce').click();
        cy.location('pathname').should('eq', '/ingredients/60d3b41abdacab0026a733cd');
        cy.get('*[class^="modal"]').contains('Соус фирменный Space Sauce');
    });

    it('закрыть модальное окно', () => {
        cy.get('*[class^="modal-header"]').find('svg').click();
        cy.get('*[class^="modal"]').should('not.exist');
    });

    it('логин и оформление заказа', () => {
        cy.get('button').contains('Оформить заказ').click();
        cy.location('pathname').should('eq', '/login');
        cy.get('input[name="email"]').type('davydova9846@ya.ru');
        cy.get('input[name="password"]').type('123456789');
        cy.get('button').contains('Войти').click();
        cy.location('pathname').should('eq', '/');
        cy.get('button').contains('Оформить заказ').click();
        cy.intercept("POST", `${BASE_URL}/orders`).as('sendOrder');
        cy.wait("@sendOrder");
        cy.get('*[class^="modal"]').contains('Ваш заказ начали готовить');
        cy.get('*[class^="modal"]').should("exist");
    });

    it('закрыть модальное окно', () => {
        cy.get('*[class^="modal-header"]').find('svg').click();
        cy.get('*[class^="modal"]').should('not.exist');
    });

    it('оформление заказа', () => {
        cy.get('*[class^="burger-ingredient"]').contains('Флюоресцентная булка R2-D3').trigger('dragstart');
        cy.get('*[class^="burger-constructor_section"]').trigger('drop');
        cy.get('*[class^="burger-ingredient"]').contains('Соус фирменный Space Sauce').trigger('dragstart');
        cy.get('*[class^="burger-constructor_section"]').trigger('drop');
        cy.get('button').contains('Оформить заказ').click();
        cy.intercept("POST", `${BASE_URL}/orders`).as('sendOrder');
        cy.wait("@sendOrder");
        cy.get('*[class^="modal"]').contains('Ваш заказ начали готовить');
        cy.get('*[class^="modal"]').should("exist");
    });

    it('закрыть модальное окно', () => {
        cy.get('*[class^="modal-header"]').find('svg').click();
        cy.get('*[class^="modal"]').should('not.exist');
    });
}); 



