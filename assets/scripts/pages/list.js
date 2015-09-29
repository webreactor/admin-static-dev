App.initSelect2 = function () {
    $('#select2').select2({
        allowClear:  true,
        placeholder: 'Автор'
    });
};

App.initDateRangePicker = function () {
    $('#date-time-range-picker').daterangepicker({
        timePicker:          true,
        timePickerIncrement: 5,
        timePicker24Hour:    true,
        locale:              {
            format:           'YYYY.MM.DD HH:mm:ss',
            separator:        ' - ',
            applyLabel:       'Применить',
            cancelLabel:      'Отменить',
            weekLabel:        '',
            customRangeLabel: 'Custom Range'
        }
    });
};

$(document).ready(function () {
    App.initSelect2();
    App.initDateRangePicker();
});