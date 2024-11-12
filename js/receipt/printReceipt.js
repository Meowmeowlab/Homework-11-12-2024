let userData = await axios.get('http://localhost:3000/user/get');
let roomData = await axios.get('http://localhost:3000/room/get');
let serviceData = await axios.get('http://localhost:3000/service/get');
let roomMngData = await axios.get('http://localhost:3000/roomMng/get');
let serviceMngData = await axios.get('http://localhost:3000/serviceMng/get');
let receiptData = await axios.get('http://localhost:3000/receipt/get');
const elementTable = document.getElementById('serviceTable');

// Get the current URL
const urlParams = new URLSearchParams(window.location.search);

// Get the value of the 'id' parameter
const id = urlParams.get('id');

const dateDiffInDays = (a, b) => {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
};

const tableConstruct = (a, b, c, d) => {
    const temp = document
        .getElementById('row-template')
        .cloneNode(true).content;

    temp.querySelector('tr').querySelectorAll('td')[0].textContent = a;
    temp.querySelector('tr').querySelectorAll('td')[1].textContent = b;
    temp.querySelector('tr').querySelectorAll('td')[2].textContent = c;
    temp.querySelector('tr').querySelectorAll('td')[3].textContent = d;
    return temp;
};

const calculateTotal = Id => {
    const userNameInputField = document.getElementById('rUserName');
    const roomIdInputField = document.getElementById('rRoomId');
    const bookDateInputField = document.getElementById('rBookDate');
    const expireDateInputField = document.getElementById('rExpireDate');
    const roomMngIdInputField = document.getElementById('rRoomMngId');
    const receiptDateInputField = document.getElementById('rReceiptDate');
    const receiptIdInputField = document.getElementById('rReceiptId');

    roomMngIdInputField.textContent = receiptDateInputField.textContent =
        new Date().toLocaleString();
    // receiptIdInputField.textContent = id;

    let localRoomMngData = roomMngData.data.content;
    let localServiceMngData = serviceMngData.data.content;
    let localRoomData = roomData.data.content;
    let localServiceData = serviceData.data.content;
    let localUser = userData.data.content;
    let localReceiptData = receiptData.data.content;
    let total = 0;
    for (let i = 0; i < localReceiptData.length; i++) {
        if (localReceiptData[i].UserId == Id) {
            receiptIdInputField.textContent = localReceiptData[i].ReceiptId;
            break;
        }
    }
    for (let i = 0; i < localUser.length; i++) {
        if (localUser[i].UserId == Id) {
            userNameInputField.textContent = localUser[i].UserName;
            break;
        }
    }
    for (let i = 0; i < localServiceMngData.length; i++) {
        if (localServiceMngData[i].UserId == Id) {
            console.log('Detect UserId: ', Id);
            for (let j = 0; j < localServiceData.length; j++) {
                if (
                    localServiceData[j].ServiceId ==
                    localServiceMngData[i].ServiceId
                ) {
                    elementTable.appendChild(
                        tableConstruct(
                            localServiceData[j].ServiceType,
                            localServiceMngData[i].Amount,
                            localServiceData[j].BasePrice / 100 + '$',
                            (localServiceData[j].BasePrice *
                                localServiceMngData[i].Amount) /
                                100 +
                                '$'
                        )
                    );
                    total +=
                        localServiceData[j].BasePrice *
                        localServiceMngData[i].Amount;

                    console.log('Total: ', total);
                    break;
                }
            }
        }
    }
    for (let i = 0; i < localRoomMngData.length; i++) {
        if (localRoomMngData[i].UserId == Id) {
            let currentRoomId = localRoomMngData[i].RoomId;
            let diff = dateDiffInDays(
                new Date(localRoomMngData[i].Book),
                new Date(localRoomMngData[i].Expire)
            );

            for (let j = 0; j < localRoomData.length; j++) {
                if (localRoomData[j].RoomId == currentRoomId) {
                    roomIdInputField.textContent = localRoomData[j].RoomId;
                    bookDateInputField.textContent = new Date(
                        localRoomMngData[i].Book
                    ).toLocaleDateString('en-GB');
                    expireDateInputField.textContent = new Date(
                        localRoomMngData[i].Expire
                    ).toLocaleDateString('en-GB');
                    roomMngIdInputField.textContent =
                        localRoomMngData[i].RoomManagerId;
                    elementTable.appendChild(
                        tableConstruct(
                            localRoomData[j].RoomType,
                            diff,
                            localRoomData[j].BasePrice / 100 + '$',
                            (localRoomData[j].BasePrice * diff) / 100 + '$'
                        )
                    );
                    total += localRoomData[j].BasePrice * diff;
                    console.log('Total: ', total);
                    break;
                }
            }
        }
    }
    elementTable.appendChild(tableConstruct('', '', '', total / 100 + '$'));
    //totalTransactionInputField.value = total;
    //101 = 1.01$
    //16750 = 16.75$
    //document.getElementById('subTotalTransaction').value = `${total / 100}$`;
};

calculateTotal(id);
// tableConstruct();
