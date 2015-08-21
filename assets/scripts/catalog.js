$(document).ready(function () {
    $(this).click(function (event) {
        var $target = $(event.target);

        var isActive = $target.hasClass('active');

        $('.catalog .categories > li').removeClass('active');

        if ($target.is('.catalog .categories > li') && !isActive) {
            $target.addClass('active');
        }

        if ($target.is('.catalog .categories > li li')) {
            window.location.href = 'index.html';
        }
    });
});