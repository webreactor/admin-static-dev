App.initTreeView = function () {
    $.getJSON('data/tree.json', function (data) {
        var $treeView = $('#treeview'),
            $tree     = $treeView.treeview({
                expandIcon:   'fa fa-plus',
                collapseIcon: 'fa fa-minus',
//                nodeIcon:     'fa fa-bookmark',
                levels:       1,
                data:         data.treeItems
            });

        App.initTreeActions($treeView);
    });
};

App.initTreeActions = function (element) { };

$(document).ready(function () {
    App.initTreeView();
});