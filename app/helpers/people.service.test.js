const expect = require('chai').expect;
const PeopleService = require('./people.service');

describe('people.service', () => {
    it('should return an array', done => {
        PeopleService()
            .then(result => {
                expect(result).to.be.an('array');
                done();
            })
            .catch(error => {
                // just keep a expect if the request fails
                expect(error).to.be.null;
                done();
            })
    });

    it('should have objects inside the array', done => {
        PeopleService()
            .then(result => {
                if (result.length > 0) {
                    expect(result[0]).to.be.an('object');
                }
                done();
            })
            .catch(error => {
                // just keep a expect if the request fails
                expect(error).to.be.null;
                done();
            })
    });

    it('should have exactly these keys under the object', done => {
        PeopleService()
            .then(result => {
                result.every(item => expect(item).to.have.all.keys("name", "age", "avatarUrl", "skills"))
                done();
            })
            .catch(error => {
                // just keep a expect if the request fails
                expect(error).to.be.null;
                done();
            })
    });

    it('should filter with a single value - name');

    it('should filter with an array of values - skills');

    it('should order by age ascending');

    it('should order by age descending');
})