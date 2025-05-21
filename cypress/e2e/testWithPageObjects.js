// SECTION 5 LESSON 32
import { navigateTo } from "../support/page_objects/navigationPage";

describe("Test with Page Objects", () => {
  beforeEach("open application", () => {
    cy.visit("/");
  });

  it("verify navigations across the pages", () => {
    navigateTo.formLayoutsPage();
    navigateTo.datepickerPage();
    navigateTo.smartTablePage();
    navigateTo.toasterPage();
    navigateTo.tooltipPage();
  });
});
