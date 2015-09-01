App.initTableActions = function () {
    var $dataTable = $('#datatable'),
        $rows      = $dataTable.find('tbody').find('tr');

    $rows.popover({
        container: 'body',
        content:   '<a href="" class="btn btn-block btn-xs btn-default">Редактировать</a><a href="" class="btn btn-block btn-xs btn-danger">Удалить</a>',
        html:      true,
        placement: 'bottom'
    }).on('shown.bs.popover', function () {
        var $popover      = $('.popover'),
            $popoverLinks = $popover.find('a');

        $popoverLinks.click(function () {
            $rows.popover('hide');
        });
    }).click(function (event) {
        var $popover    = $('.popover'),
            $currentRow = $(this);

        $currentRow.toggleClass('popovered');

        $popover.css('left', event.pageX - ($popover.outerWidth() / 2));

        $rows.each(function () {
            if ($(this).get(0) !== $currentRow.get(0)) {
                $(this).popover('hide');
                $(this).removeClass('popovered');
            }
        });
    });
};

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
    App.initTableActions();
    App.initSelect2();
    App.initDateRangePicker();
});