const request = require('supertest');
const { expect } = require('chai');
const app = require('../src/app');
const userModel = require('../src/models/user.model');

// mock getOneByEmail method
userModel.getOneByEmail = async (email) => {
  if (email !== 'johndoe@example.com') return null;
  return {
    id: 1,
    email: 'johndoe@example.com',
    // hash generated with bcrypt-generator.com from clear pass Abcd123*
    password: '$2y$12$c7x54nNd/Pfu0ijfL/z.FONRujMqtJZTEOmasMaK.q.QbgWs6884G',
  };
};

describe('Test signin route', () => {
  it('OK - correct email and password', () => request(app)
    .post('/api/auth/signin')
    .send({ email: 'johndoe@example.com', password: 'Abcd123*' })
    .expect(200)
    .then((res) => {
      expect(res.body).to.be.a('object');
      const { id, email } = res.body;
      expect(id).to.be.a('number');
      expect(email).to.equal('johndoe@example.com');
    }));

  it('NOK - incorrect email', () => request(app)
    .post('/api/auth/signin')
    .send({ email: 'usernotfound@example.com', password: 'DoesntMatter' })
    .expect(401)
    .then((res) => {
      expect(res.body).to.be.a('object');
      const { error } = res.body;
      expect(error).to.equal('Account does not exist');
    }));

  it('NOK - incorrect password', () => request(app)
    .post('/api/auth/signin')
    .send({ email: 'johndoe@example.com', password: 'WRONG' })
    .expect(401)
    .then((res) => {
      expect(res.body).to.be.a('object');
      const { error } = res.body;
      expect(error).to.equal('Invalid password');
    }));
});
