function queryModuleDAO(defaultProjectId, callBack){
    httpPost(MY_MODULE_URL, {"projectId" : defaultProjectId, "pageSize" : 100}, true, callBack);
}

// 渲染模块列表
function drawModuleDAO(response){
    tip(response, 5, "模块加载成功！");

    var moduleArray = response.data;
    var moduleText = "";
    var firstModuleId;
    for(var i=0 ; i<moduleArray.length; i++){
        var module = moduleArray[i];
        var moduleName =  module.name;
        var moduleId = module.id;
        moduleText += moduleDiv.replace(/ca_moduleId/g,moduleId).replace(/ca_moduleName/g,moduleName);
        // 默认展开第一个模块的接口
        if (i == 0){
            firstModuleId = moduleId;
            moduleText = moduleText.replace("collapse out", "collapse in");
        }
    }
    if (moduleArray.length == 0){
        moduleText = "<div class='pl30 p20 f14 C999'>~ 尚未创建模块 ~</div>"
    }
    $("#modules").html( moduleText );
    if (firstModuleId){
        queryInterfaceDAO(firstModuleId, drawInterfaceDAO, moduleId);
    }
}
