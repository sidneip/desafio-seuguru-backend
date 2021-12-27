import request from "supertest";
import { Express } from "express-serve-static-core";
import { App } from "../app";

let server: Express;

describe("should home", () => {
  it("index should return company name", () => {
    request(App)
      .get("/")
      .expect(200)
      .end((err, res) => {
        expect(res.body.message).toBe("Seuguru");
      });
  });
});
