/// <reference types="cypress" />

//SECTION 4 LESSON 25

describe("First test suite", () => {
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

  it("first test", () => {
    //put the code of the test

    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    //find element by tab name
    cy.get("input");

    //by ID
    cy.get("#inputEmail1");

    //by Class value
    cy.get(".input-full-width");

    //by attribute name
    cy.get("[fullwidth]");

    //by Attribute and value
    cy.get('[placeholder="Email"]');

    //by entire class value, dont delete a part it wont work
    cy.get('[class="input-full-width size-medium shape-rectangle"]');

    //by two attributes
    cy.get('[placeholder="Email"][fullwidth]');

    //by tag, attribute id and class
    cy.get('input[placeholder="Email"]#inputEmail1.input-full-width');

    //by cypress test id, works really well if you have access to the source code
    cy.get('[data-cy="imputEmail1"]');
  });

  it("second test", () => {
    //put the code of the second test
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    //Theory
    // get() - find elements on the page by locator globally
    // find() - find child elements by locator
    // contains () - find HTML text and by text and locator

    cy.contains("Sign in");
    cy.contains('[status="warning"]', "Sign in");
    cy.contains("nb-card", "Horizontal form").find("button");
    cy.contains("nb-card", "Horizontal form").contains("Sign in");
    cy.contains("nb-card", "Horizontal form").get("button");

    //cypress chains and DOM
    cy.get("#inputEmail3")
      .parents("form")
      .find("button")
      .should("contain", "Sign in")
      .parents("form")
      .find("nb-checkbox")
      .click();
  });

  it("save subject of the command", () => {
    //put the code of the third test
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    //cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain','Email')
    //cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain','Password')

    //THIS APPROACH IS INCORRECT
    // const usingTheGrid = cy.contains('nb-card', 'Using the Grid')
    // usingTheGrid.find('[for="inputEmail1"]').should('contain','Email')
    // usingTheGrid.find('[for="inputPassword2"]').should('contain','Password')

    // 1 Cypress Alias
    cy.contains("nb-card", "Using the Grid").as("usingTheGrid"); //very convenient, you can call it later
    cy.get("@usingTheGrid")
      .find('[for="inputEmail1"]')
      .should("contain", "Email");
    cy.get("@usingTheGrid")
      .find('[for="inputPassword2"]')
      .should("contain", "Password");

    // 2 Cypress then() methods
    cy.contains("nb-card", "Using the Grid").then((usingTheGridForm) => {
      cy.wrap(usingTheGridForm)
        .find('[for="inputEmail1"]')
        .should("contain", "Email");
      cy.wrap(usingTheGridForm)
        .find('[for="inputPassword2"]')
        .should("contain", "Password");
    });
  });
  it("extract text values", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    //1
    cy.get('[for="exampleInputEmail1"]').should("contain", "Email address");

    //2 using jquery text method to extract the html text, then you can assign this value to variable const and assert or any other op
    cy.get('[for="exampleInputEmail1"]').then((label) => {
      const labelText = label.text();
      expect(labelText).to.equal("Email address");
      cy.wrap(labelText).should("contain", "Email address");
    });
    //3 use cypress method, invoke provide it the text argument, cypress will return you a text value for that element that you are invoking from
    cy.get('[for="exampleInputEmail1"]')
      .invoke("text")
      .then((text) => {
        expect(text).to.equal("Email address");
      });
    //3.1
    cy.get('[for="exampleInputEmail1"]')
      .invoke("text")
      .as("labelText")
      .should("contain", "Email address");

    //4 invoke to get attribute and name like class
    cy.get('[for="exampleInputEmail1"]')
      .invoke("attr", "class")
      .then((classValue) => {
        expect(classValue).to.equal("label");
      });
    //5 invoke property using prop key and value to extract value from the input key
    cy.get("#exampleInputEmail1").type("test@test.com");
    cy.get("#exampleInputEmail1")
      .invoke("prop", "value")
      .should("contain", "test@test.com")
      .then((property) => {
        expect(property).to.equal("test@test.com");
      });
  });

  it("radio buttons", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();
    cy.contains("nb-card", "Using the Grid")
      .find('[type= "radio"]')
      .then((radioButtons) => {
        cy.wrap(radioButtons).eq(0).check({ force: true }).should("be.checked");
        cy.wrap(radioButtons).eq(1).check({ force: true });
        cy.wrap(radioButtons).eq(0).should("not.be.checked");
        cy.wrap(radioButtons).eq(2).should("be.disabled");
      });
  });
  it("checkboxes", () => {
    cy.visit("/");
    cy.contains("Modal & Overlays").click();
    cy.contains("Toastr").click();

    //cy.get('[type="checkbox"]').uncheck({force:true});
    cy.get('[type="checkbox"]').eq(0).click({ force: true });
    cy.get('[type="checkbox"]').eq(1).check({ force: true });
  });

  it.only("Date picker", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Datepicker").click();

    let date = new Date();
    date.setDate(date.getDate() + 5);
    let futureDate = date.getDate();
    let dateToAssert = `Oct ${futureDate}, 2024`;

    cy.contains("nb-card", "Common Datepicker")
      .find("input")
      .then((input) => {
        cy.wrap(input).click();
        cy.get(".day-cell").not("bounding-month").contains(futureDate).click();
        cy.wrap(input).invoke("prop", "value").should("contain", dateToAssert);
        cy.wrap(input).should("have.value", dateToAssert);
      });
  });
});

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
