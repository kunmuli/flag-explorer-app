const request = require("supertest");
const app = require("../index");

describe("Flag Explorer API", () => {
  it("should return a list of countries", async () => {
    const res = await request(app).get("/countries");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should return details for a specific country", async () => {
    const res = await request(app).get("/countries/kenya");
    expect(res.statusCode).toEqual(200);
    expect(res.body.name.toLowerCase()).toBe("kenya");
    expect(res.body).toHaveProperty("name");
    expect(res.body).toHaveProperty("population");
    expect(res.body).toHaveProperty("capital");
    expect(res.body).toHaveProperty("flag");
  });
});
