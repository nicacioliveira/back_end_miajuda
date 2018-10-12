var jest = require('jest');
const request = require('supertest');
const mongoose = require('mongoose');

//test aux 
var address = "http://localhost:8080";
var jwtAuthToken;
var classCode;
var jwtAlunoToken;

var testName  = "Massoni";
var testMail = "massoni@gmail.com";
var testMailAluno = "massonifilho@gmail.com";
var testNameAluno  = "Massoni filho";
var testPassword = "123123";
var teacherId;
var userId;
var studentId;
var classId;

const profRole = "professor";
const monRole = "monitor";
const stuRole = "aluno";


beforeAll(function (done) {   
  mongoose.connect('mongodb://localhost/miajuda', function(){
      mongoose.connection.db.dropDatabase(function(){
          done();
      })    
  })
});

test('POST /user', ()=>{
  return request(address)
  .post('/api/users')
  .send({
    name:testName,
    email:testMail,
    password:testPassword,
    role:profRole
  })
  .then(response=>{
      expect(response.status).toBe(200);
      expect(response.body._id).toBeDefined();
      userId = response.body._id;
      expect(response.body.name).toBe(testName);
      expect(response.body.email).toBe(testMail);
      expect(response.body.password).toBeDefined();
  })
  .catch(fail);
});

test('POST /users/login', ()=>{
  return request(address)
  .post('/api/users/login')
  .send({
    name:testName,
    email:testMail,
    password:testPassword,
    role:profRole
  })
  .then(response=>{
      expect(response.status).toBe(200);
      expect(response.body.user.name).toBe(testName);
      expect(response.body.user.email).toBe(testMail);
      expect(response.body.user.role).toBe(profRole);
      expect(response.body.jwt).toBeDefined();
      jwtAuthToken = response.body.jwt;
  })
  .catch(fail);
});

test('GET /users', ()=>{
  return request(address)
  .get('/api/users')
  .then(response => {
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
  })
  .catch(fail);
});

test('PUT /users', ()=>{
  return request(address)
  .put('/api/users')
  .set('Authorization',jwtAuthToken)
  .send({
    name: "Tiago " + testName,
  })
  .then(response => {
      expect(response.status).toBe(200);
  })
  .catch(fail);
});

test('POST /classes', ()=>{
  return request(address)
  .post('/api/classes')
  .set('Authorization',jwtAuthToken)
  .send({
    name:"Lógica",
    students: [],
    monitors: []
  })
  .then(response=>{
    expect(response.status).toBe(200);
    expect(response.body.class.name).toBe("Lógica");
    expect(response.body.class.teacherId).toBeDefined();
    teacherId = response.body.class.teacherId;
    expect(response.body.class.code).toBeDefined();
    classCode = response.body.class.code;
  })
  .catch(fail);
});

test('GET /users/classes', ()=>{
  return request(address)
  .get('/api/users/classes')
  .set('Authorization',jwtAuthToken)
  .then(response => {
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      classId = response.body[0]._id;
  })
  .catch(fail);
});

test('PUT /classes', ()=>{
  return request(address)
  .put('/api/classes')
  .set('Authorization',jwtAuthToken)
  .send({
    _id:classId,
    name: "Lógica Matemática",
  })
  .then(response => {
      expect(response.status).toBe(200);
  })
  .catch(fail);
});

test('POST /users', ()=>{
  return request(address)
  .post('/api/users')
  .send({
    name:testNameAluno,
    email:testMailAluno,
    password:testPassword,
    role:stuRole
  })
  .then(response=>{
      expect(response.status).toBe(200);
      expect(response.body.name).toBe(testNameAluno);
      expect(response.body._id).toBeDefined();
      studentId = response.body._id;
      expect(response.body.email).toBe(testMailAluno);
      expect(response.body.role).toBe(stuRole);
      expect(response.body.password).toBeDefined();
  })
  .catch(fail);
});

test('POST /users/login', ()=>{
  return request(address)
  .post('/api/users/login')
  .send({
    name:testNameAluno,
    email:testMailAluno,
    password:testPassword,
    role:stuRole
  })
  .then(response=>{
      expect(response.status).toBe(200);
      expect(response.body.user.name).toBe(testNameAluno);
      expect(response.body.user.email).toBe(testMailAluno);
      expect(response.body.user.role).toBe(stuRole);
      expect(response.body.jwt).toBeDefined();
      jwtAlunoToken = response.body.jwt;
  })
  .catch(fail);
});

test('POST /joinAClass', ()=>{
  return request(address)
  .post('/api/users/joinAClass')
  .set('Authorization',jwtAlunoToken)
  .send({
    code:classCode
  })
  .then(response=>{
    expect(response.status).toBe(200);
  })
  .catch(fail);
});


// test('DELETE /classes/leave/aluno', ()=>{
//   return request(address)
//   .delete('/api/classes/student/' + classId)
//   .set('Authorization',jwtAlunoToken)
//   .then(response=>{
//       expect(response.status).toBe(200);
//   })
//   .catch(fail);
// });

test('DELETE /users/professor', ()=>{
  return request(address)
  .delete('/api/classes/deleteClass?id=' + classId)
  .set('Authorization',jwtAuthToken)
  .then(response=>{
      expect(response.status).toBe(200);
  })
  .catch(fail);
});

test('DELETE /users/professor', ()=>{
  return request(address)
  .delete('/api/users/' + teacherId)
  .then(response=>{
      expect(response.status).toBe(200);
  })
  .catch(fail);
});

test('DELETE /users/aluno', ()=>{
  return request(address)
  .delete('/api/users/' + studentId)
  .then(response=>{
      expect(response.status).toBe(200);
  })
  .catch(fail);
});