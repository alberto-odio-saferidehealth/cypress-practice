//SECIONT 7 LESSON 50
descripe("shadow dom", () => {
  it("access shadow dom", () => {
    cy.visit("https://radogado.github.io/shadow-dom-demo/");
    //cy.get("#container"); -> this will not work because #container is inside shadow DOM
    cy.get("#app").shadow().find("#container");
  });
});
