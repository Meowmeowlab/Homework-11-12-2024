import express from 'express';
import user from '../js/user/user.js';

let router = express.Router();

router.get('/get', async (req, res) => {
    try {
        let data = await user.getUser();
        console.log(data);
        res.json({ content: data, status: 200 });
        //res.send(data);
    } catch (err) {
        res.json({ content: err, status: 500 });
    }
});

router.post('/create', async (req, res) => {
    try {
        let data = req.body;
        let sqlstatus = await user.createUser(data.content);

        res.json({ content: data, status: 200, sqlstatus: sqlstatus });
    } catch (err) {
        res.json({ content: err, status: 500 });
        console.log(err);
    }
    //console.log(req.body);
    //res.send('Received' + JSON.stringify(req.body));
});

router.put('/update', (req, res) => {
    try {
        let data = req.body;
        let sqlstatus = user.updateUser(data.content);
        res.json({ content: data, status: 200, sqlstatus: sqlstatus });
    } catch (err) {
        res.json({ content: err, status: 500 });
        console.log(err);
    }
});

router.post('/delete', (req, res) => {
    try {
        let data = req.body;
        let sqlstatus = user.deleteUser(data.content);
        res.json({ content: data, status: 200, sqlstatus: sqlstatus });
    } catch (err) {
        res.json({ content: err, status: 500 });
        console.log(err);
    }
});

export default router;
