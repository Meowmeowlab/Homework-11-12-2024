import express from 'express';
import receipt from '../js/receipt.js';

let router = express.Router();

router.get('/get', async (req, res) => {
    try {
        let data = await receipt.getReceipt();
        console.log(data);
        res.status(200).json({ content: data, status: 200 });
        //res.send(data);
    } catch (err) {
        res.status(500).json({ content: err, status: 500 });
    }
});

router.post('/create', async (req, res) => {
    try {
        let data = req.body;
        let sqlstatus = await receipt.createReceipt(data.content);
        res.status(200).json({
            content: data,
            status: 200,
            sqlstatus: sqlstatus,
        });
    } catch (err) {
        res.status(500).json({ content: err, status: 500 });
        console.log(err);
    }
    //console.log(req.body);
    //res.send('Received' + JSON.stringify(req.body));
});

export default router;
