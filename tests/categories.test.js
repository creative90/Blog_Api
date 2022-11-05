const supertest = require("supertest")
const app = require("../index")


describe("Category Route", () => {

    it("POST /api/categories works", async () => {
        const category = {
        
              "name":"Article"
        }
        const response = await supertest(app).post("/api/categories").send(category)
       // expect(response.headers["content-type"]).toBe("text/html")
        expect(response.status).toBe(201)
        expect(response.body.name).toBe("Article")
        
    })

    
    
    
    it("GET /api/categories works", async () => {
        const response = await supertest(app).get("/api/categories")
      //  expect(response.headers["content-type"]).toBe("application/json")
        expect(response.status).toBe(200)
        expect(response.body.length).toBe(3)
    })
});