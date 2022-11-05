const supertest = require("supertest")
const app = require("../index")


describe("User Route", () => {

    it('should update a User', async () => {
        const updatedUser = {
            "username": "client1",
            
            "password": "123"
        };
        const response = await supertest(app)
          .patch('/api/users/6365e157bf03b7569a83516c')
          .send(updatedUser);
        expect(response.status).toBe(200);
        expect(response.body.username).toBe("client1");
      });

    it("DELETE /api/users ", async () => {
        const response = await supertest(app).delete("/api/users?id=6365e157bf03b7569a83516c")
       // expect(response.headers["content-type"]).toBe("application/json")
        expect(response.status).toBe(200)
        expect(response.body.message).toBe("User deleted")

        const response2 = await supertest(app).get("/api/users")
       // expect(response2.headers["content-type"]).toBe("application/json")
        expect(response2.status).toBe(200)
        expect(response2.body.length).toBe(5)
    });

    it("GET /api/users?id works", async () => {
        const response = await supertest(app).get("/api/users?id=6365e157bf03b7569a83516g")
      //  expect(response.headers["content-type"]).toBe("application/json")
        expect(response.status).toBe(200)
        expect(response.body.username).toBe("client3")
    });

    it("POST /reset password works", async () => {
            const resetPwd = {
            "username": "client4",
           "email": "okey@mail.com",
                "password": "123"
        }
        const response = await supertest(app).post("/api/users").send(resetPwd)
       // expect(response.headers["content-type"]).toBe("text/html")
        expect(response.status).toBe(201)
        expect(response.body.username.toBe("client4")
        
    )});

    
    
})