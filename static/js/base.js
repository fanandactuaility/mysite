/**
 * Created by hekangjia on 16-7-29.
 */

/**
 * 页面加载完成后 立即执行的操作
 */
$(function () {
    // rotate_web();            // 旋转整个页面

    init_side_bar();            // 初始化侧边菜单栏

    auto_refresh_job(60*1000);          // 获取并设置待办工单
    auto_refresh_notice(5*60*1000);          // 获取并设置未读通告
});

/**
 * 初始化标题
 */
function init_title() {
    window.job_count = 0;
    window.set_title_id = setInterval(function () {
        var now_title = document.title;
        var notice_title = '';
        if (now_title != window.title) {
            document.title = window.title;
        } else {
            if (window.job_count > 0) {
                notice_title = "[{0}]个待办工单".format(window.job_count);
                //noinspection JSValidateTypes
                document.title = notice_title;
            }else{
                document.title = window.title;
            }
        }
    }, 1000);
}

/**
 * 自动旋转整个页面
 * @param max_deg
 * @param time
 */
function rotate_web(max_deg, time) {
    max_deg = max_deg || 360;
    time = time || 3000;

    function rotate_body() {
        var right_or_left = Math.round(Math.random() * 1) == 1 ? 1 : -1;
        var deg = Math.round(Math.random() * max_deg) * right_or_left;
        $('body').animate({
            deg: deg
        }, {
            step: function (n, fx) {
                console.log(n);
                $(this).css("transform", "rotate(" + n + "deg)");
            },
            duration: 2000
        });
    }

    rotate_body();
    setInterval(function () {
        rotate_body();
    }, time)
}

/**
 * 打开设置邮箱的modal
 */
function open_set_email(){
    if(window.email_address.indexOf('@')>0){
        window.email_address = window.email_address.split('@')[0];
    }
    $("#bind_email_modal").modal('show');
    $("#bind_email_modal .modal-title").html('设置邮箱：');
    $("#bind_email_modal input#email_address").val(window.email_address);
}

/**
 * 判断邮箱格式是否合法
 * @param email
 * @returns {boolean}
 */
function is_email_valid(email) {
    email = email || '';
    var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
    return reg.test(email);
}

/**
 * 初始化侧边栏，主要是为设置侧边栏的子菜单数目
 */
function init_side_bar() {
    var menu_list = $("aside.main-sidebar .sidebar-menu").find('.treeview');
    for(var i=0; i<menu_list.length; i++){
        var menu = $(menu_list[i]);
        var num_label = menu.find('a span.label');
        if(num_label.length>0){
            var sub_menu_num = menu.find('ul.treeview-menu li').length;
            num_label.html(sub_menu_num);
        }
    }
    $(".hide_js").hide();
}

/**
 * 获取并设置用户的待办工单
 * @param callback
 */
function get_my_duty_job_list(callback) {
    callback = callback || function () {};
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "/homepage/get_duty_job_list/",
        timeout: 10000,
        data: {
            "csrfmiddlewaretoken": getCookie('csrftoken')
        },
        beforeSend: function () {},
        complete: function () {},
        success: function (result) {
            if (result.code != 0) {
                console.log(result.message);
            } else {
                callback(result.result);
            }
        },
        error: function (result) {
            console.log("发生未知错误：" + JSON.stringify(result));
        }
    });
}

/**
 * 填充我的待办工单
 * @param job_list
 */
function set_my_duty_job_list(job_list) {
    job_list = job_list || [];
    var list = $("header #menus li.jobs-menu ul.menu");
    list.html('');
    var job_count = job_list.length || 0;
    window.job_count = job_count;
    var count_span = $("header #menus li.jobs-menu span#job_count");
    if(job_count>0){
        count_span.fadeIn();
        count_span.text(job_count);
    }else{
        count_span.fadeOut();
    }
    for(var i=0; i<job_count; i++){
        var job = job_list[i];
        var job_id = job.id;
        var job_title = job.title;

        var $li = $('<li><a href="/myworkflowjob/handlejob/{0}/"><h3>{1}</h3></a></li>'.format(job_id, job_title));
        list.append($li);
    }
}

/**
 * 自动刷新检查待办工单
 * @param time
 */
function auto_refresh_job(time) {
    time = time || 1000*60;
    window.title = document.title;
    init_title();
    get_my_duty_job_list(set_my_duty_job_list);
    setInterval(function () {
        get_my_duty_job_list(set_my_duty_job_list);
    }, time);         // 每分钟获取刷新一次我的待办工单
}

/**
 * 自动刷新检查未读通告
 * @param time
 */
function auto_refresh_notice(time) {
    time = time || 1000*60*5;
    get_my_notice_list();
    setInterval(function () {
        get_my_notice_list();
    }, time);
}

/**
 * 获取并设置用户的待办工单
 */
function get_my_notice_list() {
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "/homepage/get_notice_list/",
        timeout: 10000,
        data: {
            "csrfmiddlewaretoken": getCookie('csrftoken')
        },
        beforeSend: function () {},
        complete: function () {},
        success: function (result) {
            if (result.code != 0) {
                console.log(result.message);
            } else {
                set_my_notice_list(result.result);
            }
        },
        error: function (result) {
            console.log("发生未知错误：" + JSON.stringify(result));
        }
    });
}

/**
 * 设置未读通知
 * @param notice_list
 */
function set_my_notice_list(notice_list) {
    notice_list = notice_list || [];
    var list = $("header #menus li.notice-menu ul.menu");
    list.html('');
    var notice_count = notice_list.length || 0;
    var count_span = $("header #menus li.notice-menu span#notice_count");
    if(notice_count>0){
        count_span.fadeIn();
        count_span.text(notice_count);
    }else{
        count_span.fadeOut();
    }
    for(var i=0; i<notice_count; i++){
        var notice = notice_list[i];
        var notice_id = notice.id;
        var notice_title = notice.title;

        var $li = $('<li><a href="/sitenotice/noticeview/{0}/"><i class="fa fa-users text-red"></i>{1}</a></li>'.format(notice_id, notice_title));
        list.append($li);
    }
}
