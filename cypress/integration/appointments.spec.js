describe('End to end tests', () => {
  const beforeEach = () => {
    cy.request("GET", "/api/debug/reset")

    cy.visit('/');

    cy.contains("Monday");
  }
  it("should book an interview",() => {
    beforeEach();

    cy.get("[alt=Add]").first().click();

    cy.get("input[name=name]").type("Bob Loblaw");

    cy.get("[alt='Sylvia Palmer']").click();

    cy.contains("Save").click();

    cy.contains(".appointment__card--show", "Bob Loblaw");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });
  it("should edit an interview", () => {
    beforeEach();

    cy.get("[alt=Edit]").first().click({force:true});

    cy.get("[alt='Tori Malcolm']").click();

    cy.get("input[name=name]").clear();

    cy.get("input[name=name]").type("Bob Loblaw");

    cy.contains("Save").click();

    cy.contains(".appointment__card--show", "Bob Loblaw");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });
  it("should cancel an interview", () => {
    beforeEach();

    cy.get("[alt=Delete]").first().click({force:true});

    cy.contains("Confirm").click();

    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");

    cy.contains(".appointment__card--show", "Archie Cohen").should("not.exist");
  })
})