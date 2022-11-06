const supertest = require("supertest")
const app = require("../index")




describe('Auth Route', () => {

    it('should create a /signup', async () => {
      const user = {
        "firstName": "miriam",
        "lastName": "user5",
        "username": "clent5",
       " email": "miriam@gmail.com",
        "password": "123",
      };
  
      const response = await supertest(app).post('/signup').send(user);
       //  expect(response.headers["content-type"]).toBe("application/json")
          expect(response.status).toBe(200)
          expect(response.body.firstName).toBe("miriam")
          expect(response.body.lastName).toBe("user5")
          expect(response.body.username).toBe("client5")
          expect(response.body.email).toBe("miriam@gmail.com")
          expect(response.body.password).toBe("123")
          
    });
     
    it("POST /login password works", async () => {
        const resetPwd = {
        
          " email": "okey@mail.com",
           " password": "123"
    }
    const response = await supertest(app).post("/login").send(resetPwd)
   // expect(response.headers["content-type"]).toBe("text/html")
    expect(response.status).toBe(201)
    expect(response.body.email.toBe("okey@gmail.com")
    
)});



})