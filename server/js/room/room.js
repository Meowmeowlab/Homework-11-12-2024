import { openDb } from '../opendb.js';
let db = await openDb();
// console.log(await db.all('SELECT * from Room'));

// console.log('hi');

const inputVerify = data => {
    data.RoomId = data.RoomId.trim();
    data.RoomType = data.RoomType.trim();
    data.RoomLocation = data.RoomLocation.trim();
    data.BasePrice = data.BasePrice.trim();
    let empty = [false, false, false, false];
    if (!data.RoomId) {
        empty[0] = true;
    }
    if (!data.RoomType) {
        empty[1] = true;
    }
    if (!data.RoomLocation) {
        empty[2] = true;
    }
    if (!data.BasePrice) {
        empty[3] = true;
    }
    return { inputStatus: empty };
};

const getRoom = async () => {
    let res = await db.all('SELECT * FROM Room;');
    console.log(res);
    return res;
};

const createRoom = async sdata => {
    let data = JSON.parse(sdata);
    let verify = inputVerify(data);
    if (
        verify.inputStatus[0] === true &&
        (verify.inputStatus[1] === true ||
            verify.inputStatus[2] === true ||
            verify.inputStatus[3] === true)
    ) {
        return {
            inputStatus: 'Missing input',
            input: verify.inputStatus,
        };
    }
    let sql =
        `INSERT INTO Room(RoomType, RoomLocation, BasePrice)` +
        `VALUES ('${data.RoomType}', '${data.RoomLocation}', '${data.BasePrice}')`;

    try {
        let sqlstatus = await db.run(sql);
        return sqlstatus;
    } catch (err) {
        console.log(err);
        return err;
    }
};

const updateRoom = async sdata => {
    let data = JSON.parse(sdata);
    let verify = inputVerify(data);
    if (
        verify.inputStatus[0] === true ||
        (verify.inputStatus[1] === true &&
            verify.inputStatus[2] === true &&
            verify.inputStatus[3] === true)
    ) {
        return {
            inputStatus: 'Missing input',
            input: verify.inputStatus,
        };
    }

    let sql = `UPDATE Room SET RoomType = '${data.RoomType}', RoomLocation = '${data.RoomLocation}', BasePrice = '${data.BasePrice}' WHERE RoomId = '${data.RoomId}'`;
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

const deleteRoom = async sdata => {
    let data = JSON.parse(sdata);
    let verify = inputVerify(data);
    if (verify.inputStatus[0] === true) {
        return {
            inputStatus: 'Missing input',
            input: verify.inputStatus,
        };
    }

    let sql = `DELETE FROM Room WHERE RoomId = '${data.RoomId}'`;
    try {
        let sqlstatus = await db.run(sql);
        return sqlstatus;
    } catch (err) {
        console.log(err);
        return err;
    }
};

export default {
    createRoom,
    getRoom,
    updateRoom,
    deleteRoom,
};
