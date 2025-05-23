function selectDayFromCurrent(day) {
  let date = new Date();
  date.setDate(date.getDate() + day);
  let futureDay = date.getDate();
  let futureMonth = date.toLocaleDateString("default", { month: "short" });
  let dateToAssert = futureMonth + " " + futureDay + ", " + date.getFullYear();
  cy.get("nb-calendar-navigation")
    .invoke("attr", "ng-reflect-date")
    .then((dateAttribute) => {
      if (!dateAttribute.includes(futureMonth)) {
        cy.get("[data-name='chevron-right']").click();
        selectDayFromCurrent(day);
      } else {
        cy.get(".day-cell").not(".bounding-month").contains(futureDay).click();
      }
    });
  return dateToAssert;
}

export class DatepickerPage {
  selectCommonDatepickerDateFromToday(dayFroToday) {
    cy.contains("nb-card", "Common Datepicker")
      .find("input")
      .then((input) => {
        cy.wrap(input).click();
        let dateToAssert = selectDayFromCurrent(dayFroToday);
        cy.wrap(input).invoke("prop", "value").should("contain", dateToAssert);
        cy.wrap(input).should("have.value", dateToAssert);
      });
  }

  selectDatepickerWithRageFromToday(firstDay, secondDay) {
    cy.contains("nb-card", "Datepicker With Range")
      .find("input")
      .then((input) => {
        cy.wrap(input).click();
        let dateAssertFirst = selectDayFromCurrent(firstDay);
        let dateAssertSecond = selectDayFromCurrent(secondDay);
        const finalDate = dateAssertFirst + " - " + dateAssertSecond;
        cy.wrap(input).invoke("prop", "value").should("contain", finalDate);
        cy.wrap(input).should("have.value", finalDate);
      });
  }
}

export const onDatepickerPage = new DatepickerPage();
