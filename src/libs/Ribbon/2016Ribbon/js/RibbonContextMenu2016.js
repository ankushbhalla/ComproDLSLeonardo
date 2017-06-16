'use strict';
namespace("SIMS.Components2016.Common.Ribbon");

SIMS.Components2016.Common.RibbonContextMenu = SIMS.Components.Common.RibbonContextMenu.extend({
//Leonardo Start
    JSONFilePath: {
        excel: "Ribbon/json/contextmenu/excel-menu.json"
    },
    //Leonardo End

    GetMenuIdAndIgnoreFlag: {
        Item: function ($target) {
            var menuId, ignoreCMCall = false;
            var defaultCMDisplacement = 10;

            if ($target.data('contextMenuId')) {
                menuId = $target.data('contextMenuId');
            }

            if (!menuId) {
                var $items = $target.parents(".dropdown-items-wrapper");

                for (var i = 0; i < $items.length; i++) {
                    var $currentItems = $($items[i]);
                    if ($currentItems.data('contextMenuId')) {
                        menuId = $currentItems.data('contextMenuId');
                        break;
                    }
                }
            }

            if (!menuId) {
                ignoreCMCall = true;
            }

            return { menuId: menuId, ignoreCMCall: ignoreCMCall, defaultCMDisplacement: defaultCMDisplacement };
        },

        Control: function ($target) {
            var menuId = "control";

            if ($target.data('contextMenuId')) {
                menuId = $target.data('contextMenuId');
            }

            return { menuId: menuId };
        },

        TitleBar: function ($target) {
            return { menuId: "titlebar" };
        },

        Default: function ($target) {
            return { menuId: "ribbon" };
        }
    }

});
