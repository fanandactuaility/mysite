/**
 * Created by hekangjia on 16-4-1.
 */

/**
 * 全选/全不选模块列表
 */
function check_all_module(this_dom) {
    var btn_name = $(this_dom).html().trim();
    var is_check;
    if(btn_name == '全选中'){
        is_check = true;
        $(this_dom).html('全取消');
    }else{
        is_check = false;
        $(this_dom).html('全选中');
    }
    $('#module_detail_checkbox_div input:not(#check_all)').prop('checked', is_check);
}

/**
 * 格式化新建工单（项目管理）页面
 * @returns {boolean}
 */
function format_create_form_data(){
    var module_detail_data = {"dev": {"module_list": []}, "test": {"module_list": []}};
    var flag = false;
    $('#module_detail_checkbox_div input:checked').each(function () {
        var module_flag_id = this.value;
        if(module_flag_id){
            var module_flag_name = $(this).parent().text().trim();
            module_detail_data['dev']['module_list'].push({
                "module_flag_id": module_flag_id,
                "module_flag_name": module_flag_name
            });
            module_detail_data['test']['module_list'].push({
                "module_flag_id": module_flag_id,
                "module_flag_name": module_flag_name
            });
            flag = true;
        }
    });
    // console.log(module_detail_data);
    $("#module_detail").val(JSON.stringify(module_detail_data));

    var product_list_select = $("select#id_product_list");
    var product_list_input = $("input[name='product_list']");
    if(product_list_select.length > 0){
        product_list_input.val(JSON.stringify(product_list_select.val()));
    }

    if(!flag){
        alert("模块详情不能为空！");
    }
    return flag;
}

/**
 * 格式化处理工单（项目管理）页面
 * @returns {boolean}
 */
function format_handle_form_data(action_id){
    var module_detail_data = {"dev": {"module_list": []}, "test": {"module_list": []}};
    var insert_env_data = function (env) {
        var flag = true;
        $('#module_detail + div #'+env+'_collapse tbody tr').each(function () {
            var $this = $(this);
            $this.removeClass('danger');
            var module_flag_id = $this.attr('class');
            var module_flag_name = $this.find('.module_name').html();
            var svn_branch = $this.find('.svn_branch').val() || '';
            var leader = $this.find('.leader').val() || [];
            var related = $this.find('.related').val() || [];
            var back_times = $this.find('.back_times').html() || 0;
            var deploy_server = [];
            if($this.find('select.deploy_server').length > 0){
                // 如果含有select形式的deploy_server
                $this.find('select.deploy_server option:selected').each(function () {
                    var server_option = $(this);
                    var server_id = server_option.val();
                    var server_ip = server_option.text().trim();
                    // deploy_server.push({"server_id": server_id, "server_ip": server_ip})
                    deploy_server.push(server_ip)
                });
                // var deploy_server = $this.find('.deploy_server').val() || [];
            }else{
                // 否则就是input形式的deploy_server
                var deploy_server_str = $this.find('input.deploy_server').val().trim();
                if(deploy_server_str != ''){
                    deploy_server = deploy_server_str.split(',');
                }
            }
            // 429指的是在运维处理环节，运维点击的“环境分配完成”操作, 736也是
            if(env == 'dev'){
                if((action_id == 429 || action_id == 736) && (svn_branch.trim() == '')){
                    flag = false;
                    alert('分支名不能为空');
                }
                if((action_id == 429 || action_id == 736) && (deploy_server.length == 0)){
                    flag = false;
                    alert('部署服务器不能为空');
                }
                if((action_id == 429 || action_id == 736) && (leader.length==0)){
                    flag = false;
                    alert(env+'环境的'+module_flag_name+'的leader不能为空');
                }
            }

            module_detail_data[env]['module_list'].push({
                "module_flag_id": module_flag_id,
                "module_flag_name": module_flag_name,
                "svn_branch": svn_branch,
                "deploy_server": deploy_server.join(','),
                "leader": leader,
                "related": related,
                "back_times": back_times
            });
        });

        var db_ip = $('#module_detail + div #'+env+'_collapse input.db_ip').val();
        var redis_ip = $('#module_detail + div #'+env+'_collapse input.redis_ip').val();
        module_detail_data[env]['db_ip'] = db_ip;
        module_detail_data[env]['redis_ip'] = redis_ip;

        var cate_server = {};
        $('#module_detail + div #'+env+'_collapse select.cate_server').each(function(){
            var cate_id_list = JSON.parse($(this).attr("data-cate"));
            var server_ip = $(this).val();
            if(server_ip && server_ip != ""){
                for(var i=0; i<cate_id_list.length; i++){
                    var cate_id = cate_id_list[i];
                    cate_server[cate_id] = server_ip;
                }
            }
        });
        module_detail_data[env]["cate_server"] = cate_server;
        return flag;
    };
    var flag_dev = insert_env_data('dev');
    var flag_test = insert_env_data('test');
    if(!flag_dev || !flag_test){
        return false;
    }
    // console.log(module_detail_data);
    $("#module_detail").val(JSON.stringify(module_detail_data));

    var product_list_select = $("select#id_product_list");
    var product_list_input = $("input[name='product_list']");
    if(product_list_select.length > 0){
        product_list_input.val(JSON.stringify(product_list_select.val()));
    }
    return true;
}

/**
 * 运维分配环境页，批量分配ip的select改变之后需要做的事
 * @param this_dom
 * @param cate_id_list
 * @param env
 */
function change_server(this_dom, cate_id_list, env) {
    var cate_selector_list = [];
    for(var i=0; i<cate_id_list.length; i++){
        cate_selector_list.push('[cate_id='+cate_id_list[i]+']');
    }
    var module_tr_list = $('#'+env+'_collapse tbody').find(cate_selector_list.join(','));
    module_tr_list.each(function () {
        var $tr = $(this);
        $tr.find('input.deploy_server').val(this_dom.value);
    });
}
