var App = function () {
    var jGrowlOptions = {
        closerTemplate: '<div>[ закрыть все ]</div>'
    };

    var jGrowlSuccess = function (message) {
        $.jGrowl(message, $.extend(jGrowlOptions, {
            theme: 'jgrowl-success'
        }));
    };

    var jGrowlInfo = function (message) {
        $.jGrowl(message, $.extend(jGrowlOptions, {
            theme: 'jgrowl-info'
        }));
    };

    var jGrowlWarning = function (message) {
        $.jGrowl(message, $.extend(jGrowlOptions, {
            theme: 'jgrowl-warning'
        }));
    };

    var jGrowlDanger = function (message) {
        $.jGrowl(message, $.extend(jGrowlOptions, {
            theme: 'jgrowl-danger'
        }));
    };

    return {
        init:    function () {
            console.log('App initialized!');
        },
        success: function (message) {
            jGrowlSuccess(message);
        },
        info:    function (message) {
            jGrowlInfo(message);
        },
        warning: function (message) {
            jGrowlWarning(message);
        },
        danger:  function (message) {
            jGrowlDanger(message);
        }
    };
}();

$(document).ready(function () {
    App.init();
});