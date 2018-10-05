var jest = require('jest');
const request = require('supertest');

test('GET /user', ()=>{
    
    return request("http://localhost:8080")
    .get('/api/users')
    .then(response => {
        expect(response.status).toBe(200);
    })
    .catch(fail);
});