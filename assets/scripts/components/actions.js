(function ($) {
    'use strict';

    // ACTIONS PUBLIC CLASS DEFINITION
    // ===============================

    var Actions = function (elements, actions) {
        this.init(elements, actions);
    };

    if (!$.fn.popover) throw new Error('Actions requires popover.js');

    Actions.prototype.init = function (elements, actions) {
        var lastItemID;

        $('body').click(function (event) {
            var $target      = $(event.target),
                selector     = elements instanceof jQuery ? elements.selector : elements,
                $item        = $target.closest(selector),
                $actionsMenu = $('#actions-menu');

            $actionsMenu.remove();

            if ($item.length > 0 && $item.data('actions-id') != lastItemID) {
                var itemID = $item.data('actions-id');

                $actionsMenu = $('<ul/>')
                    .attr('id', 'actions-menu')
                    .addClass('dropdown-menu')
                    .css({
                        'display':  'none',
                        'position': 'absolute',
                        'top':      '0',
                        'left':     '0'
                    });

                $actionsMenu.appendTo('body');

                $.each(actions, function (i, action) {
                    if ($.inArray(itemID, action.exclude) !== -1) return;

                    var $li = $('<li/>'),
                        $a  = $('<a/>')
                            .attr('href', action.url.replace(/\{id\}/g, itemID))
                            .html(action.title);

                    if (action.confirmation) {
                        $a.attr('onclick', 'return confirm(\'Вы уверены?\')');
                    }

                    $a.appendTo($li);
                    $li.appendTo($actionsMenu);
                });

                var styles = {
                    'top':  event.pageY,
                    'left': event.pageX // maybe `- ($actionsMenu.outerWidth() / 2)`?
                };

                if (styles.left < 10) {
                    styles.left = 10;
                }

                if ($(document).outerWidth() - styles.left - $actionsMenu.outerWidth() < 10) {
                    styles.left = $(document).outerWidth() - $actionsMenu.outerWidth() - 10;
                }

                $actionsMenu
                    .css(styles)
                    .show();

                lastItemID = itemID;
            } else {
                lastItemID = undefined;
            }
        });
    };

    $.Actions = function (elements, actions) {
        return new Actions(elements, actions);
    };

    // ACTIONS PLUGIN DEFINITION
    // =========================

    function Plugin(actions) {
        return new Actions(this, actions);
    }

    $.fn.actions = Plugin;
    $.fn.actions.Constructor = Actions;
}(jQuery));