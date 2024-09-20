/// <reference types="cypress" />

describe('First test suite', () => {

    // describe('suite section', () => {

    //     beforeEach('login', () => {
    //         //repeat for every test


    //     })

    //     it('first test', () => {

    //         //put the code of the test
    //     })
    
    
    //     it('second test', () => {
    
    //         //put the code of the second test
    //     })
    // })

    it('first test', () => {
        //put the code of the test

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()


        //find element by tab name
        cy.get('input')

        //by ID
        cy.get('#inputEmail1')

        //by Class value
        cy.get('.input-full-width')

        //by attribute name
        cy.get('[fullwidth]')

        //by Attribute and value
        cy.get('[placeholder="Email"]')

        //by entire class value, dont delete a part it wont work
        cy.get('[class="input-full-width size-medium shape-rectangle"]')

        //by two attributes
        cy.get('[placeholder="Email"][fullwidth]')

        //by tag, attribute id and class
        cy.get('input[placeholder="Email"]#inputEmail1.input-full-width')

        //by cypress test id, works really well if you have access to the source code
        cy.get('[data-cy="imputEmail1"]')

    })


     it.only('second test', () => {
         //put the code of the second test
         cy.visit('/')
         cy.contains('Forms').click()
         cy.contains('Form Layouts').click()

         //Theory
         // get() - find elements on the page by locator globally
         // find() - find child elements by locator
         // contains () - find HTML text and by text and locator

        cy.contains('Sign in')
        cy.contains('[status="warning"]', 'Sign in')
        cy.contains('nb-card','Horizontal form').find('button')
        cy.contains('nb-card','Horizontal form').contains('Sign in')
        cy.contains('nb-card','Horizontal form').get('button')


        //cypress chains and DOM
        cy.get('#inputEmail3')
            .parents('form')
            .find('button')
            .should('contain', 'Sign in')
            .parents('form')
            .find('nb-checkbox')
            .click()
     })


    // it('third test', () => {

    //     //put the code of the third test
    // })

})

// describe('Second test suite', () => {

//     it('first test', () => {

//         //put the code of the test
//     })


//     it('second test', () => {

//         //put the code of the second test
//     })


//     it('third test', () => {

//         //put the code of the third test
//     })

// })