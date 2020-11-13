import Store from '../store';
import editor from '../global/editor';
import { hideMenuByCancel } from '../global/cursorPos';
import { replaceHtml, mouseclickposition, luckysheetContainerFocus } from '../utils/util';
import {operationWithRowOrColumn} from './common';

/* 对表格的工具栏模块进行扩展 */
export function _menuButtonInitExtend(ctx) {
    let _this = ctx;
    
    //插入行
    $("#luckysheet-icon-add-row").mousedown(function (e) {
        hideMenuByCancel(e);
        e.stopPropagation();
    }).click(function () {
        let menuButtonId = $(this).attr("id")+"-menuButton";
        let $menuButton = $("#"+menuButtonId);
        if($menuButton.length == 0){
            let optionList = [
                { "text": "在上方插入一行", "value": "lefttop", "example": "" ,"index":0,},
                { "text": "在下方插入一行", "value": "rightbottom", "example": "" ,"index":1}];
            
            let itemset = _this.createButtonMenu(optionList);
            let menu = $(replaceHtml(_this.menu, {"id": "add-row", "item": itemset, "subclass": "", "sub": ""}));
            $("body").append(menu.find(".icon").remove().end());
            
            $menuButton = $("#"+menuButtonId).width(120);
            _this.focus($menuButton);

            $menuButton.on("click", ".luckysheet-cols-menuitem", function(){
                console.log('执行插入行的操作')
                $menuButton.hide();
                luckysheetContainerFocus();
                operationWithRowOrColumn("row",$t.attr("itemvalue"));
               
                // _this.focus($menuButton, itemvalue);
                // $("#luckysheet-icon-font-family").find(".luckysheet-toolbar-menu-button-caption").html(" "+ itemname +" ");

                // let d = editor.deepCopyFlowData(Store.flowdata);

                // _this.updateFormat(d, "ff", itemvalue);
            });
        }

        let userlen = $(this).outerWidth();
        let tlen = $menuButton.outerWidth();

        let menuleft = $(this).offset().left;
        if(tlen > userlen && (tlen + menuleft) > $("#" + Store.container).width()){
            menuleft = menuleft - tlen + userlen;
        }
        mouseclickposition($menuButton, menuleft, $(this).offset().top+25, "lefttop");
    });

    $("#luckysheet-icon-add-column").mousedown(function (e) {
        hideMenuByCancel(e);
        e.stopPropagation();
    }).click(function () {
        let menuButtonId = $(this).attr("id")+"-menuButton";
        let $menuButton = $("#"+menuButtonId);
        if($menuButton.length == 0){
            let optionList = [
                { "text": "在左边插入一列", "value": "lefttop", "example": "" ,"index":0},
                { "text": "在右边插入一列", "value": "rightbottom", "example": "" ,"index":1}];
            
            let itemset = _this.createButtonMenu(optionList);
            let menu = $(replaceHtml(_this.menu, {"id": "add-column", "item": itemset, "subclass": "", "sub": ""}));
            $("body").append(menu.find(".icon").remove().end());
            
            $menuButton = $("#"+menuButtonId).width(120);
            _this.focus($menuButton);

            $menuButton.on("click", ".luckysheet-cols-menuitem", function(){
                console.log('插入列的操作');
                $menuButton.hide();
                luckysheetContainerFocus();
                operationWithRowOrColumn("column",$t.attr("itemvalue"));
                // _this.focus($menuButton, itemvalue);
                // $("#luckysheet-icon-font-family").find(".luckysheet-toolbar-menu-button-caption").html(" "+ itemname +" ");
                // let d = editor.deepCopyFlowData(Store.flowdata);
                // _this.updateFormat(d, "ff", itemvalue);
            });
        }

        let userlen = $(this).outerWidth();
        let tlen = $menuButton.outerWidth();

        let menuleft = $(this).offset().left;
        if(tlen > userlen && (tlen + menuleft) > $("#" + Store.container).width()){
            menuleft = menuleft - tlen + userlen;
        }
        mouseclickposition($menuButton, menuleft, $(this).offset().top+25, "lefttop");
    });

}