function deleteEmptyRows(obj) {
    var cleanData = new Array();
    var hihi = new Array();

    $.each(obj, function (index, item) {
        for (key in item) {
            if (item[key] == null || item[key] == undefined || item[key] == '') {
                //console.log("hihi");
                delete item;
                hihi.push(index);
                break
            }
        }
    });

    $.each(obj, function (index, item) {
        if (hihi.indexOf(index) == -1) {
            cleanData.push(item);
            //console.log(item);
        }
    });

    return cleanData;
};

$(document).ready(function () {




});