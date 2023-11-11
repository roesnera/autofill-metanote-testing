const request = require('axios');
const baseUrl = 'http://localhost:3000';
const testCaseId = '5f7b1b9b1b4a9c0e0c7e5d1f';
const { consultMock, otvMock, eotMock } = require('./helpers/testObjects');
const { recursiveExpectObjectLooseEquality } = require('./helpers/customExpectFunctions');
const { consultShape, eotShape, otvShape } = require('./helpers/testShapes');

describe('GET /api/prostate/', () => {
    it('should return a 200 status code', (done) => {
        request.get(`${baseUrl}/api/prostate/`)
            .then((response) => {
                expect(response.status).toBe(200);
                done();
            });
    });
    // should return an array of objects
});
describe('GET /api/prostate/:caseId/:note/autofill', () => {
    beforeAll(async () => {
        await request.post(`${baseUrl}/api/prostate/consult`, consultMock);
    });

    afterAll(async () => {
        await request.delete(`${baseUrl}/api/prostate/${testCaseId}`);
    });

    it('should return an object', async () => {
        const response = await request.get(`${baseUrl}/api/prostate/${testCaseId}/consult/autofill`, {
            headers: {
                'Content-Type': 'application/json'
            }});
        expect(typeof response.data).toBe('object');
    });

    it('should return an object with the same data as the mock object less the noteName', async () => {
        const response = await request.get(`${baseUrl}/api/prostate/${testCaseId}/consult/autofill`, {
            headers: {
                'Content-Type': 'application/json'
            }});
        const { data } = response;
        const { noteName, ...rest } = consultMock;
        recursiveExpectObjectLooseEquality(rest, data);
    });

    it('should return only keys that exist on the requested note type', async () => {
        const response = await request.get(`${baseUrl}/api/prostate/${testCaseId}/eot/autofill`, {
            headers: {
                'Content-Type': 'application/json'
            }});
        const { data } = response;
        for(const key in data) {
            expect(eotShape.hasOwnProperty(key)).toBe(true);
        }
    });

    it('should return an with status 204 and no data if no meta note exists with a given caseId', async () => {
        const response = await request.get(`${baseUrl}/api/prostate/incorrect_case_id/consult/autofill`, {
            headers: {
                'Content-Type': 'application/json'
            }});
        console.log(response.status)
        expect(response.status).toBe(204);
        expect(response.data).toBeFalsy();
    });
});
