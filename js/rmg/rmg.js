import autoSuggestion from '../autosuggestion.js';

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
const initPage = async () => {
    const userData = await axios.get('http://localhost:3000/user/get');
    const roomData = await axios.get('http://localhost:3000/room/get');
    const userNameInputField = document.getElementById('userName');
    const roomTypeInputField = document.getElementById('roomType');
    const userIdInputField = document.getElementById('userId');
    const roomIdInputField = document.getElementById('roomId');

    const autoCompleteList = document.querySelectorAll('.autoCompleteList');
    //console.log(autoCompleteList[0]);
    console.log(userData);
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

    const mirrorInput = (childData, inputElement) => {
        //console.log(userData.data.content[childData.value].UserId);
        inputElement.value = childData; // childData.value;
    };

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
            mirrorInput(
                userData.data.content[
                    autoCompleteList[0].children[currentIndex].value
                ].UserId,
                userIdInputField
            );
            autoCompleteList[0].innerHTML = '';
        }
    });

    autoCompleteList[0].addEventListener('click', e => {
        // console.log('clicked');
        userNameInputField.value = e.target.textContent;
        //userData.data.content[childData.value].UserId
        // console.log('Current e Value: ', e.target.textContent);
        mirrorInput(
            userData.data.content[e.target.value].UserId,
            userIdInputField
        );
        //Set other input fields to user/roomData[e.target.value]
        autoCompleteList[0].innerHTML = '';
    });

    // roomTypeInputField
    roomTypeInputField.addEventListener('input', () => {
        const dataConverter = data => {
            const arr = [];
            for (let i = 0; i < data.length; i++) {
                arr.push(data[i].RoomType);
            }
            return arr;
        };

        if (!roomTypeInputField.value) {
            return;
        }
        let suggestions = autoSuggestion(
            roomTypeInputField.value,
            dataConverter(roomData.data.content)
        );
        console.log('Room Data: ', suggestions);

        let combinedArray = suggestions[0].map((number, index) => ({
            text: suggestions[1][index],
            index: number,
        }));
        autoCompleteList[1].innerHTML = '';
        autoCompleteBuilder(autoCompleteList[1], combinedArray);

        currentIndex = 0;
        console.log(suggestions);
    });

    let currentIndex2 = 0;
    roomTypeInputField.addEventListener('keydown', e => {
        if (autoCompleteList[1].children.length === 0) {
            return;
        }
        const addActive = () => {
            for (let i = 0; i < autoCompleteList[1].children.length; i++) {
                autoCompleteList[1].children[i].classList.remove('active');
            }
            autoCompleteList[1].children[currentIndex2].classList.add('active');
        };
        let previousIndex = -1;
        if (e.code === 'ArrowDown') {
            e.preventDefault();
            currentIndex2++;

            if (currentIndex2 >= autoCompleteList[1].children.length) {
                currentIndex2 = 0;
            }
            addActive();
        }
        if (e.code === 'ArrowUp') {
            e.preventDefault();
            currentIndex2--;

            if (currentIndex2 < 0) {
                currentIndex2 = autoCompleteList[1].children.length - 1;
            }
            addActive();
        }
        if (e.code === 'Enter') {
            e.preventDefault();
            roomTypeInputField.value =
                autoCompleteList[1].children[currentIndex2].textContent;
            console.log(
                'Current Child Value: ',
                autoCompleteList[1].children[currentIndex2].value
            );
            mirrorInput(
                roomData.data.content[
                    autoCompleteList[1].children[currentIndex2].value
                ].RoomId,
                roomIdInputField
            );
            autoCompleteList[1].innerHTML = '';
        }
    });

    autoCompleteList[1].addEventListener('click', e => {
        console.log('clicked');
        roomTypeInputField.value = e.target.textContent;
        roomData.data.content[e.target.value].RoomId;
        console.log('Current e Value: ', e.target.textContent);
        mirrorInput(
            roomData.data.content[e.target.value].RoomId,
            roomIdInputField
        );
        //Set other input fields to user/roomData[e.target.value]
        autoCompleteList[1].innerHTML = '';
    });
};

initPage();
