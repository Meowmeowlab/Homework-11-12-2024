import express from 'express';
import serviceMng from '../js/services/serviceMng.js';

let router = express.Router();

router.get('/get', async (req, res) => {
    try {
        let data = await serviceMng.getMngRoom();
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
        let sqlstatus = await serviceMng.createMngRoom(data.content);

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
        let sqlstatus = serviceMng.updateMngRoom(data.content);
        res.json({ content: data, status: 200, sqlstatus: sqlstatus });
    } catch (err) {
        res.json({ content: err, status: 500 });
        console.log(err);
    }
});

router.post('/delete', (req, res) => {
    try {
        let data = req.body;
        let sqlstatus = serviceMng.deleteMngRoom(data.content);
        res.json({ content: data, status: 200, sqlstatus: sqlstatus });
    } catch (err) {
        res.json({ content: err, status: 500 });
        console.log(err);
    }
});

export default router;
