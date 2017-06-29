
$("#mongodb_server").change(function () {
    var mongo_server_id = $(this).val();
    var db_name=document.getElementById("mongodb_name");
    var selectOptions = db_name.options;
    var optionLength = selectOptions.length;

    for (var j = 0; j < optionLength; j++) {
        db_name.removeChild(selectOptions[0]);
    }

    db_name[0] = new Option("");
    $("#mongodb_name").val('');

    if (mongo_server_id != "") {
        $.post("/myworkflowjob/mongoserverselect/", {mongo_server_id: mongo_server_id, 'csrfmiddlewaretoken':getCookie('csrftoken')},function(data){
            var mongo_db_list = data.mongo_db_list;

            if (mongo_db_list.length) {
                for (var i=0; i<mongo_db_list.length; i++) {
                    db_name[i] = new Option(mongo_db_list[i]);
                }
            }
        }, "json")
    }
}).change();