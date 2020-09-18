const supertest = require('supertest');
const server = require('./server.js');
const db = require('../data/connections.js');

describe('server', ()=>{


    describe('environment', ()=>{
        it('should set the EB_ENV variable to "testing"', () =>{
            expect(process.env.NODE_ENV).toBe("testing");
        });
    });

    
    describe('it should return server status 200 and member that was posted', () =>{
        beforeEach(async () => {
            // trucate or empty the hobbits table
            await db("members").truncate();
        });

        it('should do the things above', () =>{
            return supertest(server)
            .post('/api/members')
            .send({username: 'imamomo', game: 'FFIV'})
            .then(res =>{
                expect(res.status).toBe(201)
                expect(res.body.username).toBe("imamomo")
            })
        } )
    })

    describe('get /', () =>{
        it('it should return status code 200 and body "pinged server"', () =>{
            return supertest(server)
            .get('/')
            .then(res =>{
                expect(res.status).toBe(200);
                expect(res.body.message).toBe('pinged server')
            })
        })
    })
    describe('get /api/members', () =>{
        it('should return return 200 status', () =>{
            return supertest(server)
            .get('/api/members')
            .then(res =>{
                expect(res.status).toBe(200)
                expect(res.body.length).toBe(1)
                expect(res.body[0].username).toBe('imamomo')
            })
        })
    })
    describe('get /api/members/:id', () =>{
        const memberId = 1
        it('Should return server 200 status and json specific member', () =>{
            return supertest(server)
            .get(`/api/members/${memberId}`)
            .then(res =>{
                expect(res.status).toBe(200)
                expect(res.body.id).toBe(1)
            })
        })
    })
    describe('delete /api/members/:id', () =>{
        const memberId = 1
        it('Should return server 200 status and json message: successfully deleted', () =>{
            return supertest(server)
            .delete(`/api/members/${memberId}`)
            .then(res =>{
                expect(res.status).toBe(200)
                expect(res.body.message).toBe('successfully deleted')
            })
        })
    })

})