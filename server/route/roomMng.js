import express from 'express';
import roomMng from '../js/room/roomMng.js';

let router = express.Router();

router.get('/get', async (req, res) => {
    try {
        let data = await roomMng.getMngRoom();
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
        let sqlstatus = await roomMng.createMngRoom(data.content);

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
        let sqlstatus = roomMng.updateMngRoom(data.content);
        res.json({ content: data, status: 200, sqlstatus: sqlstatus });
    } catch (err) {
        res.json({ content: err, status: 500 });
        console.log(err);
    }
});

router.post('/delete', (req, res) => {
    try {
        let data = req.body;
        let sqlstatus = roomMng.deleteMngRoom(data.content);
        res.json({ content: data, status: 200, sqlstatus: sqlstatus });
    } catch (err) {
        res.json({ content: err, status: 500 });
        console.log(err);
    }
});

export default router;
