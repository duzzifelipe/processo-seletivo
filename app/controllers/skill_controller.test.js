const expect = require('chai').expect;
const mocks = require('node-mocks-http');
const SkillController = require('./skill_controller');
const SkillService = require('../helpers/skill_service');

let req;
let res;

describe('skill_controller', () => {
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

    it('should return all data from the service', done => {
        // retrieve data from the service
        SkillService()
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
                SkillController.index(req, res);
            })
            .catch(error => {
                expect(error).to.be.null;
                done();
            })
    });
});
