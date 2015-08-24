var App = function () {
    return {
        init: function () {
            console.log('App initialized!');
        }
    };
}();

$(document).ready(function () {
    App.init();
});