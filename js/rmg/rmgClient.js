import tableConstructor from '../tableConstructor.js';
document.getElementById('addMng').addEventListener('click', async () => {
    const roomMngId = document.getElementById('roomMngId').value;
    const userId = document.getElementById('userId').value;
    const roomId = document.getElementById('roomId').value;
    const roomMngBook = document.getElementById('roomMngBook').value;
    const roomMngDate = document.getElementById('roomMngDate').value;

    const data = {
        RoomManagerId: roomMngId,
        UserId: userId,
        RoomId: roomId,
        BookDate: new Date(roomMngBook).toISOString(),
        ExpireDate: new Date(roomMngDate).toISOString(),
    };
    axios.post('http://localhost:3000/receipt/create', {
        content: JSON.stringify(data),
    });
});

document.getElementById('updateMng').addEventListener('click', async () => {
    const roomMngId = document.getElementById('roomMngId').value;
    const userId = document.getElementById('userId').value;
    const roomId = document.getElementById('roomId').value;
    const roomMngBook = document.getElementById('roomMngBook').value;
    const roomMngDate = document.getElementById('roomMngDate').value;

    const data = {
        RoomManagerId: roomMngId,
        UserId: userId,
        RoomId: roomId,
        BookDate: new Date(roomMngBook).toISOString(),
        ExpireDate: new Date(roomMngDate).toISOString(),
    };
    axios.put('http://localhost:3000/receipt/update', {
        content: JSON.stringify(data),
    });
});

document.getElementById('deleteMng').addEventListener('click', async () => {
    const roomMngId = document.getElementById('roomMngId').value;

    const data = {
        RoomManagerId: roomMngId,
        UserId: '',
        RoomId: '',
        BookDate: '',
        ExpireDate: '',
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
                ldata[i].RoomManagerId,
                ldata[i].UserId,
                ldata[i].RoomId,
                new Intl.DateTimeFormat('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                }).format(new Date(ldata[i].Book)),
                new Intl.DateTimeFormat('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                }).format(new Date(ldata[i].Expire)),
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
    const data = await axios.get('http://localhost:3000/roomMng/get');
    console.log(data);
    const listOfServicers = document.getElementsByClassName('listOfServicers');
    let dataContent = data.data.content;
    console.log(data.data.content);
    let tableHeader = [
        'RoomManagerId',
        'UserId',
        'RoomId',
        'BookDate',
        'ExpireDate',
    ];
    let tableContent = rebuildData(dataContent);
    console.log('tableC', tableContent);
    console.log(listOfServicers);
    listOfServicers[0].innerHTML = '';
    let servicetable = tableConstructor(tableHeader, tableContent);
    listOfServicers[0].append(servicetable);
};

refresh();
