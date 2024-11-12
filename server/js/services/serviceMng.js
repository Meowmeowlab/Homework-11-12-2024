import { openDb } from '../opendb.js';
let db = await openDb();
// console.log(await db.all('SELECT * from Room'));

// console.log('hi');

const inputVerify = data => {
    data.ServiceManagerId = data.ServiceManagerId.trim();
    data.UserId = data.UserId.trim();
    data.RoomId = data.RoomId.trim();
    data.ServiceId = data.ServiceId.trim();
    data.Amount = data.Amount.trim();
    let empty = [false, false, false, false, false];
    if (!data.ServiceManagerId) {
        empty[0] = true;
    }
    if (!data.UserId) {
        empty[1] = true;
    }
    if (!data.RoomId) {
        empty[2] = true;
    }
    if (!data.ServiceId) {
        empty[3] = true;
    }
    if (!data.Amount) {
        empty[4] = true;
    }
    return { inputStatus: empty };
};

const getMngRoom = async () => {
    let res = await db.all('SELECT * FROM ServiceManager;');
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
        `INSERT INTO ServiceManager(RoomId, ServiceId, UserId, Amount)` +
        `VALUES ('${data.RoomId}', '${data.ServiceId}', '${data.UserId}', '${data.Amount}')`;

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

    let sql = `UPDATE ServiceManager SET RoomId = '${data.RoomId}', ServiceId = '${data.ServiceId}', UserId = '${data.UserId}', Amount = '${data.Amount}' WHERE ServiceManagerId = '${data.ServiceManagerId}'`;
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

    let sql = `DELETE FROM ServiceManager WHERE ServiceManagerId = '${data.ServiceManagerId}'`;
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
