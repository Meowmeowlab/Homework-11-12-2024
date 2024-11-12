import { openDb } from './opendb.js';
let db = await openDb();
// console.log(await db.all('SELECT * from User'));

// console.log('hi');

const inputVerify = data => {
    data.ReceiptId = data.ReceiptId.trim();
    data.RoomManagerId = data.RoomManagerId.trim();
    data.ServiceManagerId = data.ServiceManagerId.trim();
    data.UserId = data.UserId.trim();
    data.TotalPrice = data.TotalPrice.trim();
    data.ExportDate = data.ExportDate.trim();
    let empty = [false, false, false, false, false, false];
    if (!data.ReceiptId) {
        empty[0] = true;
    }
    if (!data.RoomManagerId) {
        empty[1] = true;
    }
    if (!data.ServiceManagerId) {
        empty[2] = true;
    }
    if (!data.UserId) {
        empty[3] = true;
    }
    if (!data.TotalPrice) {
        empty[4] = true;
    }
    if (!data.ExportDate) {
        empty[4] = true;
    }

    return { inputStatus: empty };
};

const getReceipt = async () => {
    let res = await db.all('SELECT * FROM Receipt;');
    console.log(res);
    return res;
};

const createReceipt = async sdata => {
    let data = JSON.parse(sdata);
    let verify = inputVerify(data);
    if (
        verify.inputStatus[0] === true &&
        (verify.inputStatus[1] === true ||
            verify.inputStatus[2] === true ||
            verify.inputStatus[3] === true ||
            verify.inputStatus[4] === true ||
            verify.inputStatus[5] === true)
    ) {
        return {
            inputStatus: 'Missing input',
            input: verify.inputStatus,
        };
    }
    let sql =
        `INSERT INTO Receipt(RoomManagerId, ServiceManagerId, UserId, TotalPrice, ExportDate)` +
        `VALUES ('${data.RoomManagerId}', '${data.ServiceManagerId}', '${data.UserId}', '${data.TotalPrice}', '${data.ExportDate}')`;

    try {
        let sqlstatus = await db.run(sql);
        return sqlstatus;
    } catch (err) {
        console.log(err);
        return err;
    }
};

export default {
    getReceipt,
    createReceipt,
};
