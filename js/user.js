import tableConstructor from './tableConstructor.js';
document.getElementById('addUser').addEventListener('click', async () => {
    const userId = document.getElementById('userId').value;
    const userName = document.getElementById('userName').value;
    const userLocation = document.getElementById('userLocation').value;
    const userDate = document.getElementById('userDate').value;
    const userIdentification =
        document.getElementById('userIdentification').value;

    const data = {
        UserId: userId,
        UserName: userName,
        UserLocation: userLocation,
        UserDate: new Date(userDate).toISOString(),
        UserIdentification: userIdentification,
    };
    axios.post('http://localhost:3000/user/create', {
        content: JSON.stringify(data),
    });
});

document.getElementById('updateUser').addEventListener('click', async () => {
    const userId = document.getElementById('userId').value;
    const userName = document.getElementById('userName').value;
    const userLocation = document.getElementById('userLocation').value;
    const userDate = document.getElementById('userDate').value;
    const userIdentification =
        document.getElementById('userIdentification').value;

    const data = {
        UserId: userId,
        UserName: userName,
        UserLocation: userLocation,
        UserDate: new Date(userDate).toISOString(),
        UserIdentification: userIdentification,
    };
    axios.put('http://localhost:3000/user/update', {
        content: JSON.stringify(data),
    });
});

document.getElementById('deleteUser').addEventListener('click', async () => {
    const userId = document.getElementById('userId').value;
    const data = {
        UserId: userId,
        UserName: '',
        UserLocation: '',
        UserDate: '',
        UserIdentification: '',
    };
    // console.log(data);
    axios.post(`http://localhost:3000/user/delete`, {
        content: JSON.stringify(data),
    });
});
const rebuildData = ldata => {
    console.log('ldata', ldata);
    const mainarr = [];
    for (let i = 0; i < ldata.length; i++) {
        const tmp = JSON.parse(
            JSON.stringify([
                ldata[i].UserId,
                ldata[i].UserName,
                ldata[i].UserNationality,
                ldata[i].UserAge,
                ldata[i].UserIdentification,
            ])
        );
        mainarr.push(tmp);
    }
    return mainarr;
};
document.getElementById('refreshList').addEventListener('click', async () => {
    refresh();
});

const refresh = async () => {
    const res = await axios.get('http://localhost:3000/user/get');
    const listOfServicers = document.getElementsByClassName('listOfServicers');
    let dataContent = res.data.content;
    console.log(res.data.content);
    let tableHeader = ['Mã KH', 'Tên KH', 'Quốc tịch', 'Ngày sinh', 'CCCD'];

    let tableContent = rebuildData(dataContent);
    console.log('tableC', tableContent);

    console.log(listOfServicers);
    listOfServicers[0].innerHTML = '';
    let usrtable = tableConstructor(tableHeader, tableContent);
    listOfServicers[0].append(usrtable);
};

refresh();
