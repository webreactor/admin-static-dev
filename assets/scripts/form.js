App.select2Init = function () {
    $('#inputTags').select2();
};

App.daterangepickerInit = function () {
    moment.locale('ru');

    $('#inputDate').daterangepicker({
        singleDatePicker: true,
        showDropdowns:    true,
        locale:           {
            format: 'YYYY.MM.DD'
        }
    });
};

App.wysihtml5Init = function () {
    $('.wysihtml5').wysihtml5({
        toolbar: {
            'fa': true
        },
        locale:  'ru-RU'
    });
};

$(document).ready(function () {
    App.select2Init();
    App.daterangepickerInit();
    App.wysihtml5Init();
});