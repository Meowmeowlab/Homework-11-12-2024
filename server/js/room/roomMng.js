import { openDb } from '../opendb.js';
let db = await openDb();
// console.log(await db.all('SELECT * from Room'));

// console.log('hi');

const inputVerify = data => {
    console.log(data);
    data.RoomManagerId = data.RoomManagerId.trim();
    data.RoomId = data.RoomId.trim();
    data.UserId = data.UserId.trim();
    data.BookDate = data.BookDate.trim();
    data.ExpireDate = data.ExpireDate.trim();
    let empty = [false, false, false, false, false];
    if (!data.RoomManagerId) {
        empty[0] = true;
    }
    if (!data.RoomId) {
        empty[1] = true;
    }
    if (!data.UserId) {
        empty[2] = true;
    }
    if (!data.BookDate) {
        empty[3] = true;
    }
    if (!data.ExpireDate) {
        empty[4] = true;
    }
    return { inputStatus: empty };
};

const getMngRoom = async () => {
    let res = await db.all('SELECT * FROM RoomManager;');
    //console.log(res);
    return res;
};

const createMngRoom = async sdata => {
    let data = JSON.parse(sdata);
    let verify = inputVerify(data);
    if (
        verify.inputStatus[0] === true &&
        (verify.inputStatus[1] === true ||
            verify.inputStatus[2] === true ||
            verify.inputStatus[3] === true ||
            verify.inputStatus[4] === true)
    ) {
        return {
            inputStatus: 'Missing input',
            input: verify.inputStatus,
        };
    }
    let sql =
        `INSERT INTO RoomManager(UserId, RoomId, Book, Expire)` +
        `VALUES ('${data.UserId}', '${data.RoomId}', '${data.BookDate}', '${data.ExpireDate}')`;

    try {
        let sqlstatus = await db.run(sql);
        return sqlstatus;
    } catch (err) {
        console.log(err);
        return err;
    }
};

const updateMngRoom = async sdata => {
    let data = JSON.parse(sdata);
    let verify = inputVerify(data);
    if (
        verify.inputStatus[0] === true ||
        (verify.inputStatus[1] === true &&
            verify.inputStatus[2] === true &&
            verify.inputStatus[3] === true &&
            verify.inputStatus[4] === true)
    ) {
        return {
            inputStatus: 'Missing input',
            input: verify.inputStatus,
        };
    }

    let sql = `UPDATE RoomManager SET RoomId = '${data.RoomId}',Book = '${data.BookDate}', Expire = '${data.ExpireDate}', UserId = '${data.UserId}' WHERE RoomManagerId = '${data.RoomManagerId}'`;
    if (verify.inputStatus === false) {
        return verify;
    }

    try {
        let sqlstatus = await db.run(sql);
        return sqlstatus;
    } catch (err) {
        console.log(err);
        return err;
    }
};

const deleteMngRoom = async sdata => {
    let data = JSON.parse(sdata);
    console.log('Call from Delte: ', data);
    let verify = inputVerify(data);
    if (verify.inputStatus[0] === true) {
        return {
            inputStatus: 'Missing input',
            input: verify.inputStatus,
        };
    }

    let sql = `DELETE FROM RoomManager WHERE RoomManagerId = '${data.RoomManagerId}'`;
    try {
        let sqlstatus = await db.run(sql);
        return sqlstatus;
    } catch (err) {
        console.log(err);
        return err;
    }
};

export default {
    getMngRoom,
    createMngRoom,
    updateMngRoom,
    deleteMngRoom,
};
