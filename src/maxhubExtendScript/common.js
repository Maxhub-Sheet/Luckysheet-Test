import { luckysheetContainerFocus } from '../utils/util';
import locale from '../locale/locale';
import tooltip from '../global/tooltip';
import Store from '../store';
import { luckysheetextendtable } from '../global/extend';

export function extendCommonInitial() {

    let scaleMinAndScalePlusHtml = `
    <div id="luckysheet-sheets-scaleMin" class="luckysheet-sheets-scale lucky-button-custom">
        <i class="iconfont iconFormToolbar_icon_Shrink"></i>
    </div>
    <div id="luckysheet-sheets-value" class="lucky-button-custom luckysheet-sheets-scale">100%</div>
    <div id="luckysheet-sheets-scalePlus" class="luckysheet-sheets-scale  lucky-button-custom">
        <i class="iconfont iconFormToolbar_icon_Enlarge"></i>
    </div>`;

    let luckysheetSheetsMenuHtml = `
    <div id="luckysheet-sheets-menu" class="luckysheet-sheets-menu lucky-button-custom">
        <i class="iconfont iconFormToolbar_icon_AllForms"></i>
    </div>`;
    $("#luckysheet-sheet-area").append(scaleMinAndScalePlusHtml);
    $("#luckysheet-sheet-area").prepend(luckysheetSheetsMenuHtml);

    $("#luckysheet-sheets-scaleMin").click(function () {
        // alert('点击了缩小按钮');
        $("#luckysheet-zoom-minus").click();
        $("#luckysheet-sheets-value").text($("#luckysheet-zoom-ratioText").text());
    });

    $("#luckysheet-sheets-scalePlus").click(function () {
        // alert('点击了放大按钮');
        $("#luckysheet-zoom-plus").click();
        $("#luckysheet-sheets-value").text($("#luckysheet-zoom-ratioText").text());
    })

    $("#luckysheet-sheets-menu").click(function (e) {
        e.stopPropagation();
        $("#luckysheet-sheets-m").click();
        $("#luckysheet-sheets-menu").find(".iconFormToolbar_icon_AllForms").addClass("activate-style");
        $("#luckysheet-sheet-list .icon").find("i").addClass("iconfont iconicon_nav_tick");
    })

    $("body").click((e) => {
        $("#luckysheet-sheets-menu").find(".iconFormToolbar_icon_AllForms").removeClass("activate-style");
    });

    $("#luckysheet-insert-r-above").click(()=>operationWithRowOrColumn("row","lefttop"));
    $("#luckysheet-insert-r-below").click(()=>operationWithRowOrColumn("row","rightbottom"));
    $("#luckysheet-insert-c-above").click(()=>operationWithRowOrColumn("column","lefttop"));
    $("#luckysheet-insert-c-below").click(()=>operationWithRowOrColumn("column","rightbottom"));
 
    function operationWithRowOrColumn(type,direction){
        $("#luckysheet-rightclick-menu").hide();
        luckysheetContainerFocus();

        const _locale = locale();
        const locale_drag = _locale.drag;
        console.log('Store.luckysheet_select_save',Store.luckysheet_select_save);
        if (Store.luckysheet_select_save.length > 1) {
            if (isEditMode()) {
                console.log("#1")
                alert(locale_drag.noMulti);
            }
            else {
                console.log("#2",locale_drag.noMulti)
                tooltip.info(locale_drag.noMulti, "");
            }
            return;
        }

        console.log("#3")
        let st_index = Store.luckysheet_select_save[0][type][0];
        luckysheetextendtable(type, st_index, 1, direction);
    }
}