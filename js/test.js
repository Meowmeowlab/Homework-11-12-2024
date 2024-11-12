import { openDb } from '../server/js/opendb.js';
let db = await openDb();
console.log(await db.all('SELECT * from Room'));
