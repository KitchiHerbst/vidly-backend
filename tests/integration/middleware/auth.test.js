let server

const request = require("supertest");
const { Genre } = require("../../../models/genre");
const { User } = require("../../../models/user");

describe("Authorization Middleware", () => {
  beforeEach(() => {
    server = require("../../../index");
  });
  afterEach(async () => {
    server.close();
    await Genre.deleteMany();
  });

  let token;

  const execute = () => {
    return request(server)
      .post("/api/genres")
      .set("x-auth-token", token)
      .send({ name: "genre1" });
  };

  beforeEach(() => (token = new User().generateAuthToken()));

  it("returns 401 status if not token is provided", async () => {
    token = "";
    const res = await execute();
    expect(res.status).toBe(401);
  });

  it("returns 400 status if not token is invalid", async () => {
    token = "a";
    const res = await execute();
    expect(res.status).toBe(400);
  });

  it("returns 200 if token is valid", async () => {
    const res = await execute();
    expect(res.status).toBe(200);
  });
});
