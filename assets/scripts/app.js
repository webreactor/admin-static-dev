var App = function () {
    var initSideBar = function () {
        var $sidebar      = $('.sidebar'),
            initialBottom = $sidebar.css('bottom'),
            initialTop    = $sidebar.css('top');
        
        var move = function () {
            var bottom = parseInt(initialBottom) - ($(document).height() - $(window).height() - $(window).scrollTop()),
                top    = parseInt(initialTop) - $(window).scrollTop(),
                left   = -$(window).scrollLeft();
            
            if (bottom < 0) {
                bottom = 0;
            }
            
            if (top < 0) {
                top = 0;
            }
            
            $sidebar.css('bottom', bottom);
            $sidebar.css('top', top);
            $sidebar.css('left', left);
        };
        
        $(window).scroll(move);
        
        move();
    };
    
    var scrollSideBar = function () {
        var $sidebar    = $('.sidebar'),
            $activeItem = $sidebar.find('li.active').first();

        if ($activeItem.length != 1) {
            return false;
        }

        var scrollTo = $activeItem.offset().top - $(window).scrollTop() - ($sidebar.height() / 2) - ($activeItem.height() / 2);

        $sidebar.animate({ scrollTop: scrollTo }, 500);
    };
    
    var configureMoment = function () {
        moment.locale('ru');
    };
    
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
            initSideBar();
            scrollSideBar();
            configureMoment();
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