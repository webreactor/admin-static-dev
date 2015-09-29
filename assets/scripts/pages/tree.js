App.initTreeView = function () {
    $.getJSON('data/tree.json', function (data) {
        var $treeView = $('#treeview');

        $treeView.treeview({data: data.treeItems});

        App.initTreeActions();
    });
};

$(document).ready(function () {
    App.initTreeView();
});