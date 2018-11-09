const expect = require('chai').expect;
const mocks = require('node-mocks-http');
const PeopleController = require('./people_controller');
const PeopleService = require('../helpers/people_service');

let req;
let res;

describe('people_controller', () => {
    beforeEach(() => {
        // create mocks for express request and response (async)
        req = mocks.createRequest();
        res = mocks.createResponse({
            eventEmitter: require('events').EventEmitter
        });
    });

    /**
     * I will only test some simple things to verify the argument parser
     * All validations on this test came from the people_service test
     */

    it('should return all data with no url argument', done => {
        // retrieve data from the service
        PeopleService()
            .then(service_data => {
                // create a callback for the method response
                res.on('end', () => {
                    // assert the headers
                    const headers = res._getHeaders();
                    expect(headers['content-type']).to.be.equal('application/json');
                    expect(res._getStatusCode()).to.be.equal(200);

                    // compare data from the rest and the service
                    const body = JSON.parse(res._getData());
                    expect(body.error).to.be.false; // validate if the service is ok

                    const rest_data = body.data;
                    expect(service_data).to.be.eql(rest_data);

                    done();
                });

                // call the controller method
                PeopleController.index(req, res);
            })
            .catch(error => {
                expect(error).to.be.null;
                done();
            })
    });

    it('should filter by a normal value', done => {
        // set the filter
        const filter = { name: 'Flavio Estelato' };

        // create a callback for the method response
        res.on('end', () => {
            // verify if the data matches with the filter
            const body = JSON.parse(res._getData());
            const rest_data = body.data;

            expect(rest_data).not.to.be.empty;
            rest_data.every(item => expect(item.name).to.equal(filter.name))

            done();
        });

        // build the request query
        req.query = { filter };

        // call the controller method
        PeopleController.index(req, res);
    });

    it('should filter by an array', done => {
        const filter = { skills: ['ruby'] };

        // create a callback for the method response
        res.on('end', () => {
            // verify if the data matches with the filter
            const body = JSON.parse(res._getData());
            const rest_data = body.data;

            expect(rest_data).not.to.be.empty;
            expect(rest_data.every(item =>
                item.skills.some(item_2 => filter.skills.includes(item_2))
            )).to.be.true;

            done();
        })

        // build the request query
        req.query = { filter };

        // call the controller method
        PeopleController.index(req, res);
    });

    it('should not filter with non-object key', done => {
        const filter = 'nothing-right';
        // retrieve data from the service
        PeopleService()
            .then(service_data => {
                // create a callback for the method response
                res.on('end', () => {
                    // assert the headers
                    const headers = res._getHeaders();
                    expect(headers['content-type']).to.be.equal('application/json');
                    expect(res._getStatusCode()).to.be.equal(200);

                    // compare data from the rest and the service
                    const body = JSON.parse(res._getData());
                    expect(body.error).to.be.false; // validate if the service is ok

                    // they be equal because the filter won't work
                    const rest_data = body.data;
                    expect(service_data).to.be.eql(rest_data);

                    done();
                });

                // build the request query
                req.query = { filter };

                // call the controller method
                PeopleController.index(req, res);
            })
            .catch(error => {
                expect(error).to.be.null;
                done();
            })
    });

    it('should not filter with a array inside the filter key. ex: filter: []', done => {
        const filter = ['age', 21];
        // retrieve data from the service
        PeopleService()
            .then(service_data => {
                // create a callback for the method response
                res.on('end', () => {
                    // assert the headers
                    const headers = res._getHeaders();
                    expect(headers['content-type']).to.be.equal('application/json');
                    expect(res._getStatusCode()).to.be.equal(200);

                    // compare data from the rest and the service
                    const body = JSON.parse(res._getData());
                    expect(body.error).to.be.false; // validate if the service is ok

                    // they be equal because the filter won't work
                    const rest_data = body.data;
                    expect(service_data).to.be.eql(rest_data);

                    done();
                });

                // build the request query
                req.query = { filter };

                // call the controller method
                PeopleController.index(req, res);
            })
            .catch(error => {
                expect(error).to.be.null;
                done();
            })
    });

    it('should order by descending age', done => {
        // will base this on the already tested response from the service

        PeopleService(null, { age: -1 })
            .then(service_data => {
                // create a callback for the method response
                res.on('end', () => {
                    // assert the headers
                    const headers = res._getHeaders();
                    expect(headers['content-type']).to.be.equal('application/json');
                    expect(res._getStatusCode()).to.be.equal(200);

                    // compare data from the rest and the service
                    const body = JSON.parse(res._getData());
                    expect(body.error).to.be.false; // validate if the service is ok

                    // they be equal because the filter won't work
                    const rest_data = body.data;
                    expect(service_data).to.be.eql(rest_data);

                    done();
                });

                // build the request query
                req.query = { filter: null, order: { age: -1 } };

                // call the controller method
                PeopleController.index(req, res);
            })
            .catch(error => {
                expect(error).to.be.null;
                done();
            })
    });
});
