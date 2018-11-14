const nock = require('nock');
const url = require('url');
const { ENDPOINT } = require('./helpers/_config');
const { BODY_DATA } = require('./helpers/people_service.mock');

const endpoint_url = url.parse(ENDPOINT);

// create an http mock for requests to github
nock(`${endpoint_url.protocol}//${endpoint_url.hostname}`)
    .persist()
    .get(endpoint_url.path)
    .reply(201, BODY_DATA);