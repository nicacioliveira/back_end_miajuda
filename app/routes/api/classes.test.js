var jest = require('jest');
const request = require('supertest');

test('GET /classes', ()=>{
    
    return request("http://localhost:8080")
    .get('/api/classes')
    .then(response => {
        expect(response.status).toBe(200);
    })
    .catch(fail);
});