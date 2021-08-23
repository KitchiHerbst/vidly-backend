let server;
const { Rental } = require("../../../models/rental");
const { User } = require("../../../models/user");
const mongoose = require("mongoose");
const request = require("supertest");
const moment = require("moment");

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
    await Rental.deleteMany();
    await server.close();
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

  it("should return 400 if customer id is not provided", async () => {
    customerId = "";
    const res = await execute();
    expect(res.status).toBe(400);
  });

  it("should return 400 if movie id is not provided", async () => {
    movieId = "";
    const res = await execute();
    expect(res.status).toBe(400);
  });

  it("should return 404 if no rental is found with given ids", async () => {
    await Rental.deleteMany();
    const res = await execute();
    expect(res.status).toBe(404);
  });

  it("should return 400 if rental already has a return date", async () => {
    rental.dateReturned = Date.now();
    await rental.save();
    const res = await execute();
    expect(res.status).toBe(400);
  });

  it("should return 200 if everything is valid", async () => {
    const res = await execute();
    expect(res.status).toBe(200);
    expect(res.body.dateReturned).toBeTruthy();
  });

  it("should set the date returned property of the rental", async () => {
    const res = await execute();
    const rentalInDb = await Rental.findById(rental._id);
    const dif = new Date() - rentalInDb.dateReturned;
    expect(dif).toBeLessThan(10 * 1000);
  });

  it("should set the rental fee", async () => {
    rental.dateOut = moment().add(-7, "days").toDate();
    await rental.save();
    const res = await execute();
    const rentalInDb = await Rental.findById(rental._id);
    expect(rentalInDb.rentalFee).toBe(14);
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
