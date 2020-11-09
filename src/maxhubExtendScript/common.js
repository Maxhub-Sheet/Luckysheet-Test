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
}


