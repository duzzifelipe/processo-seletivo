const expect = require('chai').expect;
const removeAccents = require('remove-accents');
const PeopleService = require('./people_service');

describe('people_service', () => {
    it('should throw an error with no endpoint answer', () => {
        // I don't know how to test it yet
        // but if the 'request' library call
        // returns a error, the promise will be rejected

        // This is a task for the frontend, according to the controller's response
    });

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

    it('should filter starting with a single string value - name', done => {
        // also ignore case (Renato -> ren)
        const name = "Hélio Albano";
        const filterName = removeAccents(name.substring(0, 3).toLocaleLowerCase());
        PeopleService({ name: filterName })
            .then(result => {
                expect(result).not.to.be.empty;
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
    });

    it('should filter with two variables', done => {
        const data = { name: "Renato Menegasso", age: 29 };
        PeopleService(data)
            .then(result => {
                result.every(item => expect(item.name).to.equal(data.name))
                result.every(item => expect(item.age).to.equal(data.age))
                done();
            })
            .catch(error => {
                // just keep a expect if the request fails
                expect(error).to.be.null;
                done();
            })
    });

    it('should filter with two variables and get no results', done => {
        const data = { name: "Renato Menegasso", age: 23 };
        PeopleService(data)
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

    it('should ignore empty filter', done => {
        PeopleService({})
            .then(result => {
                expect(result).not.to.be.empty;
                done();
            })
            .catch(error => {
                // just keep a expect if the request fails
                expect(error).to.be.null;
                done();
            })
    });

    it('should order by age ascending', done => {
        const order = { age: 1 };

        // I will compare a ordered with a raw array and they need to be different
        // Also comparing with the ordered version of the not-ordered
        PeopleService()
            .then(result_1 => {
                PeopleService(null, order)
                    .then(result_2 => {
                        expect(result_1).to.not.eql(result_2);

                        // sort the first array
                        result_1.sort((a, b) => {
                            if (a.age < b.age) {
                                return -1;
                            } else if (a.age > b.age) {
                                return 1;
                            } else {
                                return 0
                            }
                        });

                        expect(result_1).to.eql(result_2)
                        done();
                    })
                    .catch(error => {
                        // just keep a expect if the request fails
                        expect(error).to.be.null;
                        done();
                    })
            })
            .catch(error => {
                // just keep a expect if the request fails
                expect(error).to.be.null;
                done();
            })
    });

    it('should order by age descending', done => {
        const order = { age: -1 };

        // I will compare a ordered with a raw array and they need to be different
        // Also comparing with the ordered version of the not-ordered
        PeopleService()
            .then(result_1 => {
                PeopleService(null, order)
                    .then(result_2 => {
                        expect(result_1).to.not.eql(result_2);

                        // sort the first array
                        result_1.sort((a, b) => {
                            if (a.age < b.age) {
                                return 1;
                            } else if (a.age > b.age) {
                                return -1;
                            } else {
                                return 0
                            }
                        });

                        expect(result_1).to.eql(result_2)
                        done();
                    })
                    .catch(error => {
                        // just keep a expect if the request fails
                        expect(error).to.be.null;
                        done();
                    })
            })
            .catch(error => {
                // just keep a expect if the request fails
                expect(error).to.be.null;
                done();
            })
    });

    it('should order ascending (1) with order different from 1 and -1', done => {
        const order = { age: 'some-random-value' };

        // I will compare a ordered with a raw array and they need to be different
        // Also comparing with the ordered version of the not-ordered
        PeopleService()
            .then(result_1 => {
                PeopleService(null, order)
                    .then(result_2 => {
                        expect(result_1).to.not.eql(result_2);

                        // sort the first array
                        result_1.sort((a, b) => {
                            if (a.age < b.age) {
                                return -1;
                            } else if (a.age > b.age) {
                                return 1;
                            } else {
                                return 0
                            }
                        });

                        expect(result_1).to.eql(result_2)
                        done();
                    })
                    .catch(error => {
                        // just keep a expect if the request fails
                        expect(error).to.be.null;
                        done();
                    })
            })
            .catch(error => {
                // just keep a expect if the request fails
                expect(error).to.be.null;
                done();
            })
    })

    it('should order with two variables', () => {
        // this test wont be executed
        // because considering this order
        // of elements on the object
        // only the last item will be applied
        // and override the first one
        const order = { name: -1, age: 1 };
    });

    it('should ignore empty order', done => {
        // will compare a not-ordered with a call ordered with empty object
        PeopleService()
            .then(result_1 => {
                PeopleService(null, {})
                    .then(result_2 => {
                        expect(result_1).to.eql(result_2)
                        done();
                    })
                    .catch(error => {
                        // just keep a expect if the request fails
                        expect(error).to.be.null;
                        done();
                    })
            })
            .catch(error => {
                // just keep a expect if the request fails
                expect(error).to.be.null;
                done();
            })

    });

    it('should filter and order together', done => {
        // check if a call with order differs from a raw filtered call
        // and after, order the not-ordered and compare bot
        const skills = ["restfull", "aws", "linux"];


        PeopleService({ skills })
            .then(result_1 => {
                PeopleService({ skills }, { age: 1 })
                    .then(result_2 => {
                        expect(result_2).not.to.be.eql(result_1);
                        expect(result_2.every(item => item.skills.some(item_2 => skills.includes(item_2)))).to.be.true;

                        // order the first array
                        result_1.sort((a, b) => {
                            if (a.age < b.age) {
                                return -1;
                            } else if (a.age > b.age) {
                                return 1;
                            } else {
                                return 0
                            }
                        });

                        expect(result_2).to.be.eql(result_1);

                        done();
                    })
                    .catch(error => {
                        // just keep a expect if the request fails
                        expect(error).to.be.null;
                        done();
                    })
            })
            .catch(error => {
                // just keep a expect if the request fails
                expect(error).to.be.null;
                done();
            })
    });
})