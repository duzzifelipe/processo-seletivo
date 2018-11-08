const expect = require('chai').expect;
const SkillService = require('./skill_service');
const PeopleService = require('./people_service');

describe('skill_service', () => {
    it('should return an ordered array', done => {
        SkillService()
            .then(skills => {
                expect(skills).to.be.an('array');
                expect(skills).to.be.eql(skills.sort())
                done();
            })
            .catch(error => {
                expect(error).to.be.null;
                done();
            })
    });

    it('should be equal a list returned by people service', done => {
        // first query people service
        PeopleService()
            .then(people => {
                // then get the list from skill service
                SkillService()
                    .then(skills => {
                        // organize the list from people service
                        const people_skills = people.map(row => row.skills).reduce((obj, elem) => {
                            elem.forEach(skill => {
                                // only push if it isn't null and doesn't exist
                                if (skill != '' && !obj.includes(skill)) {
                                    obj.push(skill)
                                }
                            })

                            return obj;
                        }, []).sort();

                        // and compare both
                        expect(people_skills).to.be.eql(skills)

                        done();
                    })
                    .catch(error => {
                        expect(error).to.be.null;
                        done();
                    })

            })
            .catch(error => {
                expect(error).to.be.null;
                done();
            })
    })
});