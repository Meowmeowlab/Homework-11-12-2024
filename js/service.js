import tableConstructor from './tableConstructor.js';
document.getElementById('addService').addEventListener('click', async () => {
    const serviceId = document.getElementById('serviceId').value;
    const serviceType = document.getElementById('serviceType').value;
    const servicePrice = document.getElementById('servicePrice').value;

    const data = {
        ServiceId: serviceId,
        ServiceType: serviceType,
        BasePrice: servicePrice,
    };
    axios.post('http://localhost:3000/service/create', {
        content: JSON.stringify(data),
    });
});

document.getElementById('updateService').addEventListener('click', async () => {
    const serviceId = document.getElementById('serviceId').value;
    const serviceType = document.getElementById('serviceType').value;
    const servicePrice = document.getElementById('servicePrice').value;

    const data = {
        ServiceId: serviceId,
        ServiceType: serviceType,
        BasePrice: servicePrice,
    };
    axios.put('http://localhost:3000/service/update', {
        content: JSON.stringify(data),
    });
});

document.getElementById('deleteService').addEventListener('click', async () => {
    const serviceId = document.getElementById('serviceId').value;
    const data = {
        ServiceId: serviceId,
        ServiceType: '',
        BasePrice: '',
    };
    // console.log(data);
    axios.post(`http://localhost:3000/service/delete`, {
        content: JSON.stringify(data),
    });
});

const rebuildData = ldata => {
    console.log('ldata', ldata);
    const mainarr = [];
    for (let i = 0; i < ldata.length; i++) {
        const tmp = JSON.parse(
            JSON.stringify([
                ldata[i].ServiceId,
                ldata[i].ServiceType,
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
    const res = await axios.get('http://localhost:3000/service/get');
    const listOfServicers = document.getElementsByClassName('listOfServicers');
    let dataContent = res.data.content;
    console.log(res.data.content);
    let tableHeader = ['ServiceId', 'ServiceType', 'BasePrice'];

    let tableContent = rebuildData(dataContent);
    console.log('tableC', tableContent);

    console.log(listOfServicers);
    listOfServicers[0].innerHTML = '';
    let servicetable = tableConstructor(tableHeader, tableContent);
    listOfServicers[0].append(servicetable);
};
