let server;
const { Rental } = require("../../../models/rental");
const mongoose = require("mongoose");
const { expectCt } = require("helmet");

describe("/api/returns", () => {
  let customerId;
  let movieId;
  let rental;

  beforeEach(() => {
    server = require("../../../index");
    customerId = mongoose.Types.ObjectId();
    movieId = mongoose.Types.ObjectId();
    rental = new Rental({
      customer: { name: "12345", phone: "12345", _id: customerId },
      movie: { _id: movieId, title: "12345" },
      dailyRentalRate: 2,
    });
    await rental.save();
  });
  afterEach(async () => {
    server.close();
    await Rental.deleteMany();
  });

  it("should work", () => {
      const res = await Rental.findById(rental._id)
      expectCt(res).not.ToBeNull()
  });
});
