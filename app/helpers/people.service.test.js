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

    it('should filter with a single value - name', done => {
        const name = "Renato Menegasso";
        PeopleService({ name })
            .then(result => {
                result.every(item => expect(item.name).to.equal(name))
                done();
            })
            .catch(error => {
                // just keep a expect if the request fails
                expect(error).to.be.null;
                done();
            })
    });

    it('should filter with an array of values - skills', done => {
        const skills = ["restfull", "aws", "linux"];

        PeopleService({ skills })
            .then(result => {
                expect(result.every(item => item.skills.some(item_2 => skills.includes(item_2)))).to.be.true;
                done();
            })
            .catch(error => {
                // just keep a expect if the request fails
                expect(error).to.be.null;
                done();
            })
    });

    it("should return empty for a filter that doesn't exist", done => {
        const pets = ["dog", "cat"];

        PeopleService({ pets })
            .then(result => {
                expect(result).to.be.empty;
                done();
            })
            .catch(error => {
                // just keep a expect if the request fails
                expect(error).to.be.null;
                done();
            })
    });

    it('should return empty for an age filter with an array', done => {
        const age = [20, 21, 22];

        PeopleService({ age })
            .then(result => {
                expect(result).to.be.empty;
                done();
            })
            .catch(error => {
                // just keep a expect if the request fails
                expect(error).to.be.null;
                done();
            })
    });

    it('should return empty for a skill filter with non-array', done => {
        const skills = "restfull";

        PeopleService({ skills })
            .then(result => {
                expect(result).to.be.empty;
                done();
            })
            .catch(error => {
                // just keep a expect if the request fails
                expect(error).to.be.null;
                done();
            })
    })

    it('should order by age ascending');

    it('should order by age descending');
})