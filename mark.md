原则：
    样式代码：定义新的CSS文件，所有的CSS修改都通过CSS文件来进行覆盖操作(预计两个文件：插件样式扩展  +  核心样式扩展)。
    
1、编辑栏尽量不调整(保持原样)
2、右键菜单自己写(尽量少的代码修改和冲突处理)


createdom.js文件
/* #wdd-0001 工具栏进行了额外的处理 */              
/* #wdd-0002 替换了右键菜单 */
/* #wdd-0003 引入新的模块(扩展的模块总是以_开头) */

locale.js文件
/* #wdd-0004 引入模块，修改和扩展locale配置项*/

menuButton.js文件
/* #wdd-0005-1 添加参数对自定义工具栏的部分操作(插入行和插入列等)进行处理*/
handler.js文件
/* #wdd-0005-2 添加参数对自定义工具栏的部分操作(插入行和插入列等)进行处理*/

问题：locale/locle.js文件中locale()函数中返回的信息需要做必要的修改或添加
范围：可能涉及到多个文件和多种语言
原则：尽量不修改原文件代码
策略：尝试先对中文语言的配置项进行处理，其他语言的处理，如果是文字的修改操作那么就保持原样，如果是新添加操作那么就暂时默认设置为空字符串，后续再进行翻译或补充。
实施：
[1] 当调用locale()的时候能否走我们自己的代码？ 
    实现：新建_locale代码，然后实现函数的替换操作。
    分析：import locale from '../locale/locale'; 代码在多个文件中被引入，如果我们自己写个新的_local模块引入到代码中那么要修改多处，且文件引入模块名不能重名，否则报错：SyntaxError: Identifier 'locale' has already been declared 
    结论：不可行。

[2] 适当的修改源码，植入数据。
    分析：在locale()函数调用的时候，在原本结果的基础上合并自己模块(_locale.js)提供的对象(Object.assign处理逻辑是存在则覆盖，不存在则添加)
    实现：import _loacel from '../maxhubExtendScript/_loacel';
         Object.assign(localeObj[Store.lang],_loacel[Store.lang]);
         在_loacel模块中导出需要处理的对象，注意多语言的情况。
    结论：可行。


         
命名方式：检查名称是否存在

文件夹命名：id + 版本号 

实现逻辑：在打开文件的时候(1)先进行缓存检查如果存在那么就直接打开，(2)如果不存在那么就检查该文件其他版本的缓存是否存在，(3)如果存在那么就删除，然后执行下载操作，下载后进行缓存处理(文件id + 版本号)。



menuButton 中的核心方法：
line:3121 updateFormat(格式更新)->jfrefreshgrid(刷新功能)   

数据传递过程和内容分析
[1] updateFormat(d, attr, foucsStatus)                          
    d:表格最新的所有数据[数组]  
    attr:修改的属性[fc]应该表示字体颜色 
    foucsStatus:状态[#ff0000]应该表示修改的目标值

[2] jfrefreshgrid(d, Store.luckysheet_select_save, allParam )
     d:表格最新的所有数据[数组]  
     allParam:空对象

     Store.luckysheet_select_save:
     第一行第二列 
      [{"left":74,"width":73,"top":0,"height":19,"left_move":74,"width_move":73,"top_move":0,"height_move":19,"row":[0,0],"column":[1,1],"row_focus":0,"column_focus":1}]
     
     第一行第二列 + 第一行第三列
     [{"left":148,"width":73,"top":0,"height":19,"left_move":74,"width_move":147,"top_move":0,"height_move":19,"row":[0,0],"column":[1,2],"row_focus":0,"column_focus":2}]
     
    第一行第二列 + 第二行第二列
    [{"left":74,"width":73,"top":20,"height":19,"left_move":74,"width_move":73,"top_move":0,"height_move":39,"row":[0,1],"column":[1,1],"row_focus":1,"column_focus":1}]
    

     第一行第二列 + 第一行第三列 + 第二行第二列
     [{"left":74,"width":73,"top":0,"height":19,"left_move":74,"width_move":73,"top_move":0,"height_move":19,"row":[0,0],"column":[1,1],"row_focus":0,"column_focus":1},
     {"left":148,"width":73,"top":0,"height":19,"left_move":148,"width_move":73,"top_move":0,"height_move":19,"row":[0,0],"column":[2,2],"row_focus":0,"column_focus":2},
     {"left":74,"width":73,"top":20,"height":19,"left_move":74,"width_move":73,"top_move":20,"height_move":19,"row":[1,1],"column":[1,1],"row_focus":1,"column_focus":1}]

  

  操作数据流(以设置多个单元格的字体为例子)

  [0] $("#luckysheet-icon-font-family").mousedown(function(e){//转到[1]}
  [1] $menuButton.on("click", ".luckysheet-cols-menuitem", function(){ //转到[2] })
  [2] _this.updateFormat(d, attr, foucsStatus);
    参数说明：
     d            表格的全量数据，是一个巨大的对象数组
     attr         操作的类型，ff表示设置字体
     foucsStatus  具体的值
    记录值：
        d:              200[Array]...
        attr:           ff
        foucsStatus:    黑体
     
  [3] this.updateFormatCell(d, attr, foucsStatus, row_st, row_ed, col_st, col_ed) //该方法由updateFormat内部调用
    记录值：
         d:              200[Array]...
         attr:           ff
         foucsStatus:    黑体
         row_st          0
         row_ed          0
         col_st          0
         col_ed          1

  [4] jfrefreshgrid(d, Store.luckysheet_select_save, allParam, false);            //刷新操作
    参数说明：
      d                                 表格的全量数据，是一个巨大的对象数组
      Store.luckysheet_select_save      保存数据
      allParam                          其他参数
      false                             是否单元格数据更新联动
      
    记录值：
        d:                              200[Array]...
        Store.luckysheet_select_save：  [
                                        {   "left":0,
                                            "width":73,
                                            "top":0,
                                            "height":19,
                                            "left_move":0,
                                            "width_move":147,
                                            "top_move":0,
                                            "height_move":19,
                                            "row":[0,0],
                                            "column":[0,1],
                                            "row_focus":0,
                                            "column_focus":0
                                            }]
        allParam：                      {}
        
  [5] Store.jfredo.push({...})          保存操作
  [6] server.historyParam(Store.flowdata, Store.currentSheetIndex, range[s]);     //区分单个单元格更新还是范围单元格更新
    参数说明：
        Store.flowdata              全量数据
        Store.currentSheetIndex     当前工作区
        range[s]                    变动数据
    记录值：
        Store.flowdata          200[Array]...
        Store.currentSheetIndex 0
        range[s]                {
                                    column: (2) [0, 1]
                                    column_focus: 0
                                    height: 19
                                    height_move: 19
                                    left: 0
                                    left_move: 0
                                    row: (2) [0, 0]
                                    row_focus: 0
                                    top: 0
                                    top_move: 0
                                    width: 73
                                    width_move: 147
                                }

  [7] server.saveParam(type, index, value, params)                                //整理数据-msg
    参数说明：
        type                        操作类型
        index                       工作区标识
        value                       值
        params                      参数(数据)
    记录值：
        type：     rv 
        index：    0 
        value：    [
                    {ct: {fa: "General", t: "n"}
                    ff: "黑体"
                    m: "111"
                    v: 111
                    },
                    {ct: {fa: "General", t: "n"}
                    ff: "黑体"
                    m: "222"
                    v: 222
                    }]
        params:{
                    range:
                        column: [0, 1]
                        row:[0, 0]
                }
    必要的数据会被组织到空对象d(let d = {} )中, 数据组装完毕后，进行序列化处理然后通过pako来进行压缩得到最终的msg，通过websocket服务来发送给服务端。
    
    相关代码：
        let d = {};
        d.t = type;
        d.i = index;
        d.v = value;
        //...
        let msg = pako.gzip(encodeURIComponent(JSON.stringify(d)), { to: "string" });
        _this.websocket.send(msg);
    记录值：
        msg1 == {"t":"rv","i":"0","v":[[{"v":111,"ct":{"fa":"General","t":"n"},"m":"111","ff":"黑体"},{"v":222,"ct":{"fa":"General","t":"n"},"m":"222","ff":"黑体"}]],"range":{"row":[0,0],"column":[0,1]}}
        msg2 ==       ­PÑ0ü¼:)}´*û"íhâÜï¯5ºÇÁ árw=ÚRk~P·¹§FÕåþ°l+Xc©X[ DÜ)ãaÆÛàÄåî£On¯óÓHîwx-9a0`-á¶Sòk"uhÿ-HÔp1=¹øð×iyË1ó»J¨ã2½æøµDZjª¹VÄ±  

    第二次发送：{"t":"rv_end","i":"0","v":null}