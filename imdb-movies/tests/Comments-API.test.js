const fetch = require("node-fetch");
const data = {
    comment: 'Testing purpose comment',
    user_id: "5ffefa3357a2202bae5827b7",
    movie_id: "5ffec58cbd7167715f8ad135",
};

describe('Comment CRUD TEST', () => {
    let id = null;
    it('Should get the list of comments', async () => {
        const r = await fetch('http://localhost:3000/api/comments', {method: 'GET'});
        expect(r.status).toBe(200);
        const rData = await r.json();
        expect(rData.data).toBeDefined();
    });
    it('Should create a comment', async () => {
        const r = await fetch('http://localhost:3000/api/comments', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        expect(r.status).toBe(201);
        let rData = await r.json();
        expect(rData.data).toBeDefined()
        id = rData.data._id;
    });
    it('Should get the previous comment', async() => {
        const show = await fetch(`http://localhost:3000/api/comments/${id}`, {
            method: 'GET'
        });
        expect(show.status).toBe(200);
        let showData = await show.json();
        expect(showData.data).toBeDefined();
    });
    it('Should edit this comment', async() => {
        const put = await fetch(`http://localhost:3000/api/comments/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                comment: 'new Comment',
                movie_id: '5ffec58cbd7167715f8ad135',
                user_id: '5ffefa3357a2202bae5827b7'
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        expect(put.status).toBe(200);
        let putData = await put.json();
        expect(putData.data).toBeDefined();
    });
    it('Should delete this comment', async () => {
        const del = await fetch(`http://localhost:3000/api/comments/${id}`, {
            method: 'Delete',
        });
        expect(del.status).toBe(204);
    })
});
