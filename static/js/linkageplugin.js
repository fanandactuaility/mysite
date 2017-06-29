$(document).ready(function(){
	//找到四个下拉框
	var environment = $("#environment");
	var module_name = $(".module_name").children("select");
	$("input:radio[name='environment']").change(function(){
		//1.需要获得当前下拉框的值
		var environment_value = $("#environment").val();
		$.post("/releasemanage/get_jenkins_jobs_by_environment$/",{environment: environment_value},function(data){
			if (jQuery.isEmptyObject(data)) {
				module_name.html("");
				$('#modulelistalert').html("<div style='color:red'>获取模块列表失败,请确认所选环境并确认您有权操作该换</div>");
			} else {
				selecthost1.html("");
				 //解析json数组
				 $.each(data,function(key,value){
					  $("<option value='" + key + "'>" + value + "</option>").appendTo(module_name);
					  $('#modulelistalert').html("");
				  })
			}
	    }, "json");
	});
})
