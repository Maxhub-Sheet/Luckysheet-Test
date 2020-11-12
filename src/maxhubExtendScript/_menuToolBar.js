import locale from '../locale/locale';

/**
 * @param {any} sourceHtml      初始字符串
 * @param {any} findString      查找字符串
 * @param {any} flagChar        标记位字符
 * @param {any} insertContent   插入字符串
 * @returns {any}               结果字符串
 */
function findAndReplace(sourceHtml,findString,flagChar,insertContent){
    let idx = sourceHtml.lastIndexOf(flagChar,sourceHtml.indexOf(findString));
    return idx !== 1?sourceHtml.substr(0,idx) + insertContent + sourceHtml.substr(idx):sourceHtml;
}

export function _menuToolBar(menuToolBarHtml){
    const toolbar = locale().toolbar;

    /* 对DOM标签进行扩展和调整 */

    //  插入竖线分隔符
    let html = findAndReplace(menuToolBarHtml,`id="luckysheet-icon-paintformat"`,"<",`<div id="toolbar-separator-redo" class="luckysheet-toolbar-separator luckysheet-inline-block" style="user-select: none;"></div>`);
    // 拼接新的工具菜单

    html += `<div class="luckysheet-toolbar-button-split-left luckysheet-toolbar-button luckysheet-inline-block"
    data-tips="${toolbar.insertRow}" id="luckysheet-add-row" role="button" style="user-select: none;">
        <div class="luckysheet-toolbar-button-outer-box luckysheet-inline-block"
        style="user-select: none;">
            <div class="luckysheet-toolbar-menu-button-inner-box luckysheet-inline-block"
            style="user-select: none;">
                <div class="luckysheet-toolbar-menu-button-caption luckysheet-inline-block"
                style="user-select: none;">
                    <div class="luckysheet-icon luckysheet-inline-block " style="user-select: none;">
                        <div aria-hidden="true" class="luckysheet-icon-img-container luckysheet-icon-img luckysheet-icon-rotation-none iconfont iconicon_formeditor_toolbar_AddRow"
                        style="user-select: none;">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="luckysheet-toolbar-button-split-left luckysheet-toolbar-button luckysheet-inline-block"
    data-tips="${toolbar.insertColumn}" id="luckysheet-add-column" role="button" style="user-select: none;">
        <div class="luckysheet-toolbar-button-outer-box luckysheet-inline-block"
        style="user-select: none;">
            <div class="luckysheet-toolbar-menu-button-inner-box luckysheet-inline-block"
            style="user-select: none;">
                <div class="luckysheet-toolbar-menu-button-caption luckysheet-inline-block"
                style="user-select: none;">
                    <div class="luckysheet-icon luckysheet-inline-block " style="user-select: none;">
                        <div aria-hidden="true" class="luckysheet-icon-img-container luckysheet-icon-img luckysheet-icon-rotation-none iconfont iconicon_formeditor_toolbar_AddAddColumn"
                        style="user-select: none;">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
    return html;
}