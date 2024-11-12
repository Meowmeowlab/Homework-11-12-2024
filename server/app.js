import express from 'express';
import room from './route/room.js';
import service from './route/service.js';
import user from './route/user.js';
import roomMng from './route/roomMng.js';
import serviceMng from './route/serviceMng.js';
import receipt from './route/receipt.js';
import cors from 'cors';

// let db = await openDb();
// console.log(await db.all('SELECT * from Room'));

// const getRoom = async () => {
//     let mes = await db.all('SELECT * from Room');
//     return mes;
// };

const app = express();
app.use(cors());
app.use(express.json());

// app.get('/', async (req, res) => {
//     // console.log(await getRoom());
//     res.send(await getRoom());
// });
app.use('/room', room);
app.use('/service', service);
app.use('/user', user);
app.use('/roomMng', roomMng);
app.use('/serviceMng', serviceMng);
app.use('/receipt', receipt);

app.listen(3000);

console.log('Server running at http://localhost:3000/');
