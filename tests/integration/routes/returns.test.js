let server;
const { Rental } = require("../../../models/rental");
const { User } = require("../../../models/user");
const mongoose = require("mongoose");
const request = require("supertest");
const { expectCt } = require("helmet");
// const { expectCt } = require("helmet");

describe("/api/returns", () => {
  let customerId;
  let movieId;
  let rental;
  let token;

  beforeEach(async () => {
    server = require("../../../index");
    token = new User().generateAuthToken();
    customerId = mongoose.Types.ObjectId();
    movieId = mongoose.Types.ObjectId();
    rental = new Rental({
      customer: { name: "12345", phone: "12345", _id: customerId },
      movie: { _id: movieId, title: "12345", dailyRentalRate: 2 },
    });
    await rental.save();
  });
  afterEach(async () => {
    server.close();
    await Rental.deleteMany();
  });

  const execute = () => {
    return request(server)
      .post("/api/returns")
      .set("x-auth-token", token)
      .send({ customerId, movieId });
  };

  it("should return 401 if user is not logged in", async () => {
    token = "";
    const res = await execute();
    expect(res.status).toBe(401);
  });
});

// return 401 if client is not logged in
// return 400 if customer id is not provided
// return 400 if movie id is not provided
// return 404 if no rental found for customer and movie
// return 400 if rental is already processed

// return 200 if valid request
// set return date
// calculate rental fee
// increase stock of movie 
// return the rental