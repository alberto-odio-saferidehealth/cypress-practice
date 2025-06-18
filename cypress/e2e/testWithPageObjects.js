// SECTION 5 LESSON 33
// SECTION 7 LESSON 49
import { navigateTo } from "../support/page_objects/navigationPage";
import { onFormLayoutsPage } from "../support/page_objects/formLayoutsPage";
import { onDatepickerPage } from "../support/page_objects/datepickerPage";
import { onSmartTablePage } from "../support/page_objects/smartTablePage";
describe("Test with Page Objects", () => {
  beforeEach("open application", () => {
    cy.openHomePage();
  });

  it("verify navigations across the pages", () => {
    navigateTo.formLayoutsPage();
    navigateTo.datepickerPage();
    navigateTo.smartTablePage();
    navigateTo.toasterPage();
    navigateTo.tooltipPage();
  });

  it.only(
    "should submit inline form and basic form and select tomorrow date in the calendar",
    { browser: "chrome" },
    () => {
      navigateTo.formLayoutsPage();
      onFormLayoutsPage.submitInlineFormWithNameAndEmail(
        "Artem",
        "test@test.com"
      );
      onFormLayoutsPage.submitBasicFormWithEmailAndPassword(
        "test@test.com",
        "password"
      );
      navigateTo.datepickerPage();
      onDatepickerPage.selectCommonDatepickerDateFromToday(1);
      onDatepickerPage.selectDatepickerWithRageFromToday(7, 14);
      navigateTo.smartTablePage();
      onSmartTablePage.addNewRecordWithFirstAndLastName("Artem", "Bondar");
      onSmartTablePage.updateAgeByFirstName("Artem", "30");
      onSmartTablePage.deleteRowByIndex(1);
    }
  );
});

//"cy:run_spec": "npx cypress run --spec 'cypress/e2e/testWithPageObjects.js' --browser chrome" -> package.json -> scripts -> you can also add --headed
// it("test",{ browser: ["!chrome", "!edge"] },() => { -> this will run the test in any browser except chrome and edge
// you can also add in the describe block

//docs.cypress.io/guides/launching-browsers#WebKit-Experimental  -> this is to use safari
