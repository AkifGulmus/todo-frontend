const path = require("path");
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const { Pact } = require("@pact-foundation/pact");
const expect = chai.expect;

var defaultPort = 1234;

describe("Pact", () => {
  const provider = new Pact({
    consumer: "frontend",
    provider: "backend",
    port: defaultPort,
    log: path.resolve(process.cwd(), "logs", "pact.log"),
    dir: path.resolve(process.cwd(), "pacts"),
    logLevel: "INFO",
  });

  before(() => provider.setup());
  after(() => provider.finalize());
  afterEach(() => provider.verify());

  var expectedGetBody = [
    {
      todoID: "0f944e2d-77d4-4063-ac35-62342de49ad2",
      text: "Buy some milk",
      done: false,
    },
  ];

  describe("get request with correct parameters", () => {
    before(() =>
      provider.addInteraction({
        state: "A list of todos with one todo item",
        uponReceiving: "a request for all the todo items",
        withRequest: {
          method: "GET",
          path: "/todo-items",
          headers: { "Content-Type": "application/json" },
        },
        willRespondWith: {
          status: 200,
          body: expectedGetBody,
        },
      })
    );

    it("generates a list of TODO items", async () => {
      await chai
        .request(`localhost:${defaultPort}`)
        .get("/todo-items")
        .set("Content-Type", "application/json")
        .then(function(res) {
          expect(res).to.have.status(200);
          expect(res.text).to.deep.equal(JSON.stringify(expectedGetBody));
        });
    });
  });

  describe("post request to add a new todo item", () => {
    before(() =>
      provider.addInteraction({
        state: "A new todo item is added",
        uponReceiving: "a request to add a new todo item",
        withRequest: {
          method: "POST",
          path: "/todo-items",
          headers: { "Content-Type": "application/json" },
          body: { text: "Buy some milk" },
        },
        willRespondWith: {
          status: 202,
          headers: { "Content-Type": "application/json" },
        },
      })
    );

    it("properly gets the request for creating a new todo item", async () => {
      await chai
        .request(`localhost:${defaultPort}`)
        .post("/todo-items")
        .set("Content-Type", "application/json")
        .send({ text: "Buy some milk" })
        .then(function(res) {
          expect(res).to.have.status(202);
        });
    });
  });

  describe("put request to update todo status", () => {
    before(() =>
      provider.addInteraction({
        state: "There is a todo item to update the status of",
        uponReceiving: "a request to update status of a todo item",
        withRequest: {
          method: "PATCH",
          path: "/todo-items/0f944e2d-77d4-4063-ac35-62342de49ad2",
          headers: { "Content-Type": "application/json" },
        },
        willRespondWith: {
          status: 202,
          headers: { "Content-Type": "application/json" },
        },
      })
    );

    it("correctly updates the status of todo item", async () => {
      await chai
        .request(`localhost:${defaultPort}`)
        .patch("/todo-items/0f944e2d-77d4-4063-ac35-62342de49ad2")
        .set("Content-Type", "application/json")
        .then(function(res) {
          expect(res).to.have.status(202);
        });
    });
  });

  describe("delete request to remove a todo", () => {
    before(() =>
      provider.addInteraction({
        state: "A todo item to be deleted",
        uponReceiving: "a request to delete a todo item",
        withRequest: {
          method: "DELETE",
          path: "/todo-items/0f944e2d-77d4-4063-ac35-62342de49ad2",
          headers: { "Content-Type": "application/json" },
        },
        willRespondWith: {
          status: 202,
          headers: { "Content-Type": "application/json" },
        },
      })
    );

    it("correctly deletes a todo item", async () => {
      await chai
        .request(`localhost:${defaultPort}`)
        .delete("/todo-items/0f944e2d-77d4-4063-ac35-62342de49ad2")
        .set("Content-Type", "application/json")
        .then(function(res) {
          expect(res).to.have.status(202);
        });
    });
  });
});
