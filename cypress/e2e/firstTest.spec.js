/// <reference types="cypress" />

/*SECTION 4 LESSON 30
to run:
npm start
npx cypress open*/

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

  it("Date picker", () => {
    function selectDayFromCurrent(day) {
      let date = new Date();
      date.setDate(date.getDate() + day);
      let futureDay = date.getDate();
      let futureMonth = date.toLocaleDateString("en-US", { month: "short" });
      let futureYear = date.getFullYear();
      let dateToAssert = `${futureMonth} ${futureDay}, ${futureYear}`;
      cy.get("nb-calendar-navigation")
        .invoke("attr", "ng-reflect-date")
        .then((dateAttribute) => {
          if (
            !dateAttribute.includes(futureMonth) ||
            !dateAttribute.includes(futureYear)
          ) {
            cy.get("[data-name='chevron-right']").click();
            selectDayFromCurrent();
          } else {
            cy.get(".day-cell")
              .not("bounding-month")
              .contains(futureDay)
              .click();
          }
        });
      return dateToAssert;
    }
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Datepicker").click();
    cy.contains("nb-card", "Common Datepicker")
      .find("input")
      .then((input) => {
        cy.wrap(input).click();
        const dateToAssert = selectDayFromCurrent(5);
        cy.wrap(input).invoke("prop", "value").should("contain", dateToAssert);
        cy.wrap(input).should("have.value", dateToAssert);
      });
  });

  it("Lists and dropdowns", () => {
    cy.visit("/");
    //1
    //cy.get("nav").find("nb-select").click()
    cy.get("nav nb-select").click();
    cy.get(".options-list").contains("Dark").click();
    cy.get("nav nb-select").should("contain", "Dark");

    //2
    cy.get("nav nb-select").then((dropDown) => {
      cy.wrap(dropDown).click();
      cy.get(".options-list nb-option").each((listItem, index) => {
        const itemText = listItem.text().trim();
        cy.wrap(listItem).click();
        cy.wrap(dropDown).should("contain", itemText);
        if (index < 3) {
          cy.wrap(dropDown).click();
        }
      });
    });
  });
  it("Web tables", () => {
    cy.visit("/");
    cy.contains("Tables & Data").click();
    cy.contains("Smart Table").click();

    //1 Get the row by text
    cy.get("tbody")
      .contains("tr", "Larry")
      .then((tableRow) => {
        cy.wrap(tableRow).find(".nb-edit").click();
        cy.wrap(tableRow).find('[placeholder="Age"]').clear().type("35");
        cy.wrap(tableRow).find(".nb-checkmark").click();
        cy.wrap(tableRow).find("td").eq(6).should("contain", "35");
      });
    //2 Get the row by index
    cy.get("thead").find(".nb-plus").click();
    cy.get("thead")
      .find("tr")
      .eq(2)
      .then((tableRow) => {
        cy.wrap(tableRow).find('[placeholder="First Name"]').type("John");
        cy.wrap(tableRow).find('[placeholder="Last Name"]').type("Smith");
        cy.wrap(tableRow).find(".nb-checkmark").click();
      });

    cy.get("tbody tr")
      .first()
      .find("td")
      .then((tableColumns) => {
        cy.wrap(tableColumns).eq(2).should("contain", "John");
        cy.wrap(tableColumns).eq(3).should("contain", "Smith");
      });
    //3 Get each row validation
    const age = [20, 30, 40, 200];
    cy.wrap(age).each((age) => {
      cy.get("thead [placeholder='Age']").clear().type(age);
      cy.wait(500);
      cy.get("tbody tr").each((tableRow) => {
        if (age == 200) {
          cy.wrap(tableRow).should("contain", "No data found");
        } else {
          cy.wrap(tableRow).find("td").eq(6).should("contain", age);
        }
      });
    });
  });

  it("tooltips", () => {
    cy.visit("/");
    cy.contains("Modal & Overlays").click();
    cy.contains("Tooltip").click();
    cy.contains("nb-card", "Colored Tooltips").contains("Default").click();
  });

  it("dialog box", () => {
    cy.visit("/");
    cy.contains("Tables & Data").click();
    cy.contains("Smart Table").click();
    //1
    //cy.get("tbody tr").first().find(".nb-trash").click();
    //cy.on("window:confirm", (confirm) => {
    //  expect(confirm).to.equal("Are you sure you want to delete?");
    //});
    //2 cleaner
    //const stub = cy.stub();
    //cy.on("window:confirm", stub);
    //cy.get("tbody tr")
    //  .first()
    //  .find(".nb-trash")
    //  .click()
    //  .then(() => {
    //    expect(stub.getCall(0)).to.be.calledWith(
    //      "Are you sure you want to delete?"
    //    );
    //3
    cy.get("tbody tr").first().find(".nb-trash").click();
    cy.on("window:confirm", () => false);
  });
  //more on assertions
  //https://docs.cypress.io/app/references/assertions
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
