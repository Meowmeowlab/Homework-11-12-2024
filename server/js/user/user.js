import { openDb } from '../opendb.js';
let db = await openDb();
// console.log(await db.all('SELECT * from User'));

// console.log('hi');

const inputVerify = data => {
    data.UserId = data.UserId.trim();
    data.UserName = data.UserName.trim();
    data.UserLocation = data.UserLocation.trim();
    data.UserDate = data.UserDate.trim();
    data.UserIdentification = data.UserIdentification.trim();
    let empty = [false, false, false, false, false];
    if (!data.UserId) {
        empty[0] = true;
    }
    if (!data.UserName) {
        empty[1] = true;
    }
    if (!data.UserLocation) {
        empty[2] = true;
    }
    if (!data.UserDate) {
        empty[3] = true;
    }
    if (!data.UserIdentification) {
        empty[4] = true;
    }

    return { inputStatus: empty };
};

const getUser = async () => {
    let res = await db.all('SELECT * FROM User;');
    console.log(res);
    return res;
};

const createUser = async sdata => {
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
        `INSERT INTO User(UserName, UserNationality, UserAge, UserIdentification)` +
        `VALUES ('${data.UserName}', '${data.UserLocation}', '${data.UserDate}', '${data.UserIdentification}')`;

    try {
        let sqlstatus = await db.run(sql);
        return sqlstatus;
    } catch (err) {
        console.log(err);
        return err;
    }
};

const updateUser = async sdata => {
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

    let sql = `UPDATE User SET UserName = '${data.UserName}', UserNationality = '${data.UserLocation}', UserAge = '${data.UserDate}', UserIdentification = '${data.UserIdentification}' WHERE UserId = '${data.UserId}'`;
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

const deleteUser = async sdata => {
    let data = JSON.parse(sdata);
    let verify = inputVerify(data);
    if (verify.inputStatus[0] === true) {
        return {
            inputStatus: 'Missing input',
            input: verify.inputStatus,
        };
    }

    let sql = `DELETE FROM User WHERE UserId = '${data.UserId}'`;
    try {
        let sqlstatus = await db.run(sql);
        return sqlstatus;
    } catch (err) {
        console.log(err);
        return err;
    }
};

export default {
    createUser,
    getUser,
    updateUser,
    deleteUser,
};
