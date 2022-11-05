const mongoose = require('mongoose')
const app = require('../index');
const supertest = require("supertest")
//const httpServer = require("../../server")


describe('Post Route', () => {

  it('should create a api/posts', async () => {
    const post = {
     "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
     " author": "635eccc34dc4ea83291cf8de",
      "read_count": 0,
      "state": "published",
      "username": "wilson4",
      "tags": ["Anker1", "Soundcore1"],
      "body": "quia et suscipit suscipit recusandae consequuntur expeditaet quia et suscipit\nsuscipit recusandae",
      
    };

    const response = await supertest(app).post('/api/posts').send(post);
      // expect(response.headers["content-type"]).toBe("text/html")
        expect(response.status).toBe(200)
        expect(response.body.title).toBe("sunt aut facere repellat provident occaecati excepturi optio reprehenderit")
        expect(response.body.author).toBe("635eccc34dc4ea83291cf8de")
        expect(response.body.read_count).toBe(0)
        expect(response.body.state).toBe("published")
        expect(response.body.username).toBe("wilson4")
        expect(response.body.tag).toBe(["Anker1", "Soundcore1"])
        expect(response.body.body).toBe("quia et suscipit suscipit recusandae consequuntur expeditaet quia et suscipit\nsuscipit recusandae")
  });
   
  it('PUT /api/posts update an /posts', async () => {
    const updatedPost = {
      "state": "published",
    };
    const response = await supertest(app)
      .patch('/api/posts/635f9d209a39346186b33205')
      .send(updatedPost);
    expect(response.status).toBe(200);
    expect(response.body.order.state).toBe("published");
  });
    
  
  it('DELETE should delete a post', async () => {
    const user = {
      "username": 'client4',
      "password": '123',
    };
    const response = await supertest(app)
      .delete('/api/posts/635f9d209a39346186b33205')
      .send(user);
   // expect(response2.headers["content-type"]).toBe( "text/html")
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Post has been deleted');

    const response2 = await supertest(app).get('/api/orders');
  //  expect(response2.headers["content-type"]).toBe("application/json")
    expect(response2.status).toBe(200);
    expect(response2.body.orders.length).toBe(29);
  });

  it("GET a Post", async () => {
    const response = await supertest(app).get("/api/posts?id=635f9d219a39346186b3320b")
   // expect(response.headers["content-type"]).toBe("application/json")
    expect(response.status).toBe(200)
    expect(response.body.title).toBe("qui est esse")
})
  
 
  it("GET all /api/posts ", async () => {
    const response = await supertest(app).get("/api/posts")
   // expect(response.headers["content-type"]).toBe("application/json")
    expect(response.status).toBe(200)
    expect(response.body.length).toBe(30)
});
  
   

  
});

// afterAll(() => {
//   console.log('it worked');
// });












