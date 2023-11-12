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
describe('GET /api/prostate/:caseId/:note/autofill with one consult note', () => {
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
        expect(response.status).toBe(200);
        expect(typeof response.data).toBe('object');
    });

    it('should return an object with the same data as the mock object less the noteName', async () => {
        const response = await request.get(`${baseUrl}/api/prostate/${testCaseId}/consult/autofill`, {
            headers: {
                'Content-Type': 'application/json'
            }});
        expect(response.status).toBe(200);
        const { data } = response;
        const { noteName, ...rest } = consultMock;
        expect(recursiveExpectObjectLooseEquality(rest, data)).toBe(true);
    });

    it('should return only keys that exist on the requested note type, regardless of present data', async () => {
        const response = await request.get(`${baseUrl}/api/prostate/${testCaseId}/eot/autofill`, {
            headers: {
                'Content-Type': 'application/json'
            }});
        expect(response.status).toBe(200);
        const { data } = response;
        for(const key in data) {
            expect(eotShape.hasOwnProperty(key)).toBe(true);
        }
    });

    it('should return a response with status 204 and no data if no meta note exists with a given caseId', async () => {
        const response = await request.get(`${baseUrl}/api/prostate/incorrect_case_id/consult/autofill`, {
            headers: {
                'Content-Type': 'application/json'
            }});
        expect(response.status).toBe(204);
        expect(response.data).toBeFalsy();
    });
});

describe('GET /api/prostate/:caseId/:note/autofill with one eot note', () => {
    beforeAll(async () => {
        await request.post(`${baseUrl}/api/prostate/eot`, eotMock);
    });

    afterAll(async () => {
        await request.delete(`${baseUrl}/api/prostate/${testCaseId}`);
    });

    it('should return an object', async () => {
        const response = await request.get(`${baseUrl}/api/prostate/${testCaseId}/eot/autofill`, {
            headers: {
                'Content-Type': 'application/json'
            }});
        expect(response.status).toBe(200);
        expect(typeof response.data).toBe('object');
    });

    it('should return an object with the same data as the mock object less the noteName', async () => {
        const response = await request.get(`${baseUrl}/api/prostate/${testCaseId}/eot/autofill`, {
            headers: {
                'Content-Type': 'application/json'
            }});
        expect(response.status).toBe(200);
        const { data } = response;
        const { noteName, ...rest } = eotMock;
        expect(recursiveExpectObjectLooseEquality(rest, data)).toBe(true);
    });

    it('should return only keys that exist on the requested note type, regardless of present data', async () => {
        const response = await request.get(`${baseUrl}/api/prostate/${testCaseId}/otv/autofill`, {
            headers: {
                'Content-Type': 'application/json'
            }});
        expect(response.status).toBe(200);
        const { data } = response;
        for(const key in data) {
            expect(otvShape.hasOwnProperty(key)).toBe(true);
        }
    });

    it('should return a response with status 204 and no data if no meta note exists with a given caseId', async () => {
        const response = await request.get(`${baseUrl}/api/prostate/incorrect_case_id/consult/autofill`, {
            headers: {
                'Content-Type': 'application/json'
            }});
        expect(response.status).toBe(204);
        expect(response.data).toBeFalsy();
    });
});

describe('GET /api/prostate/:caseId/:note/autofill with one otv note', () => {
    beforeAll(async () => {
        await request.post(`${baseUrl}/api/prostate/otv`, otvMock);
    });

    afterAll(async () => {
        await request.delete(`${baseUrl}/api/prostate/${testCaseId}`);
    });

    it('should return an object', async () => {
        const response = await request.get(`${baseUrl}/api/prostate/${testCaseId}/otv/autofill`, {
            headers: {
                'Content-Type': 'application/json'
            }});
        expect(response.status).toBe(200);
        expect(typeof response.data).toBe('object');
    });

    it('should return an object with the same data as the mock object less the noteName', async () => {
        const response = await request.get(`${baseUrl}/api/prostate/${testCaseId}/otv/autofill`, {
            headers: {
                'Content-Type': 'application/json'
            }});
        expect(response.status).toBe(200);
        const { data } = response;
        const { noteName, ...rest } = otvMock;
        expect(recursiveExpectObjectLooseEquality(rest, data)).toBe(true);
    });

    it('should return only keys that exist on the requested note type, regardless of present data', async () => {
        const response = await request.get(`${baseUrl}/api/prostate/${testCaseId}/consult/autofill`, {
            headers: {
                'Content-Type': 'application/json'
            }});
        expect(response.status).toBe(200);
        const { data } = response;
        for(const key in data) {
            expect(consultMock.hasOwnProperty(key)).toBe(true);
        }
    });

    it('should return a response with status 204 and no data if no meta note exists with a given caseId', async () => {
        const response = await request.get(`${baseUrl}/api/prostate/incorrect_case_id/consult/autofill`, {
            headers: {
                'Content-Type': 'application/json'
            }});
        expect(response.status).toBe(204);
        expect(response.data).toBeFalsy();
    });
});

describe('GET /api/prostate/:caseId/:note/autofill with random note', () => {
        const mockArr = [['consult', consultMock], ['eot', eotMock], ['otv', otvMock]];
        const randomNoteType = Math.random() > 0.66 ? mockArr[0] : Math.random() > 0.33 ? mockArr[1] : mockArr[2];
    beforeAll(async () => {
        await request.post(`${baseUrl}/api/prostate/${randomNoteType[0]}`, randomNoteType[1]);
    });

    afterAll(async () => {
        await request.delete(`${baseUrl}/api/prostate/${testCaseId}`);
    });

    it('should return some note data', async () => {
        const response = await request.get(`${baseUrl}/api/prostate/${testCaseId}/consult/autofill`, {
            headers: {
                'Content-Type': 'application/json'
            }});
        expect(response.status).toBeGreaterThanOrEqual(200);
        expect(response.status).toBeLessThanOrEqual(204);
        // expect(typeof response.data).toBe('object');
    });
})