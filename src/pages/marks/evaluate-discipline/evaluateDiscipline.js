window.addEventListener('load', () => {
    const loginToken = localStorage.getItem('USER_TOKEN');
    const form = document.getElementById('evaluate-form')

    form.onsubmit = function (event) {
        event.preventDefault();
        const request = new XMLHttpRequest();
        const requestURL = new URL('http://127.0.0.1:5000/marks');

        const marksId = encodeURIComponent(document.getElementById('marks-id').value);
        const disciplineId = encodeURIComponent(document.getElementById('discipline-id').value);
        const mark = encodeURIComponent(document.getElementById('mark').value);
        const passed = document.querySelector('#flex-switch-check-default:checked')?.value

        const requestBody = JSON.stringify({
            MarksID: parseInt(marksId),
            DisciplineID: parseInt(disciplineId),
            Mark: parseInt(mark),
            Passed: passed === 'on'
        });
        console.log(requestBody);

        request.open('PUT', requestURL.toString(), false);
        request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
        request.setRequestHeader('Authorization', loginToken);
        request.send(requestBody);

        console.log(request.response);
        console.log(request.status);

        const json = JSON.parse(request.response);
        //setParameters(json['StudentID'], json['Group'], json['FirstName'], json['LastName'], json['sum(mrk.Mark*(dpn.Credits*1.0))']);
        setParameters([json])
    }
});

function setParameters(dataArray) {
    const myNode = document.getElementById("excelDataTable");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.lastChild);
    }
    buildHtmlTable(dataArray);

}

function buildHtmlTable(myList) {
    var columns = addAllColumnHeaders(myList);

    for (var i = 0 ; i < myList.length ; i++) {
        var row$ = $('<tr/>');
        for (var colIndex = 0 ; colIndex < columns.length ; colIndex++) {
            var cellValue = myList[i][columns[colIndex]];

            if (cellValue == null) { cellValue = ""; }

            row$.append($('<td/>').html(cellValue));
        }
        $("#excelDataTable").append(row$);
    }
}

// Adds a header row to the table and returns the set of columns.
// Need to do union of keys from all records as some records may not contain
// all records
function addAllColumnHeaders(myList)
{
    var columnSet = [];
    var headerTr$ = $('<tr/>');

    for (var i = 0 ; i < myList.length ; i++) {
        var rowHash = myList[i];
        for (var key in rowHash) {
            if ($.inArray(key, columnSet) == -1){
                columnSet.push(key);
                headerTr$.append($('<th/>').html(key));
            }
        }
    }
    $("#excelDataTable").append(headerTr$);

    return columnSet;
}

// function findStudent(){
//     const token = localStorage.getItem('USER_TOKEN');
//     const studentId = document.getElementById('exampleInputId').value;
//     const data = JSON.stringify({
//         id: studentId,
//     });
//     const xhr = new XMLHttpRequest();
//
//     xhr.addEventListener('readystatechange', function () {
//         if (this.readyState === this.DONE) {
//             console.log(this.responseText);
//             const result = JSON.parse(this.responseText);
//             console.log(result);
//         }
//     });
//
//
//     xhr.open('GET', 'http://127.0.0.1:5000/student');
//     xhr.setRequestHeader('content-type', 'application/json');
//     console.log(token);
//     xhr.setRequestHeader('Authorization', 'Bearer '+localStorage.getItem('token'));
//     xhr.send(data);
// }