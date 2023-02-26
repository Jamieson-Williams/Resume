const getCosmosClient = require("./CosmosClient");

describe('Cosmos Test', () => {
  it('Grab value from Cosmos DB and compare with value on Site', async () => {
    const client = getCosmosClient();
    
    const databaseId = "serverless-db";
    const containerId = "visitors";

    const database = client.database(databaseId);
    const container = database.container(containerId);

    const itemId = "counter";

    cy.visit('https://www.jamresume.com/');
    const expectedValue = cy.get('#apiResponse').then((text) => {
      return parseInt(text);
    });
    const resolvedExpectedValue = await expectedValue

    cy.wrap(container.item(itemId)).then((response) => {
      const item = response.resource;
      expect(item).to.have.property("value").that.equal(resolvedExpectedValue);
    });
  });
});