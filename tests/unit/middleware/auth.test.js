const request = require("supertest");
const { User } = require("../../../models/user");
const auth = require("../../../middleware/auth");
const mongoose = require("mongoose");

let server;

describe("Authorization Middleware", () => {
  it("should populate req.user with payload of valid json web token", () => {
    const user = {
      _id: mongoose.Types.ObjectId().toHexString(),
      isAdmin: true,
    };
    const token = new User(user).generateAuthToken();
    const req = {
      header: jest.fn().mockReturnValue(token),
    };
    const res = {};
    const next = jest.fn();
    auth(req, res, next);
    expect(req.user).toBeDefined();
    expect(req.user).toMatchObject(user);
  });
});
