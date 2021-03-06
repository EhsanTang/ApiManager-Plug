/*******网路请求*******/
function queryProjectDAO(callBack) {
    httpPost(MY_PROJECT_URL, {"myself":true, "pageSize": 50}, callBack);
}

// 渲染项目列表方法
function drawProjectDAO(response) {
    tip(response, 5, "项目加载成功！");
    var projectArray = response.data;
    var projectListText = project_list_div;
    for (var i = 0; i < projectArray.length; i++) {
        var project = projectArray[i];
        projectListText += "<li><a href='#' id='id-def-project-id' class='pl10 pr10' " +
            "crap-data-project-name='" + project.name + "' crap-data-project-id='" + project.id+ "'>" + project.name + "</a></li>";
    }
    setHtml(ID_PROJECT_LIST, projectListText);

    var defaultProjectName = getLocalData(DATA_DEF_PROJECT_NAME, -1);
    var defaultProjectId = getLocalData(DATA_DEF_PROJECT_ID, -1);
    if (projectArray.length > 0 && (defaultProjectId == -1 || defaultProjectName == -1)){
        saveLocalData(DATA_DEF_PROJECT_ID, projectArray[1].id);
        saveLocalData(DATA_DEF_PROJECT_NAME, projectArray[1].name);
    }
}