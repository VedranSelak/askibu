class Questions {

  static init(){
    $("#add-question").validate({
     submitHandler: function(form, event) {
       event.preventDefault();
       let data = AskIbuUtils.formToJson($(form));

      if (data.id){
        Questions.update(data);
      }else{
        Questions.add(data);
      }
     }
    });

    Questions.getAll();
  }

  static getAll(){
    $("#question-table").dataTable({
      processing: true,
      serverSide: true,
      bDestroy: true,
      preDrawCallback: function( settings ) {
        settings._iRecordsTotal = 100;
        settings._iRecordsDisplay = 100;
        console.log(settings);
      },
      paginationType: "simple",
      ajax: {
        url: "api/user/question",
        type: "GET",
        beforeSend: function(xhr){xhr.setRequestHeader('Authentication', localStorage.getItem("token"));},
        data: function ( d ) {
            d.offset = d.start;
            d.limit = d.length;
            d.search = d.search.value;
            d.order = encodeURIComponent((d.order[0].dir == 'asc' ? "-" : "+")+d.columns[d.order[0].column].data);

            delete d.start;
            delete d.lenght;
            delete d.columns;
            delete d.draw;
            console.log(d);
        },

      },
      columns: [
        {"data" : "id",
        "render": function ( data, type, row, meta ) {
                  return '<span class="badge">'+data+'</span><a class="pull-right" style="font-size: 15px; cursor: pointer;" onclick="Questions.preEdit('+data+')"><i class="fa fa-edit"></i></a>';
                }},
        {"data" : "subject"},
        {"data" : "body"},
        {"data" : "department_id"},
        {"data" : "course_id"},
        {"data" : "posted_at"},
        {"data" : "user_id"},
        {"data" : "year_id"}
      ]
    });
  }

  static preEdit(id){
    RestClient.get("api/user/question/"+id, null, function(data){
        AskIbuUtils.dataToForm("#add-question", data);
        $("#add-question-modal").modal("show");
    });
  }

  static add(question) {
      RestClient.post("api/user/question/", question, function(data){
         toastr.success("Question posted successfuly");
         Questions.getAll();
         $("#add-question").trigger("reset");
         $("#add-question-modal").modal("hide");
      });
  }

  static update(question){
    RestClient.put("api/user/question/"+question.id, question, function(data){
        toastr.success("Question was updated!");
        Questions.getAll();
        $("#add-question").trigger("reset");
        $("#add-question *[name='id']").val("");
        $('#add-question-modal').modal("hide");
    });
 }

}
