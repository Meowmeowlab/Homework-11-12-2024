import { openDb } from '../opendb.js';
let db = await openDb();
// console.log(await db.all('SELECT * from Service'));

// console.log('hi');

const inputVerify = data => {
    data.ServiceId = data.ServiceId.trim();
    data.ServiceType = data.ServiceType.trim();
    data.BasePrice = data.BasePrice.trim();
    let empty = [false, false, false];
    if (!data.ServiceId) {
        empty[0] = true;
    }
    if (!data.ServiceType) {
        empty[1] = true;
    }
    if (!data.BasePrice) {
        empty[2] = true;
    }
    return { inputStatus: empty };
};

const getService = async () => {
    let res = await db.all('SELECT * FROM Services;');
    console.log(res);
    return res;
};

const createService = async sdata => {
    let data = JSON.parse(sdata);
    let verify = inputVerify(data);
    if (
        verify.inputStatus[0] === true &&
        (verify.inputStatus[1] === true || verify.inputStatus[2] === true)
    ) {
        return {
            inputStatus: 'Missing input',
            input: verify.inputStatus,
        };
    }
    let sql =
        `INSERT INTO Services(ServiceType,  BasePrice)` +
        `VALUES ('${data.ServiceType}', '${data.BasePrice}')`;

    try {
        let sqlstatus = await db.run(sql);
        return sqlstatus;
    } catch (err) {
        console.log(err);
        return err;
    }
};

const updateService = async sdata => {
    let data = JSON.parse(sdata);
    let verify = inputVerify(data);
    if (
        verify.inputStatus[0] === true ||
        (verify.inputStatus[1] === true && verify.inputStatus[2] === true)
    ) {
        return {
            inputStatus: 'Missing input',
            input: verify.inputStatus,
        };
    }

    let sql = `UPDATE Services SET ServiceType = '${data.ServiceType}', BasePrice = '${data.BasePrice}' WHERE ServiceId = '${data.ServiceId}'`;
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

const deleteService = async sdata => {
    let data = JSON.parse(sdata);
    let verify = inputVerify(data);
    if (verify.inputStatus[0] === true) {
        return {
            inputStatus: 'Missing input',
            input: verify.inputStatus,
        };
    }

    let sql = `DELETE FROM Services WHERE ServiceId = '${data.ServiceId}'`;
    try {
        let sqlstatus = await db.run(sql);
        return sqlstatus;
    } catch (err) {
        console.log(err);
        return err;
    }
};

export default {
    createService,
    getService,
    updateService,
    deleteService,
};
