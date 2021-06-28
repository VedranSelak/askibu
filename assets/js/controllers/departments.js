class Departments {

  constructor(){
    this.rows = 5;
    this.offset = 0;
    this.total;
  }

  loadPage(){
    let query = window.location.search;
    const urlParams = new URLSearchParams(query);
    let department = urlParams.get("department");
    let semester = urlParams.get("semester");
    let course = null;
    if(urlParams.has("course")){
      course = urlParams.get("course");
    }

    RestClient.get("api/user/departments/"+department, null, function(data) {
      $("#title").html(data.name);
    });

    RestClient.get("api/semesters", null, function(data) {
      let html = "";
      for(let i=0; i<data.length; i++){
        if (data[i].id == semester) {
          $("#semester-dropdown").html(data[i].name);
        }
        html += `<li><a href="javascript:departments.semesterClicked(${data[i].id})">${data[i].name}</a></li>`;
      }
      $("#dropdown-menu-semesters").html(html);
    });

    this.loadQuestions(department, semester, course);

   $.ajax({
              url: "api/courses",
              type: "GET",
              data: {
                "semester_id" : semester,
                "department_id" : department
              },
              success: function(data) {
                if(data.length === 0){
                  $("#courses-header").addClass("hidden");
                  $("courses-labels").addClass("hidden");
                } else {
                  $("#courses-header").removeClass("hidden");
                  $("courses-labels").removeClass("hidden");
                }
                let html = "";
                for(let i=0; i<data.length; i++){
                  if(data[i].id == course){
                    html += `<div style="display: inline-block;" class="label label-info m-1 pointer border-dark" onclick="departments.courseClicked(${data[i].id})">${data[i].name}</div>`;
                  } else {
                    html += `<div style="display: inline-block;" class="label label-info m-1 pointer" onclick="departments.courseClicked(${data[i].id})">${data[i].name}</div>`;
                  }
                }
                $("#courses-labels").html(html);
              },
              error: function(jqXHR, textStatus, errorThrown ){
                toastr.error(jqXHR.responseJSON.message);
              }
           });
  }

  init(){
    let me = this;
    $(document).ready(function() {
      me.loadPage();
    });

    $("#ask-question").validate({
     submitHandler: function(form, event) {
       let query = window.location.search;
       event.preventDefault();

       const urlParams = new URLSearchParams(query);
       let department = urlParams.get("department");
       let semester = urlParams.get("semester");
       let course = null;
       if (urlParams.has("course")){
         course = urlParams.get("course");
         $("#ask-question *[name='course_id']").val(course);
       }
       $("#ask-question *[name='department_id']").val(department);
       $("#ask-question *[name='semester_id']").val(semester);

       let data = AskIbuUtils.formToJson($(form));
       me.askQuestion(data);
     }
    });

    $(window).on('hashchange', function(e){
      me.loadPage();
    });

    $(window).on('popstate', function(e){
      me.loadPage();
    });
  }

  loadQuestions(department, semester, course){
    let me = this;
    $.ajax({
            url: "api/questions",
            type: "GET",
            data: {
              "department_id":department,
              "semester_id":semester,
              "course_id" : course,
              "order":"%2Bid",
              "offset": me.offset,
              "limit": me.rows
            },
            beforeSend: function(xhr){xhr.setRequestHeader('Authentication', localStorage.getItem("token"));},
            success: function(data, textStatus, request) {
              if(data.length === 0){
                $("#no-questions-alert").removeClass("hidden");
                $(".pagination-nav").addClass("hidden");
              } else {
                $(".pagination-nav").removeClass("hidden");
                $("#no-questions-alert").addClass("hidden");
              }
              me.total = request.getResponseHeader("total-records");
              let text = "";
              for(var i=0; i<data.length; i++){
                text += `<div class='col-lg-12'>
                                      <div class='card bg-grey card-padding card-style' style='height: auto;'>
                                        <div class='card-body p-1'>
                                          <h3 class='card-title question-subject'>${data[i].subject}</h3>
                                          <h6 class='card-subtitle mb-2 text-muted'><strong>Posted by:</strong> ${data[i].name} ${AskIbuUtils.time(data[i].posted_at)}</h6>
                                          <p class='card-text panel p-1'>${data[i].body}</p>
                                        </div>
                                        <div class="container-fluid p-1">
                                          <div class="row">
                                            <div class="col-md-6 col-sm-6 col-xs-6">
                                              <a onclick='departments.loadAnswers(${data[i].id})' class="pointer load-hide-answers"><i class='fa fa-comments'></i>Anwsers</a>
                                            </div>
                                            <div class="col-md-6 col-sm-6 col-xs-6">
                                              <a id="show-answer-form-${data[i].id}" onclick="departments.showAnswerForm(${data[i].id})" class="pull-right pointer add-answer">+ Add answer</a>
                                            </div>
                                          </div>
                                        </div>

                                        <div id='answers-container-${data[i].id}' class="container-fluid hidden">
                                          <div class="row" id='answers-list-${data[i].id}'>

                                          </div>
                                          <div class='row text-center'>
                                            <div class="card-footer"><i class="fa fa-chevron-up pointer  load-hide-answers" onclick='departments.hideAnswers(${data[i].id})'></i></div>
                                          </div>
                                        </div>
                                        <div id="add-answer-${data[i].id}" class="container-fluid hidden">

                                           <input name="question_id" type="hidden" value="${data[i].id}">
                                           <div class="row m-1">
                                              <textarea name="body" type="text" class="form-control"></textarea>
                                           </div>
                                            <div class="row m-1">
                                              <button onclick="departments.addAnswer('#add-answer-${data[i].id}')" class="btn btn-success" type="button">Send</button>
                                            </div>

                                        </div>
                                      </div>
                                    </div>`;
              }
              $("#question-list").html(text);
              if(me.offset+me.rows >= me.total ){
                $("#next").prop("disabled", true);
              } else {
                $("#next").prop("disabled", false);

              }

              if(me.offset == 0){
                $("#previous").prop("disabled", true);
              } else {
                $("#previous").prop("disabled", false);
              }

              if(me.offset+me.rows > me.total){
                $("#page-number").html("Showing from "+(me.offset+1)+" to "+ me.total + " of " + me.total + " total entries");
              } else {
                $("#page-number").html("Showing from "+(me.offset+1)+" to "+ (me.offset+me.rows) + " of " + me.total + " total entries");
              }
            },
            error: function(jqXHR, textStatus, errorThrown ){
              toastr.error(jqXHR.responseJSON.message);
              e.log(jqXHR);
            }
         });
  }

  paginate(element){
    let id = element.id;
    $("#"+id).prop("disabled", true);
    let query = window.location.search;
    const urlParams = new URLSearchParams(query);
    let department = urlParams.get("department");
    let semester = urlParams.get("semester");
    let course = null;
    if (urlParams.has("course")){
      course = urlParams.get("course");
    }
    if (id == "next"){
      this.offset += this.rows;
      $("#"+id).prop("disabled", false);
      this.loadQuestions(department, semester, course);
    } else if (id == "previous"){
      $("#"+id).prop("disabled", false);
      this.offset -= this.rows;
      this.loadQuestions(department, semester, course);
    }
  }

  courseClicked(course_id){
    var url = new URL(window.location);

    if(url.search.includes("course")){
      url.searchParams.set("course", course_id);
    } else {
      url.searchParams.append("course", course_id);
    }

    window.history.pushState({},'', url);

    this.loadPage();
  }

  hideAnswers(questionId){
    $("#answers-container-"+questionId).addClass("hidden");
  }

  loadAnswers(questionId){
    $.ajax({
       url: "api/user/answers-by-question/"+questionId,
       type: "GET",
       beforeSend: function(xhr){xhr.setRequestHeader('Authentication', localStorage.getItem("token"));},
       data: { "order" : "+is_pinned" },
       success: function(data) {
         let text = "";
         for(var i=0; i<data.length; i++){
           text += `<div class='col-lg-12'>
                       <div class='card bg-white card-padding-s card-style' style='height: auto;'>
                        <div class="card-header">
                          <h6 class='card-subtitle mb-2 text-muted'><strong>Posted by:</strong> ${data[i].name} ${AskIbuUtils.time(data[i].posted_at)}</h6>
                        </div>
                         <div class='card-body'>
                           <div class="container-fluid">
                              <div class="row">
                                <div class="col-md-10 col-sm-10 col-xs-10">
                                  <p class='card-text'>${data[i].body}</p>
                                </div>`;
          if(data[i].is_pinned == 1){
              text += `<div id="pin-${data[i].id}" class="col-md-2 col-sm-2 col-xs-2 green">
              <i onclick='departments.pinned(${data[i].id}, ${data[i].question_id})' class="fa fa-map-pin fa-2x pointer pull-right"></i>
            </div>`;
          } else {
            text += `<div id="pin-${data[i].id}" class="col-md-2 col-sm-2 col-xs-2">
            <i onclick='departments.pinned(${data[i].id}, ${data[i].question_id})' class="fa fa-map-pin fa-2x pointer pull-right"></i>
          </div>`;
          }
          text += `            </div>
                            </div>
                         </div>
                       </div>
                     </div>`;
         }
         try {
           $("#answers-list-"+data[0].question_id).html(text);
           $("#answers-container-"+data[0].question_id).removeClass("hidden");
         } catch(e){
           toastr.error("There is no answers for this question!");
         }
       },
       error: function(jqXHR, textStatus, errorThrown ){
         toastr.error(jqXHR.responseJSON.message);
       }
    });

  }

  askQuestion(question){
    let me = this;
    $.ajax({
           url: "api/user/question",
           type: "POST",
           data: JSON.stringify(question),
           contentType: "application/json",
           beforeSend: function(xhr){xhr.setRequestHeader('Authentication', localStorage.getItem("token"));},
           success: function(data) {
            toastr.success("Question posted successfuly");
            me.loadPage();
            $("#ask-question").trigger("reset");
            $("#ask-question-modal").modal("hide");
          },
          error: function(jqXHR, textStatus, errorThrown){
            toastr.error(jqXHR.responseJSON.message);
          }
        });
  }

  semesterClicked(semester_id){
    var url = new URL(window.location);
    if(url.searchParams.has("semester")){
      url.searchParams.set("semester", semester_id);
    } else {
      url.searchParams.append("semester", semester_id);
    }

    if(url.searchParams.has("course")){
      url.searchParams.delete("course");
    }

    window.history.pushState({},'', url);
    this.loadPage();
  }

  openAskQuestionModal(){
    let query = window.location.search;
    const urlParams = new URLSearchParams(query);
    if (urlParams.has("course")){
      $("#warn-user").addClass("hidden");
    } else {
      $("#warn-user").removeClass("hidden");
    }

    $("#ask-question-modal").modal("show");
  }

  showAnswerForm(question_id){
    $("#add-answer-"+question_id).toggleClass("hidden");
    $("#show-answer-form-"+question_id).toggleClass("active");
    if($("#show-answer-form-"+question_id).hasClass("active")){
      $("#show-answer-form-"+question_id).html("Hide answer form");
    } else {
      $("#show-answer-form-"+question_id).html("+ Add answer");
    }
  }

  addAnswer(selector){
    let question_id = $(selector+" *[name='question_id']").val();
    let body = $(selector+" *[name='body']").val();
    $(selector+" *[name='body']").val("");
    let me = this;
    $.ajax({
         url: "api/user/answer",
         type: "POST",
         beforeSend: function(xhr){xhr.setRequestHeader('Authentication', localStorage.getItem("token"));},
         data: JSON.stringify({
            "body" : body,
            "question_id" : question_id
         }),
         contentType: "application/json",
         success: function(data) {
           toastr.success("Answer added successfuly!");
           me.showAnswerForm(question_id);
           me.loadAnswers(question_id);
         },
         error: function(jqXHR, textStatus, errorThrown ){
           toastr.error(jqXHR.responseJSON.message);
         }
      });
  }

  pinned(answer_id, question_id){
    let value = 0;
    if(!$("#pin-"+answer_id).hasClass("green")){
      value = 1;
    }
    let me = this;
    $.ajax({
         url: "api/user/answer/pin/"+answer_id+"/"+question_id+"/"+value,
         type: "PUT",
         beforeSend: function(xhr){xhr.setRequestHeader('Authentication', localStorage.getItem("token"));},
         contentType: "application/json",
         success: function(data) {
           toastr.success("Pin updated successfuly!");
           me.loadAnswers(question_id);
         },
         error: function(jqXHR, textStatus, errorThrown ){
           toastr.error(jqXHR.responseJSON.message);
         }
      });
  }

}
