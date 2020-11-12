import Store from '../store';
import editor from '../global/editor';
import { hideMenuByCancel } from '../global/cursorPos';
import { replaceHtml, mouseclickposition, luckysheetContainerFocus } from '../utils/util';

/* 对表格的工具栏模块进行扩展 */
export function _menuButtonInitExtend(ctx) {
    let _this = ctx;
    
    //插入行
    $("#luckysheet-add-row").mousedown(function (e) {
        hideMenuByCancel(e);
        e.stopPropagation();
    }).click(function () {
        let menuButtonId = "luckysheet-add-row";
        let $menuButton = $("#" + menuButtonId);
        if ($menuButton.length == 0) {
            let itemset = _this.createButtonMenu(["在上方插入一行","在下方插入一行"]);
            let menu = replaceHtml(_this.menu, { "id": "insert-row", "item": itemset, "subclass": "", "sub": "" });
            console.log('menu',menu);
            $("body").append(menu);
            $menuButton = $("#" + menuButtonId).width(200);
            _this.focus($menuButton);

            // $menuButton.on("click", ".luckysheet-cols-menuitem", function () {
            //     $menuButton.hide();
            //     luckysheetContainerFocus();

            //     let $t = $(this), itemvalue = $t.attr("itemvalue"), itemname = $t.attr("itemname");
            //     _this.focus($menuButton, itemvalue);
            //     $("#luckysheet-icon-font-family").find(".luckysheet-toolbar-menu-button-caption").html(" " + itemname + " ");

            //     let d = editor.deepCopyFlowData(Store.flowdata);

            //     _this.updateFormat(d, "ff", itemvalue);
            // });
        }

        let userlen = $(this).outerWidth();
        let tlen = $menuButton.outerWidth();

        let menuleft = $(this).offset().left;
        if (tlen > userlen && (tlen + menuleft) > $("#" + Store.container).width()) {
            menuleft = menuleft - tlen + userlen;
        }
        mouseclickposition($menuButton, menuleft, $(this).offset().top + 25, "lefttop");
    });

}