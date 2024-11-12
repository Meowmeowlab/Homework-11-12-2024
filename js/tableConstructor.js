const tableConstructor = (lheader, lcontent) => {
    console.log(lheader);
    console.log(lcontent);
    const table = document.createElement('table');
    table.classList.add('serviceTable');

    const headerRow = document.createElement('tr');
    for (let i = 0; i < lheader.length; i++) {
        const th = document.createElement('th');
        th.textContent = lheader[i];
        headerRow.appendChild(th);
    }
    table.appendChild(headerRow);

    for (let i = 0; i < lcontent.length; i++) {
        const tr = document.createElement('tr');
        for (let j = 0; j < lcontent[i].length; j++) {
            const td = document.createElement('td');
            td.textContent = lcontent[i][j];
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    return table;
};

export default tableConstructor;
