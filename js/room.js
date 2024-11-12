import tableConstructor from './tableConstructor.js';
document.getElementById('addRoom').addEventListener('click', async () => {
    const roomId = document.getElementById('roomId').value;
    const roomType = document.getElementById('roomType').value;
    const roomLocation = document.getElementById('roomLocation').value;
    const roomPrice = document.getElementById('roomPrice').value;

    const data = {
        RoomId: roomId,
        RoomType: roomType,
        RoomLocation: roomLocation,
        BasePrice: roomPrice,
    };
    axios.post('http://localhost:3000/room/create', {
        content: JSON.stringify(data),
    });
});

document.getElementById('updateRoom').addEventListener('click', async () => {
    const roomId = document.getElementById('roomId').value;
    const roomType = document.getElementById('roomType').value;
    const roomLocation = document.getElementById('roomLocation').value;
    const roomPrice = document.getElementById('roomPrice').value;

    const data = {
        RoomId: roomId,
        RoomType: roomType,
        RoomLocation: roomLocation,
        BasePrice: roomPrice,
    };
    axios.put('http://localhost:3000/room/update', {
        content: JSON.stringify(data),
    });
});

document.getElementById('deleteRoom').addEventListener('click', async () => {
    const roomId = document.getElementById('roomId').value;
    const data = {
        RoomId: roomId,
        RoomType: '',
        RoomLocation: '',
        BasePrice: '',
    };
    // console.log(data);
    axios.post(`http://localhost:3000/room/delete`, {
        content: JSON.stringify(data),
    });
});

const rebuildData = ldata => {
    console.log('ldata', ldata);
    const mainarr = [];
    for (let i = 0; i < ldata.length; i++) {
        const tmp = JSON.parse(
            JSON.stringify([
                ldata[i].RoomId,
                ldata[i].RoomType,
                ldata[i].RoomLocation,
                ldata[i].BasePrice,
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
    const res = await axios.get('http://localhost:3000/room/get');
    const listOfRooms = document.getElementsByClassName('listOfServicers');
    let dataContent = res.data.content;
    console.log(res.data.content);
    let tableHeader = ['RoomId', 'RoomType', 'RoomLocation', 'BasePrice'];
    let tableContent = rebuildData(dataContent);
    console.log('tableC', tableContent);
    console.log(listOfRooms);
    listOfRooms[0].innerHTML = '';
    let roomtable = tableConstructor(tableHeader, tableContent);
    listOfRooms[0].append(roomtable);
};
refresh();
