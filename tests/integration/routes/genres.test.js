let server;

const request = require("supertest");
const { Genre } = require("../../../models/genre");
const { User } = require("../../../models/user");
const mongoose = require("mongoose");
// const admin = require("../../../middleware/admin");

describe("/api/genres", () => {
  //opening and closing server
  beforeEach(() => {
    server = require("../../../index");
  });
  afterEach(async () => {
    server.close();
    await Genre.deleteMany();
  });

  describe("GET /", () => {
    it("should get all genres", async () => {
      await Genre.collection.insertMany([
        { name: "genre1" },
        { name: "genre2" },
      ]);
      const res = await request(server).get("/api/genres");
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some((g) => g.name === "genre1")).toBeTruthy();
      expect(res.body.some((g) => g.name === "genre2")).toBeTruthy();
    });
  });

  describe("GET /:id", () => {
    it("should return a genre if valid id is passed", async () => {
      const genre = new Genre({
        name: "genre",
      });
      await genre.save();
      const res = await request(server).get(`/api/genres/${genre._id}`);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("name", genre.name);
    });

    it("should return an error message if the id is invalid", async () => {
      const res = await request(server).get(`/api/genres/1`);
      expect(res.status).toBe(404);
    });

    it("should return an error message if no genre matches the id given", async () => {
      const res = await request(server).get(
        `/api/genres/${mongoose.Types.ObjectId()}`
      );
      expect(res.status).toBe(404);
    });
  });

  describe("POST /", () => {
    //
    let token;
    let name;

    const execute = async () => {
      return await request(server)
        .post("/api/genres")
        .set("x-auth-token", token)
        .send({ name: name });
    };

    beforeEach(() => {
      token = new User().generateAuthToken();
      name = "genre1";
    });

    it("should return 401 if client is not logged in", async () => {
      token = "";

      const res = await execute();

      expect(res.status).toBe(401);
    });

    it("should return 400 if genre is less than 3 characters", async () => {
      name = "g";
      const res = await execute();

      expect(res.status).toBe(400);
    });

    it("should return 400 if genre is greater than 20 characters", async () => {
      name = new Array(22).join("t");
      const res = await execute();

      expect(res.status).toBe(400);
    });

    it("should save the genre if it is valid", async () => {
      await execute();

      const genre = await Genre.find({ name: "genre1" });
      expect(genre).not.toBeNull();
    });

    it("should send the genre in the body of the response", async () => {
      const res = await execute();

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("name", "genre1");
    });
  });

  describe("PUT /:id", () => {
    let token;
    let name;
    let genreId;

    const execute = () => {
      return request(server)
        .put("/api/genres/" + genreId)
        .set("x-auth-token", token)
        .send({ name: name });
    };

    beforeEach(async () => {
      token = new User().generateAuthToken();
      const genre = new Genre({ name: "genre1" });
      await genre.save();
      name = "genrePut";
      genreId = genre._id;
    });

    it("should return 401 if client is not logged in", async () => {
      token = "";

      const res = await execute();
      expect(res.status).toBe(401);
    });

    it("should return 400 if genre name is less than 3 characters", async () => {
      name = "g";
      const res = await execute();
      expect(res.status).toBe(400);
    });

    it("should return an error message if the id is invalid", async () => {
      genreId = "1";
      const res = await execute();
      expect(res.status).toBe(404);
    });

    it("should return an error message if no genre matches the id given", async () => {
      genreId = mongoose.Types.ObjectId();
      const res = await execute();
      expect(res.status).toBe(404);
    });

    it("returns the genre in the body of the response", async () => {
      const res = await execute();
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("name", "genrePut");
    });
  });

  describe("DELETE /:id", () => {
    let token;
    let genreId;
    let user;
    let genre;

    const execute = async () => {
      return await request(server)
        .delete("/api/genres/" + genreId)
        .set("x-auth-token", token);
    };

    beforeEach(async () => {
      user = { isAdmin: true };
      token = new User(user).generateAuthToken();
      genre = new Genre({ name: "genre" });
      await genre.save();
      genreId = genre._id;
    });

    it("should return 401 if client is not logged in", async () => {
      token = "";

      const res = await execute();
      expect(res.status).toBe(401);
    });

    it("should return 403 if client is not an admin", async () => {
      user = { isAdmin: false };
      token = new User(user).generateAuthToken();
      const res = await execute();
      expect(res.status).toBe(403);
    });

    it("should return an error message if the id is invalid", async () => {
      genreId = "1";
      const res = await execute();
      expect(res.status).toBe(404);
    });

    it("should return an error message if no genre matches the id given", async () => {
      genreId = mongoose.Types.ObjectId();
      const res = await execute();
      expect(res.status).toBe(404);
    });

    it("should return all genres after deleting the genre", async () => {
      await Genre.collection.insertMany([
        { name: "genre1" },
        { name: "genre2" },
      ]);
      const res = await execute();
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some((g) => g.name === "genre1")).toBeTruthy();
      expect(res.body.some((g) => g.name === "genre2")).toBeTruthy();
    });
  });
});
