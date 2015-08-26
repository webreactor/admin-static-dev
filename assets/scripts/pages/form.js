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

App.summernoteInit = function () {
    $('.summernote').summernote({
        lang:      'ru-RU',
        height:    200,
        minHeight: 100,
        maxHeight: 1000
    });
};

App.fineUploaderInit = function () {
    var $uploader = $('#fine-uploader').fineUploader({
        template:                'qq-template-gallery',
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
        validation:              {
            itemLimit:         20,
            allowedExtensions: ['jpg', 'jpeg', 'png', 'gif'],
            sizeLimit:         5000000 // 5 MB
        },
        failedUploadTextDisplay: {
            mode:             'custom', //default, custom, or none
            responseProperty: 'error',
            enableTooltip:    true
        }
    }).on('error', function (event, id, name, errorReason, xhr) {
        $uploader.fineUploader('cancel', id);

        App.danger(errorReason);
    });
};

$(document).ready(function () {
    App.select2Init();
    App.daterangepickerInit();
    App.summernoteInit();
    App.fineUploaderInit();
});