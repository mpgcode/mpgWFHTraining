function TestInputs() {
    console.log('Function:TestInputs');

    let dateFrom = new Date(document.getElementById("dateFrom").value);
    let dateTo = new Date(document.getElementById("dateTo").value);

    console.log('Date From: ');
    console.log(dateFrom);
    console.log('Date To: ');
    console.log(dateTo);
    console.log('\n');
}

function DateFrom_Updated(FromInput) {
    console.log('\n');
    console.log('Function:DateFrom_Updated');
    console.log('Param - FromInput:');
    console.log(FromInput);

    if (!FromInput) {
        console.log('From Date Is Required.');
    }
    else {
        let dateFrom = new Date(document.getElementById("dateFrom").value);
        let dateTo = new Date(document.getElementById("dateTo").value);

        if(dateFrom != null && dateTo !=null) {
            if (dateFrom > dateTo) {
                
            }
            else {
                SetUpdateDuraction(dateFrom, dateTo);
            }
        }
    }

    console.log('\n');
}

function DateTo_Updated(ToInput) {
    console.log('\n');
    console.log('Function:DateTo_Updated');
    console.log('Param - ToInput:');
    console.log(ToInput);

    if (!ToInput) {
        console.log('To Date Is Required.');
    }
    else {
        let dateFrom = new Date(document.getElementById("dateFrom").value);
        let dateTo = new Date(document.getElementById("dateTo").value);

        if(dateFrom != null && dateTo !=null) {
            if (dateFrom > dateTo) {
                ToInput.focus();
            }
            else {
                SetUpdateDuraction(dateFrom, dateTo);
            }
        }
    }

    console.log('\n');
}

function SetUpdateDuraction(dateFrom, dateTo) {
    console.log('\n');
    console.log('Function:SetUpdateDuraction');
    console.log('Param - dateFrom: ');
    console.log(dateFrom);
    console.log('Param - dateTo: ');
    console.log(dateTo);

    var millisecondCount = 1000;
    var secondCount = 60;
    var minuteCount = 60;
    var hourCount = 24;
    var currentTime = new Date();
    var dateDuration = dateTo - dateFrom;

    if (dateTo > dateFrom) {
        var toZulu = GetZuluMiliseconds(dateTo);
        var fromZulu = GetZuluMiliseconds(dateFrom);

        var dateDiff = Math.abs(toZulu - fromZulu) / millisecondCount;
        var strDays = Math.floor(dateDiff / (secondCount * minuteCount * hourCount)); //86,400

        dateDiff -= strDays * (secondCount * minuteCount * hourCount); //86,400
        var strHours = Math.floor(dateDiff / (secondCount * minuteCount)) % 24;

        dateDiff -= strHours * (secondCount * minuteCount); //3,600
        var strMinutes = Math.floor(dateDiff / minuteCount) % 60;

        dateDuration = ("00" + strDays).slice(-3) + ":" + ("0" + strHours).slice(-2) + ":" + ("0" + strMinutes).slice(-2);
    }
    else {
        dateDuration = "000:00:00";
    }

    if (dateFrom > currentTime) {
        console.log('Downtime: ' + dateDuration);
    }
}

function GetZuluMiliseconds(dateValue) {
    console.log('\n');
    console.log('Function:GetZuluMiliseconds');
    console.log('Param - dateValue: ');
    console.log(dateValue);


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
