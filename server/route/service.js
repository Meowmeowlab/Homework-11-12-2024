import express from 'express';
import service from '../js/services/service.js';

let router = express.Router();

router.get('/get', async (req, res) => {
    try {
        let data = await service.getService();
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
        let sqlstatus = await service.createService(data.content);

        res.json({ content: data, status: 200, sqlstatus: sqlstatus });
    } catch (err) {
        console.log(err);
    }
    //console.log(req.body);
    //res.send('Received' + JSON.stringify(req.body));
});

router.put('/update', (req, res) => {
    try {
        let data = req.body;
        let sqlstatus = service.updateService(data.content);
        res.json({ content: data, status: 200, sqlstatus: sqlstatus });
    } catch (err) {
        console.log(err);
    }
});

router.post('/delete', (req, res) => {
    try {
        let data = req.body;
        let sqlstatus = service.deleteService(data.content);
        res.json({ content: data, status: 200, sqlstatus: sqlstatus });
    } catch (err) {
        console.log(err);
    }
});

export default router;
