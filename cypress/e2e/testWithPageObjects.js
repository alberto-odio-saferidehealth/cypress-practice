// SECTION 5 LESSON 33
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

  it.only("should submit inline form and basic form and select tomorrow date in the calendar", () => {
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
  });
});
