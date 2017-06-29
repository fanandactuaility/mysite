$(document).ready(function(){
	//找到四个下拉框
	var selectmodule2 = $(".select_module2").children("select");
	selectmodule2.change(function(){
		//1.需要获得当前下拉框的值
		var selectmodule2value = $(selectmodule2).val();
		$.post("/api/releasemanage/getmoduledefaultrpmcfg/v1/",{module_name:selectmodule2value},function(data){
			if  (jQuery.isEmptyObject(data)){
					$("#code_source2").attr("value","");
					$("#code_dstn2").attr("value","");
					$("#base_source2").attr("value","");
					$("#base_dstn2").attr("value","");
					$("#cfg_source2").attr("value","");
					$("#cfg_dstn2").attr("value","");
			}
            else{
                $("#code_source2").attr("value",data[0]);
					$("#code_dstn2").attr("value",data[1]);
					$("#base_source2").attr("value",data[2]);
					$("#base_dstn2").attr("value",data[3]);
					$("#cfg_source2").attr("value",data[4]);
					$("#cfg_dstn2").attr("value",data[5]);
            }
		},"json");
	});
})
