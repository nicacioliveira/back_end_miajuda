var jest = require('jest');
const request = require('supertest');
const mongoose = require('mongoose');

test('GET /user', ()=>{

    return request("http://localhost:8080")
    .get('/api/users')
    .then(response => {
        expect(response.status).toBe(200);
    })
    .catch(fail);
});

test('POST /users', ()=>{
  return request("http://localhost:8080")
  .get('/api/users')
  //.send({name:'João Menezes', email:'joao.menezes@ccc.ufcg.edu.br', password:'aaa', role:'aluno'})
  .then(response => {
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('João Menezes');
    expect(response.body.email).toBe('joao.menezes@ccc.ufcg.edu.br');
    expect(response.body.password).toBe('aaa');
    expect(response.body.role).toBe('aluno');
  })
  .catch(fail)
});

// test('DELETE /users', ()=>{
//   return request("http://localhost:8080")
//   .delete('api/users')
//   .send('5bb7ce1f7b6e7a0ef03e3feb')
//   .then(response => {
//     expect(response.status).toBe(200);
//   })
//   .catch(fail);
// })
//
// test('GET /users/:id/getMyClasses', ()=>{
//   return request("http://localhost:8080")
//   .get('api/users/5baaccb973715e1f0d32f89e/getmyclasses')
//   .then(response => {
//       expect(response.status).toBe(200);
//   })
//   .catch(fail);
// })
