function TestInputs() {
    console.clear();
    ClearAllOutputs();
    console.log('%c' + 'Function:TestInputs', 'color: #00FF00');

    let dateFrom = new Date(document.getElementById("dateFrom").value);
    let dateTo = new Date(document.getElementById("dateTo").value);

    console.log('Date From : ' + dateFrom);
    console.log('Date To   : ' + dateTo);
    console.log('\n');

    let datesAreValid = isValidDate(dateFrom) && isValidDate(dateTo);

    console.log('Dates Valid: ' + datesAreValid);
    SetOutput('Output1', 'Dates Valid: ' + datesAreValid);
}

function DateFrom_Updated(FromInput) {
    console.clear();
    ClearAllOutputs();
    console.log('%cFunction:DateFrom_Updated', 'color: #00FF00');
    // console.log('Param - FromInput:');
    //console.log(FromInput);

    if (!FromInput) {
        console.log('From Date Is Required.');
    }
    else {
        let dateFrom = new Date(document.getElementById("dateFrom").value);
        let dateTo = new Date(document.getElementById("dateTo").value);

        if (dateFrom != null && dateTo != null) {
            if (dateFrom > dateTo) {
                console.log('From Date must be greater than To Date.');
                //FromInput.focus();
            }
            else {
                SetUpdateDuraction(dateFrom, dateTo);
            }
        }
    }

    console.log('\n');
}

function DateTo_Updated(ToInput) {
    console.clear();
    ClearAllOutputs();
    console.log('%c' + 'Function:DateTo_Updated', 'color: #00FF00');
    // console.log('Param - ToInput:');
    // console.log(ToInput);

    if (!ToInput) {
        console.log('To Date Is Required.');
    }
    else {
        let dateFrom = new Date(document.getElementById("dateFrom").value);
        let dateTo = new Date(document.getElementById("dateTo").value);

        if (dateFrom != null && dateTo != null) {
            if (dateFrom > dateTo) {
                console.log('From Date must be greater than To Date.');
                //ToInput.focus();
            }
            else {
                SetUpdateDuraction(dateFrom, dateTo);
            }
        }
    }

    console.log('\n');
}

function SetUpdateDuraction(dateFrom, dateTo) {
    ClearAllOutputs();
    console.log('\n');
    console.log('%c' + 'Function:SetUpdateDuration', 'color: #00FF00');
    console.log('Param - dateFrom: ' + dateFrom);
    console.log('Param - dateTo  : ' + dateTo);

    var millisecondCount = 1000;
    var secondCount = 60;
    var minuteCount = 60;
    var hourCount = 24;
    var currentTime = new Date();
    var dateDuration = dateTo - dateFrom;

    if (dateTo > dateFrom) {
        var fromZulu = GetZuluMiliseconds(dateFrom);
        var toZulu = GetZuluMiliseconds(dateTo);

        var dateDiff = Math.abs(toZulu - fromZulu) / millisecondCount;
        var strDays = Math.floor(dateDiff / (secondCount * minuteCount * hourCount)); //86,400
        console.log('strDays: ' + strDays);        

        dateDiff -= strDays * (secondCount * minuteCount * hourCount); //86,400
        var strHours = Math.floor(dateDiff / (secondCount * minuteCount)) % 24;
        console.log('strHours: ' + strHours)

        dateDiff -= strHours * (secondCount * minuteCount); //3,600
        var strMinutes = Math.floor(dateDiff / minuteCount) % 60;
        console.log('strMinutes: ' + strMinutes);

        dateDuration = ("00" + strDays).slice(-3) + ":" + ("0" + strHours).slice(-2) + ":" + ("0" + strMinutes).slice(-2);
    }
    else {
        dateDuration = "000:00:00";
    }

    if (dateFrom > currentTime) {
        console.log('\n' + 'Downtime: ' + dateDuration);
        SetOutput('Output2', 'Downtime: ' + dateDuration);
    }
    else {
        console.log('\n' + 'Downtime: ' + dateDuration);
        console.log('Date From must be greater than now.');
        SetOutput('Output2', 'Date From must be greater than now.');
    }
}

function GetZuluMiliseconds(dateValue) {
    console.log('\n');
    console.log('%c' + 'Function:GetZuluMiliseconds', 'color: #00FF00');
    console.log('Param - dateValue: ' + dateValue);

    var ZuluYear = dateValue.getUTCFullYear();
    var ZuluMonth = dateValue.getUTCMonth();
    var ZuluDate = dateValue.getUTCDate();

    var ZuluHour = dateValue.getUTCHours();
    if (dateValue.toString().indexOf("Daylight") === -1) {
        ZuluHour++
    }

    var ZuluMinutes = dateValue.getUTCMinutes();

    return Date.UTC(ZuluYear, ZuluMonth, ZuluDate, ZuluHour, ZuluMinutes);
}

function SetOutput(output, content) {
    document.getElementById(output.toString()).innerHTML = content;
}

function ClearAllOutputs() {
    document.getElementById('Output1').innerHTML = '';
    document.getElementById('Output2').innerHTML = '';
    document.getElementById('Output3').innerHTML = '';
}

function isValidDate(date) {
    return date && Object.prototype.toString.call(date) === "[object Date]" && !isNaN(date);
}

function SliceTest() {
    console.clear();
    ClearAllOutputs();
    console.log('%c' + 'Function:SliceTest', 'color: #00FF00');
    const testArray1 = [];
    testArray1.push(1000, 100, 50, 5, 0, -5, -50, -100, -1000);

    for (i = 0; i < testArray1.length; i++) {
        var testRow = new Object();
        testRow.input = testArray1[i];
        testRow.appendN3 = ("00" + testArray1[i]);
        testRow.sliceN3 = ("00" + testArray1[i]).slice(-3);
        testRow.appendN2 = ("0" + testArray1[i]);
        testRow.sliceN2 = ("0" + testArray1[i]).slice(-2);

        console.log(testRow);
    }

    SetOutput('Output3', 'See JS console');
}

