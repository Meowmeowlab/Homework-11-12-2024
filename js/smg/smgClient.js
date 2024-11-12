import tableConstructor from '../tableConstructor.js';
document.getElementById('addMng').addEventListener('click', async () => {
    const serviceMngId = document.getElementById('serviceMngId').value;
    const userId = document.getElementById('userId').value;
    const roomId = document.getElementById('roomId').value;
    const serviceId = document.getElementById('serviceId').value;
    const amount = document.getElementById('orderAmount').value;

    const data = {
        ServiceManagerId: serviceMngId,
        UserId: userId,
        RoomId: roomId,
        ServiceId: serviceId,
        Amount: amount,
    };
    axios.post('http://localhost:3000/serviceMng/create', {
        content: JSON.stringify(data),
    });
});

document.getElementById('updateMng').addEventListener('click', async () => {
    const serviceMngId = document.getElementById('serviceMngId').value;
    const userId = document.getElementById('userId').value;
    const roomId = document.getElementById('roomId').value;
    const serviceId = document.getElementById('serviceId').value;
    const amount = document.getElementById('orderAmount').value;

    const data = {
        ServiceManagerId: serviceMngId,
        UserId: userId,
        RoomId: roomId,
        ServiceId: serviceId,
        Amount: amount,
    };
    axios.put('http://localhost:3000/serviceMng/update', {
        content: JSON.stringify(data),
    });
});

document.getElementById('deleteMng').addEventListener('click', async () => {
    const serviceMngId = document.getElementById('serviceMngId').value;

    const data = {
        ServiceManagerId: serviceMngId,
        UserId: '',
        RoomId: '',
        ServiceId: '',
        Amount: '',
    };
    // console.log(data);
    axios.post(`http://localhost:3000/serviceMng/delete`, {
        content: JSON.stringify(data),
    });
});

const rebuildData = ldata => {
    console.log('ldata', ldata);
    const mainarr = [];
    for (let i = 0; i < ldata.length; i++) {
        const tmp = JSON.parse(
            JSON.stringify([
                ldata[i].ServiceManagerId,
                ldata[i].UserId,
                ldata[i].RoomId,
                ldata[i].ServiceId,
                ldata[i].Amount,
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
    const data = await axios.get('http://localhost:3000/serviceMng/get');
    const listOfServicers = document.getElementsByClassName('listOfServicers');
    let dataContent = data.data.content;
    console.log(data.data.content);
    let tableHeader = [
        'ServiceManagerId',
        'UserId',
        'RoomId',
        'ServiceId',
        'Amount',
    ];
    let tableContent = rebuildData(dataContent);
    console.log('tableC', tableContent);
    console.log(listOfServicers);
    listOfServicers[0].innerHTML = '';
    let servicetable = tableConstructor(tableHeader, tableContent);
    listOfServicers[0].append(servicetable);
};

refresh();
