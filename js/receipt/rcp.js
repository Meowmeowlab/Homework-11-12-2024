import autoSuggestion from '../autosuggestion.js';
let userData;
let roomData;
let serviceData;
let roomMngData;
let serviceMngData;

userData = await axios.get('http://localhost:3000/user/get');
roomData = await axios.get('http://localhost:3000/room/get');
serviceData = await axios.get('http://localhost:3000/service/get');
roomMngData = await axios.get('http://localhost:3000/roomMng/get');
serviceMngData = await axios.get('http://localhost:3000/serviceMng/get');

const roomMngIdInputField = document.getElementById('roomMngId');
const serviceMngIdInputField = document.getElementById('serviceMngId');

const userNameInputField = document.getElementById('userName');
const roomTypeInputField = document.getElementById('roomType');
const serviceTypeInputField = document.getElementById('serviceType');

const userIdInputField = document.getElementById('userId');
const roomIdInputField = document.getElementById('roomId');
const serviceIdInputField = document.getElementById('serviceId');

const autoCompleteList = document.querySelectorAll('.autoCompleteList');
const totalTransactionInputField = document.getElementById('totalTransaction');
const dateDiffInDays = (a, b) => {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
};
const autoCompleteBuilder = (parent, suggestions) => {
    const autoCompleteTemplate = document.getElementById(
        'autoCompleteTemplate'
    );

    for (let i = 0; i < suggestions.length; i++) {
        const clone = autoCompleteTemplate.content.cloneNode(true);
        clone.querySelector('.autoCompleteItem').textContent =
            suggestions[i].text;
        clone
            .querySelector('.autoCompleteItem')
            .setAttribute('value', suggestions[i].index);
        parent.append(clone);
    }
};

const mirrorInput = (childData, inputElement) => {
    //console.log(userData.data.content[childData.value].UserId);
    inputElement.value = childData; // childData.value;
};

const globalUpdator = Id => {
    console.log('Id: ', Id);
    roomIdInputField.value = '';
    serviceMngIdInputField.value = '';
    roomMngIdInputField.value = '';

    let localRoomMngData = roomMngData.data.content;
    let localServiceMngData = serviceMngData.data.content;
    let localRoomData = roomData.data.content;
    let localServiceData = serviceData.data.content;

    let currentRoomId = 0;
    let currentServiceId = 0;
    console.log(roomMngData);
    for (let i = 0; i < localRoomMngData.length; i++) {
        if (localRoomMngData[i].UserId == Id) {
            currentRoomId = localRoomMngData[i].RoomId;

            roomMngIdInputField.value = localRoomMngData[i].RoomManagerId;
            roomIdInputField.value = currentRoomId;
        }
        // if(localRoomMngData[i].RoomId === ){
        // mirrorInput(localRoomMngData[i].RoomType, roomTypeInputField);
    }
    for (let i = 0; i < localRoomData.length; i++) {
        if (localRoomData[i].RoomId === currentRoomId) {
            roomTypeInputField.value = localRoomData[i].RoomType;
        }
    }

    for (let i = 0; i < localServiceMngData.length; i++) {
        if (localServiceMngData[i].UserId == Id) {
            currentServiceId = localServiceMngData[i].ServiceId;
            mirrorInput(
                localServiceMngData[i].ServiceManagerId,
                serviceMngIdInputField
            );
        }
    }
};

const initPage = async () => {
    //console.log(autoCompleteList[0]);
    //console.log(userData);
    // console.log(roomData);

    // console.log(dataConverter(userData.data.content));

    userNameInputField.addEventListener('input', () => {
        const dataConverter = data => {
            const arr = [];
            for (let i = 0; i < data.length; i++) {
                arr.push(data[i].UserName);
            }
            return arr;
        };

        if (!userNameInputField.value) {
            autoCompleteList[0].innerHTML = '';
            return;
        }
        console.log(dataConverter(userData.data.content));
        let suggestions = autoSuggestion(
            userNameInputField.value,
            dataConverter(userData.data.content)
        );
        let combinedArray = suggestions[0].map((number, index) => ({
            text: suggestions[1][index],
            index: number,
        }));
        autoCompleteList[0].innerHTML = '';
        autoCompleteBuilder(autoCompleteList[0], combinedArray);

        currentIndex = 0;
        console.log(suggestions);
    });

    let currentIndex = 0;
    userNameInputField.addEventListener('keydown', e => {
        if (autoCompleteList[0].children.length === 0) {
            return;
        }
        const addActive = () => {
            for (let i = 0; i < autoCompleteList[0].children.length; i++) {
                autoCompleteList[0].children[i].classList.remove('active');
            }
            autoCompleteList[0].children[currentIndex].classList.add('active');
        };
        let previousIndex = -1;
        if (e.code === 'ArrowDown') {
            e.preventDefault();
            currentIndex++;

            if (currentIndex >= autoCompleteList[0].children.length) {
                currentIndex = 0;
            }
            addActive();
        }
        if (e.code === 'ArrowUp') {
            e.preventDefault();
            currentIndex--;

            if (currentIndex < 0) {
                currentIndex = autoCompleteList[0].children.length - 1;
            }
            addActive();
        }
        if (e.code === 'Enter') {
            e.preventDefault();
            userNameInputField.value =
                autoCompleteList[0].children[currentIndex].textContent;
            console.log(
                'Current Child Value: ',
                autoCompleteList[0].children[currentIndex].value
            );
            let a =
                userData.data.content[
                    autoCompleteList[0].children[currentIndex].value
                ].UserId;

            userIdInputField.value = a;

            globalUpdator(a);
            calculateTotal(a);
            autoCompleteList[0].innerHTML = '';
        }
    });

    autoCompleteList[0].addEventListener('click', e => {
        // console.log('clicked');
        userNameInputField.value = e.target.textContent;
        //userData.data.content[childData.value].UserId
        // console.log('Current e Value: ', e.target.textContent);
        let a = userData.data.content[e.target.value].UserId;

        userIdInputField.value = a;

        globalUpdator(a);
        calculateTotal(a);
        //Set other input fields to user/roomData[e.target.value]
        autoCompleteList[0].innerHTML = '';
    });
};
const calculateTotal = Id => {
    console.log('run');
    let localRoomMngData = roomMngData.data.content;
    let localServiceMngData = serviceMngData.data.content;
    let localRoomData = roomData.data.content;
    let localServiceData = serviceData.data.content;
    let total = 0;
    for (let i = 0; i < localServiceMngData.length; i++) {
        if (localServiceMngData[i].UserId == Id) {
            console.log('Detect UserId: ', Id);
            for (let j = 0; j < localServiceData.length; j++) {
                console.log(localServiceMngData);
                console.log(
                    `Currently compare: ${localServiceMngData[i].ServiceId}/${localServiceData[j].ServiceId}`
                );
                if (
                    localServiceData[j].ServiceId ==
                    localServiceMngData[i].ServiceId
                ) {
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
                    total += localRoomData[j].BasePrice * diff;
                    console.log('Total: ', total);
                    break;
                }
            }
        }
    }

    totalTransactionInputField.value = total;
    //101 = 1.01$
    //16750 = 16.75$
    document.getElementById('subTotalTransaction').value = `${total / 100}$`;
};

initPage();
