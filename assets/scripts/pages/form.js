App.initSelect2 = function () {
    $('#select').select2();

    $('#select-multiple').select2({
        allowClear:  true,
        placeholder: 'Выберите регион'
    });
};

App.initMaskedInput = function () {
    $('#phone').mask(
        '+7 (999) 999-99-99',
        {
            placeholder: ' '
        }
    );
};

var getDatePickerConfig = function () {
    return {
        timePicker:        false,
        timePicker24Hour:  true,
        timePickerSeconds: true,
        showDropdowns:     true,
        locale:            {
            separator:        ' - ',
            applyLabel:       'Применить',
            cancelLabel:      'Отменить',
            weekLabel:        '',
            customRangeLabel: 'Custom Range'
        }
    };
};

App.initDatePicker = function () {
    var config = $.extend(true, getDatePickerConfig(), {
        singleDatePicker: true,
        locale:           {
            format: 'YYYY.MM.DD'
        }
    });

    $('#date').daterangepicker(config);
};

App.initDateTimePicker = function () {
    var config = $.extend(true, true, getDatePickerConfig(), {
        timePicker:       true,
        singleDatePicker: true,
        locale:           {
            format: 'YYYY.MM.DD HH:mm:ss'
        }
    });

    $('#date-time').daterangepicker(config);
};

App.initDateRangePicker = function () {
    var config = $.extend(true, getDatePickerConfig(), {
        locale: {
            format: 'YYYY.MM.DD'
        }
    });

    $('#date-range').daterangepicker(config);
};

App.initDateTimeRangePicker = function () {
    var config = $.extend(true, getDatePickerConfig(), {
        timePicker: true,
        locale:     {
            format: 'YYYY.MM.DD HH:mm:ss'
        }
    });

    $('#date-time-range').daterangepicker(config);
};

App.initSummernote = function () {
    $('#wysiwyg').summernote({
        lang:      'ru-RU',
        height:    120,
        minHeight: 100,
        maxHeight: 1000,
        toolbar:   [
            ['style', ['style']],
            ['font', ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear']],
            ['fontsize', ['fontsize']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['height', ['height']],
            ['table', ['table']],
            ['insert', ['link', 'picture', 'hr']],
            ['view', ['fullscreen', 'codeview']],
            ['help', ['help']]
        ]
    });
};

var getFineUploaderConfig = function () {
    return {
        text:                    {
            formatProgress:     '{percent}% из {total_size}',
            failUpload:         'Ошибка',
            waitingForResponse: 'Processing...',
            paused:             'Paused',
            uploadButton:       'Click or Drop'
        },
        messages:                {
            tooManyFilesError:  'You may only drop one file',
            unsupportedBrowser: 'Unrecoverable error - this browser does not permit file uploading of any kind.'
        },
        request:                 {
            endpoint:  '/media/image/upload',
            inputName: 'image'
        },
        deleteFile:              {
            enabled:            true,
            forceConfirm:       false,
            endpoint:           '/media/image/delete',
            deletingStatusText: 'Deleting...',
            deletingFailedText: 'Delete failed'
        },
        thumbnails:              {
            placeholders: {
                waitingPath:      '/img/fine-uploader/placeholders/waiting-generic.png',
                notAvailablePath: '/img/fine-uploader/placeholders/not_available-generic.png'
            }
        },
        failedUploadTextDisplay: {
            mode:             'custom', //default, custom, or none
            responseProperty: 'error',
            enableTooltip:    true
        }
    };
};

App.initFileUploader = function () {
    var config = $.extend(true, getFineUploaderConfig(), {
        template:   'file-uploader-template',
        validation: {
            itemLimit: 1,
            sizeLimit: 50000000 // 50 MB
        }
    });

    var $uploader = $('#file-uploader').fineUploader(config).on('error', function (event, id, name, errorReason, xhr) {
        $uploader.fineUploader('cancel', id);

        App.danger(errorReason);
    });
};

App.initFilesUploader = function () {
    var config = $.extend(true, getFineUploaderConfig(), {
        template:   'files-uploader-template',
        validation: {
            itemLimit: 12,
            sizeLimit: 50000000 // 50 MB
        }
    });

    var $uploader = $('#files-uploader').fineUploader(config).on('error', function (event, id, name, errorReason, xhr) {
        $uploader.fineUploader('cancel', id);

        App.danger(errorReason);
    });
};

App.initImageUploader = function () {
    var config = $.extend(true, getFineUploaderConfig(), {
        template:   'image-uploader-template',
        validation: {
            itemLimit:         1,
            sizeLimit:         5000000, // 50 MB
            allowedExtensions: ['jpg', 'jpeg', 'png', 'gif']
        }
    });

    var $uploader = $('#image-uploader').fineUploader(config).on('error', function (event, id, name, errorReason, xhr) {
        $uploader.fineUploader('cancel', id);

        App.danger(errorReason);
    });
};

App.initImagesUploader = function () {
    var config = $.extend(true, getFineUploaderConfig(), {
        template:   'images-uploader-template',
        validation: {
            itemLimit:         12,
            sizeLimit:         5000000, // 50 MB
            allowedExtensions: ['jpg', 'jpeg', 'png', 'gif']
        }
    });

    var $uploader = $('#images-uploader').fineUploader(config).on('error', function (event, id, name, errorReason, xhr) {
        $uploader.fineUploader('cancel', id);

        App.danger(errorReason);
    });
};

App.initImagePicker = function () {
    $('#image-picker').imagepicker();
};

App.initImagesPicker = function () {
    $('#images-picker').imagepicker();
};

$(document).ready(function () {
    App.initSelect2();
    App.initMaskedInput();
    App.initDatePicker();
    App.initDateTimePicker();
    App.initDateRangePicker();
    App.initDateTimeRangePicker();
    App.initSummernote();
    App.initFileUploader();
    App.initFilesUploader();
    App.initImageUploader();
    App.initImagesUploader();
    App.initImagePicker();
    App.initImagesPicker();
});