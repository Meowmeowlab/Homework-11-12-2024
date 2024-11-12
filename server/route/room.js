import express from 'express';
import room from '../js/room/room.js';

let router = express.Router();

router.get('/get', async (req, res) => {
    try {
        let data = await room.getRoom();
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
        let sqlstatus = await room.createRoom(data.content);

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
        let sqlstatus = room.updateRoom(data.content);
        res.json({ content: data, status: 200, sqlstatus: sqlstatus });
    } catch (err) {
        res.json({ content: err, status: 500 });
        console.log(err);
    }
});

router.post('/delete', (req, res) => {
    try {
        let data = req.body;
        let sqlstatus = room.deleteRoom(data.content);
        res.json({ content: data, status: 200, sqlstatus: sqlstatus });
    } catch (err) {
        res.json({ content: err, status: 500 });
        console.log(err);
    }
});

export default router;
