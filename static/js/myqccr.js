/**
 * Created by wangfei on 2015/11/7.
 */
function getCookie(name) {
            var cookieValue = null;
            if (document.cookie && document.cookie != '') {
                var cookies = document.cookie.split(';');
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = jQuery.trim(cookies[i]);
                    // Does this cookie string begin with the name we want?
                    if (cookie.substring(0, name.length + 1) == (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }

// Cross-browser event handlers.
function addEvent(obj, evType, fn) {
    if (obj.addEventListener) {
        obj.addEventListener(evType, fn, false);
        return true;
    } else if (obj.attachEvent) {
        var r = obj.attachEvent("on" + evType, fn);
        return r;
    } else {
        return false;
    }
}

function search_user_id(selector){
    selector = selector || '.user-select';
    $(selector).select2({
        minimumInputLength: 1,   //至少输入n个字符，才去加载数据
        allowClear: true,  //是否允许用户清除文本信息
        delay: 500,
        formatInputTooShort: "请输入用户名",
        formatNoMatches: "没有匹配的用户",
        formatSearching: "查询中...",
        ajax: {
            url: "/account/search_user_for_select2/",
            dataType: "json",
            type: "POST",
            data: function (params) {
                return {
                    term: params.term, // search term
                    page: params.page
                };
            },
            processResults: function (data, params) {
                params.page = params.page || 1;
                return {
                    results: data
                };
            },
            cache: true
        },
        templateResult: format_search_result,
        templateSelection: format_selected_option
    });

    function format_selected_option(data, container) {
        // console.log(data, container);
        if(data.chinese_name && data.dept__name){
            return data.chinese_name + ' - ' + data.dept__name;
        }else{
            return data.text
        }

    }

    function format_search_result(result) {
        if (!result.id) { return result.text; }
        var $result = $(
            '<span> ' + result.chinese_name + ' - ' + result.dept__name + '</span>'
        );
        return $result;
    }
}

function format_html(content) {
    return content.replace(/\n/g, '<br/>')
        .replace(/&/g, "&gt;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/ /g, "&nbsp;")
        .replace(/\'/g, "&#39;")
        .replace(/\"/g, "&quot;");
}

//判断当前字符串是否以str开始 先判断是否存在function是避免和js原生方法冲突，自定义方法的效率不如原生的高
if (typeof String.prototype.startsWith != 'function') {
    String.prototype.startsWith = function (str){
        return this.slice(0, str.length) == str;
    };
}
　　　　
//判断当前字符串是否以str结束
if (typeof String.prototype.endsWith != 'function') {
    String.prototype.endsWith = function (str){
        return this.slice(-str.length) == str;
    };
}

// 弹出等待中提示框
function message_loading(text){
    swal({
        title: "",
        text: text,
        imageUrl: "/static/image/reload.gif",
        showCancelButton: false,
        showConfirmButton: false,
    });
}

/**
 * 用JS实现用 字符串 替换 占位符;
 * alert("http://{0}/{1}".format("www.songyanjun.net", "index.html"));
 * @returns {String}
 */
String.prototype.format=function() {
  if(arguments.length==0) return this;
  for(var s=this, i=0; i<arguments.length; i++)
    s=s.replace(new RegExp("\\{"+i+"\\}","g"), arguments[i]);
  return s;
};

/**
 * 页面弹出提示框
 * @param text
 * @param options
 */
function notice(text, options) {
    text = text || '';
    options = options || {};
    var layout = options.layout || 'topRight';
    var type = options.type || 'warning';
    var timeout = options.timeout || false;
    if(text!='') {
        noty({
            text: text,
            layout: layout,
            type: type,
            animation: {
                open: {height: 'toggle'}, // jQuery animate function property object
                close: {height: 'toggle'}, // jQuery animate function property object
                easing: 'swing', // easing
                speed: 500 // opening & closing animation speed
            },
            timeout: timeout,
            maxVisible: 100
        });
    }
}
