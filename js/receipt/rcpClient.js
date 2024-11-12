import tableConstructor from '../tableConstructor.js';
document.getElementById('export').addEventListener('click', async () => {
    const serviceMngId = document.getElementById('serviceMngId').value;
    const userId = document.getElementById('userId').value;
    const roomMngId = document.getElementById('roomMngId').value;
    const totalTransaction = document.getElementById('totalTransaction').value;

    const data = {
        ReceiptId: '',
        RoomManagerId: roomMngId,
        ServiceManagerId: serviceMngId,
        UserId: userId,
        TotalPrice: totalTransaction,
        ExportDate: new Date().toISOString(),
    };
    axios.post('http://localhost:3000/receipt/create', {
        content: JSON.stringify(data),
    });
});

const rebuildData = ldata => {
    console.log('ldata', ldata);
    const mainarr = [];
    for (let i = 0; i < ldata.length; i++) {
        const tmp = JSON.parse(
            JSON.stringify([
                ldata[i].ReceiptId,
                ldata[i].RoomManagerId,
                ldata[i].ServiceManagerId,
                ldata[i].UserId,
                ldata[i].TotalPrice,
                new Date(ldata[i].ExportDate).toLocaleString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                }),
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
    const data = await axios.get('http://localhost:3000/receipt/get');
    const listOfServicers = document.getElementsByClassName('listOfServicers');
    let dataContent = data.data.content;
    console.log(data.data.content);
    let tableHeader = [
        'ReceiptId',
        'RoomManagerId',
        'ServiceManagerId',
        'UserId',
        'TotalPrice',
        'ExportDate',
    ];
    let tableContent = rebuildData(dataContent);
    console.log('tableC', tableContent);
    console.log(listOfServicers);
    listOfServicers[0].innerHTML = '';
    let servicetable = tableConstructor(tableHeader, tableContent);
    console.log(servicetable);
    listOfServicers[0].append(servicetable);
};

refresh();
