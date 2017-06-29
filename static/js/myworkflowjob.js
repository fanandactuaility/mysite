
$(document).ready(function(){
    //找到四个下拉框
    var Type1Select = $(".Type1").children("select");
    var Type2Select = $(".Type2").children("select");
    var Type3Select = $(".Type3").children("select");
    var Type4Select = $(".Type4").children("select");

    function getJobType (type_id) {
        $.post("/myworkflowjob/getjobtype/", {type_id: type_id, 'csrfmiddlewaretoken':getCookie('csrftoken')},
          function(data){
            if (Object.keys(data).length && data.desc) {
              $("#type_desc_div").show();
              $("#job_type_desc").html(data.desc);
            } else {
              $("#type_desc_div").hide();
            }
        }, "json");
    };


    function getSearchJobType (type_id) {
        $.post("/myworkflowjob/getjobtype/", {type_id: type_id, 'csrfmiddlewaretoken':getCookie('csrftoken')},
            function(data){
                if (Object.keys(data).length && data.desc) {
                  $(".type_desc_div").show();
                  $(".job_type_desc").html(data.desc);
                } else {
                  $(".type_desc_div").hide();
            }
        }, "json");
    };

    $('.searchJobType').select2({
      placeholder: "选择工单类型, 可输入名字查询",
    });

    $('.searchJobType').change(function () {
        var type_id = $('.searchJobType').val()
        if (type_id) {
            getSearchJobType(type_id)
        };
    })

    Type1Select.change(function(){
        //1.需要获得当前下拉框的值
        var Type1Value = $(this).val();
        //第一个有变化隐藏第三个
        
        Type2Select.parent().hide();
        Type3Select.parent().hide();
        Type4Select.parent().hide();
        Type4Select.html("");
        Type3Select.html("");
        Type2Select.html("");
        if (Type1Value != "") {
            if (!Type1Select.data(Type1Value)) {
                $.post("/myworkflowjob/jobtypeselect/",{parent_type_id: Type1Value, type: "type1", 'csrfmiddlewaretoken':getCookie('csrftoken')},function(data){
                    var type_id_name_list = data.type_id_name_list;
                    if (Object.keys(type_id_name_list).length) {
                        Type2Select.html("");
                        $("<option value=''>选择二级类型</option>").appendTo(Type2Select);
                         //解析json数组
                         $.each(type_id_name_list, function(key,value){
                              $("<option value='" + value[0] + "'>" + value[1] + "</option>").appendTo(Type2Select);
                          })
                        Type2Select.parent().show();
                        Type1Select.next().show();
                        $("#type_desc_div").hide();
                    } else {
                        Type2Select.parent().hide();
                        Type1Select.next().hide();
                        getJobType(Type1Value);
                    }
                    Type1Select.data(Type1Value, type_id_name_list);
                }, "json");

            } else {
                var type_id_name_list = Type1Select.data(Type1Value);
                if (Object.keys(type_id_name_list).length) {
                    Type2Select.html("");
                    $("<option value=''>选择二级类型</option>").appendTo(Type2Select);
                    $.each(type_id_name_list,function(key,value){
                        $("<option value='" + value[0] + "'>" + value[1] + "</option>").appendTo(Type2Select);
                    })
                    Type2Select.parent().show();
                    Type1Select.next().show();
                    $("#type_desc_div").hide();
                } else {
                    Type2Select.parent().hide();
                    Type1Select.next().hide();
                    getJobType(Type1Value);
                }
            }
        } else {
            Type2Select.parent().hide();
            Type1Select.next().hide();
            $("#type_desc_div").hide();

        }
    });

    Type2Select.change(function(){
        //1.需要获得当前下拉框的值
        var Type2Value = $(this).val();
        Type3Select.parent().hide();
        Type4Select.parent().hide();
        Type4Select.html("");
        Type3Select.html("");

        if (Type2Value != "") {
            if (!Type2Select.data(Type2Value)) {
                $.post("/myworkflowjob/jobtypeselect/",{parent_type_id: Type2Value, type: "type2", 'csrfmiddlewaretoken':getCookie('csrftoken')},function(data){
                    var type_id_name_list = data.type_id_name_list;
                    if (Object.keys(type_id_name_list).length) {
                        Type3Select.html("");
                        $("<option value=''>选择三级类型</option>").appendTo(Type3Select);
                        $.each(type_id_name_list,function(key,value){
                            $("<option value='" + value[0] + "'>" + value[1] + "</option>").appendTo(Type3Select);
                        })
                        Type3Select.parent().show();
                        Type2Select.next().show();
                        $("#type_desc_div").hide();
                    } else {    
                        Type3Select.parent().hide();
                        Type2Select.next().hide();
                        getJobType(Type2Value);
                    }
                    Type2Select.data(Type2Value, type_id_name_list);
                }, "json");
            } else {
                var type_id_name_list = Type2Select.data(Type2Value);
                if (Object.keys(type_id_name_list).length) {
                    Type3Select.html("");
                    $("<option value=''>选择三级类型</option>").appendTo(Type3Select);
                    $.each(type_id_name_list,function(key,value){
                              $("<option value='" + value[0] + "'>" + value[1] + "</option>").appendTo(Type3Select);
                     })
                    Type3Select.parent().show();
                    Type2Select.next().show();
                    $("#type_desc_div").hide();
                } else {
                    Type3Select.parent().hide();
                    Type2Select.next().hide();
                    getJobType(Type2Value);
                }
            }
        } else {
            Type3Select.parent().hide();
            Type2Select.next().hide();
            $("#type_desc_div").hide();

        }
    });

    Type3Select.change(function(){
        var Type3Value = $(this).val();

        if (Type3Value != "") {
            if (!Type3Select.data(Type3Value)) {
                $.post("/myworkflowjob/jobtypeselect/",{parent_type_id: Type3Value, type: "type3",'csrfmiddlewaretoken':getCookie('csrftoken')},function(data){
                    var type_id_name_list = data.type_id_name_list;
                    if (Object.keys(type_id_name_list).length) {
                        Type4Select.html("");
                        $("<option value=''>选择四级类型</option>").appendTo(Type4Select);
                        $.each(type_id_name_list,function(key,value){
                            $("<option value='" + value[0] + "'>" + value[1] + "</option>").appendTo(Type4Select);
                        })
                        Type4Select.parent().show();
                        Type3Select.next().show();
                        $("#type_desc_div").hide();
                    } else {
                        Type4Select.parent().hide();
                        Type3Select.next().hide();
                        getJobType(Type3Value);
                    }
                    Type3Select.data(Type3Value, type_id_name_list);
                }, "json");
            } else {
                var type_id_name_list = Type3Select.data(Type3Value);
                if (Object.keys(type_id_name_list).length) {
                    Type4Select.html("");
                    $("<option value=''>选择四级类型</option>").appendTo(Type4Select);
                    $.each(type_id_name_list,function(key,value){
                        $("<option value='" + value[0] + "'>" + value[1] + "</option>").appendTo(Type4Select);
                    })
                    Type4Select.parent().show();
                    Type3Select.next().show();
                    $("#type_desc_div").hide();
                } else {
                    Type4Select.parent().hide();
                    Type3Select.next().hide();
                    getJobType(Type3Value);
                }
            }
        } else {
            Type4Select.parent().hide();
            Type3Select.next().hide();
            $("#type_desc_div").hide();
        }
    });

    Type4Select.change(function () {
        getJobType($(this).val());
    })

    $("#CHECK").click( function (){
        var Type1Valuenew = Type1Select.val();
        var Type2Valuenew = Type2Select.val();
        var Type3Valuenew = Type3Select.val();
        var Type4Valuenew = Type4Select.val();

        if (Type1Valuenew==""){
            alert("请选择顶级工单类型，如果没有合适的类型，请联系管理员");
            $(Type1Select).focus();
        return false;}

        if (Type2Valuenew==""){
            alert("请选择二级类型，如果没有合适的类型，请联系管理员");
            document.init_new_job.type2.focus();
        return false;}

        if (Type3Valuenew==""){
            alert("请选择三级类型，如果没有合适的类型，请联系管理员");
            document.init_new_job.type3.focus();
        return false;}

        if (Type4Valuenew==""){
            alert("请选择四级类型，如果没有合适的类型，请联系管理员");
            document.init_new_job.type4.focus();
        return false;}        
    });

    $(".searchSubmit").click( function (){
        var type_id = $('.searchJobType').val()

        if (!type_id){
            alert("请选择工单类型，如果没有合适的类型，请联系管理员");
            return false;
        }
    });

    var myDate = new Date();
    $('#query_start_time, #query_end_time').datetimepicker({}).on('changeDate', function(e){
        $(this).datetimepicker('hide');
    });

    $.fn.datepicker.defaults.format = "yyyy-mm-dd";
    $(".query_start_time, .query_end_time")
        .datepicker({}).on('changeDate', function(e){
        $(this).datepicker('hide');
    });
    $.fn.datepicker.defaults.startDate = myDate;
    $("#id_expected_date, #id_start_date, #id_start_test_date, #id_merge_trunk_date, #id_pre_date, #id_online_date, .query_start_time, .query_end_time")
        .datepicker({}).on('changeDate', function(e){
        $(this).datepicker('hide');
    });

    $('#query_job_type').select2({
      placeholder: "选择类型, 可输入名字查询",
    });

    function getUserList(){
      $.ajax({
        type: "POST",
        dataType:"json",
        url: "/myworkflowjob/getuserlist/",
        data: {'csrfmiddlewaretoken':getCookie('csrftoken')},
        success: function(data){
          if(data){
            $.map(data, function (key, value) {
              var option = "<option value='" + value + "'>" + key + "</option>";
              $('#id_mail_to_str').append(option);
            })
          }
          else{
            alert("获取用户失败");
          }
        }
      });
    }

    if ($("#id_mail_to_str").length>0) {
      $('.id_mail_to_str').select2({
        placeholder: "选择收件人, 可输入名字查询",
      });
      
      // 用户较多，所以渲染后加载用户
      getUserList();
    };

    function getUserIdList(){
      $.ajax({
        type: "POST",
        dataType:"json",
        url: "/myworkflowjob/getuseridlist/",
        data: {'csrfmiddlewaretoken':getCookie('csrftoken')},
        success: function(data){
          if(data){
            $.map(data, function (key, value) {
              var option = "<option value='" + value + "'>" + key + "</option>";
              $('#query_creater').append(option);
            })
          }
          else{
            alert("获取用户失败");
          }
        }
      });
    }

    if ($('#query_creater').length>0) {
      $('#query_creater').select2({
        placeholder: "选择创建人名字, 输入查询",
      });

      // 用户较多，所以渲染后加载用户
      getUserIdList()
    };
})
