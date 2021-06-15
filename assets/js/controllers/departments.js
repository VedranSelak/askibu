class Departments {

  constructor(){
    this.questionsList = [];
    this.maxPage;
    this.currentPage = 1;
    this.rows = 5;
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

    this.questionsList = [];

    RestClient.get("api/user/departments/"+department, null, function(data) {
      $("#title").html(data.name);
    });

    RestClient.get("api/semesters", null, function(data) {
      let html = "";
      for(let i=0; i<data.length; i++){
        if (data[i].id == semester) {
          $("#semester-dropdown").html(data[i].level);
        }
        html += `<li><a href="javascript:departments.semesterClicked(${data[i].id})">${data[i].level}</a></li>`;
      }
      $("#dropdown-menu-semesters").html(html);
    });
    let me = this;
    $.ajax({
            url: "api/questions",
            type: "GET",
            data: {
              "department_id":department,
              "semester_id":semester,
              "course_id" : course,
              "order":"%2Bid"
            },
            beforeSend: function(xhr){xhr.setRequestHeader('Authentication', localStorage.getItem("token"));},
            success: function(data) {
              for(var i=0; i<data.length; i++){
                me.questionsList[i] = `<div class='col-lg-12'>
                                      <div class='card bg-grey card-padding card-style text-ligh' style='height: auto;'>
                                        <div class='card-body'>
                                          <h3 class='card-title'>${data[i].subject}</h3>
                                          <h6 class='card-subtitle mb-2 text-muted'>Posted at: ${data[i].posted_at}</h6>
                                          <h6 class='card-subtitle mb-2 text-muted'>Posted by: ${data[i].name}</h6>
                                          <p class='card-text'>${data[i].body}</p>
                                        </div>
                                        <div class="container">
                                          <div class="row">
                                            <div class="col-md-6">
                                              <a onclick='departments.loadAnswers(${data[i].id})' class="pointer" style='text-decoration: none; color:black;'><i class='fa fa-comments'></i>Anwsers</a>
                                            </div>
                                            <div class="col-md-6">
                                              <a onclick="departments.showAnswerForm(${data[i].id})" class="pull-right pointer" style='text-decoration: none; color:black;'>Reply</a>
                                            </div>
                                          </div>
                                        </div>
                                        <div id="add-answer-${data[i].id}" class="container hidden">

                                           <input name="question_id" type="hidden" value="${data[i].id}">
                                           <div class="row">
                                              <input name="body" type="text" class="form-control">
                                           </div>
                                            <div class="row">
                                              <button onclick="departments.addAnswer('#add-answer-${data[i].id}')" class="btn btn-success" type="button">Send</button>
                                            </div>

                                        </div>
                                        <div id='answers-container-${data[i].id}' class="container-fluid hidden">
                                          <div class="row" id='answers-list-${data[i].id}'>

                                          </div>
                                          <div class='row text-center'>
                                            <div class="card-footer"><i class="fa fa-chevron-up pointer" onclick='departments.hideAnswers(${data[i].id})'></i></div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>`;
              }
              if(me.questionsList.length%me.rows == 0) {
                me.maxPage = me.questionsList.length/me.rows;
              } else {
                me.maxPage = Math.floor(me.questionsList.length/me.rows) + 1;
              }
              me.currentPage = 1;
             me.displayQuestions(me.questionsList, "#question-list",me.rows, me.currentPage);
            },
            error: function(jqXHR, textStatus, errorThrown ){
              toastr.error(jqXHR.responseJSON.message);
              console.log(jqXHR);
            }
         });

         $.ajax({
                    url: "api/courses",
                    type: "GET",
                    data: {
                      "semester_id" : semester,
                      "department_id" : department
                    },
                    success: function(data) {
                      let html = "";
                      for(let i=0; i<data.length; i++){
                        if(data[i].id == course){
                          html += `<span class="label label-info mr-1 pointer border-dark" onclick="departments.courseClicked(${data[i].id})">${data[i].name}</span>`;
                        } else {
                          html += `<span class="label label-info mr-1 pointer" onclick="departments.courseClicked(${data[i].id})">${data[i].name}</span>`;
                        }
                      }
                      $("#courses-labels").html(html);
                    },
                    error: function(jqXHR, textStatus, errorThrown ){
                      toastr.error(jqXHR.responseJSON.message);
                      console.log(jqXHR);
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
       $("#ask-question *[name='year_id']").val(semester);

       let data = AskIbuUtils.formToJson($(form));
       console.log(data);
       me.askQuestion(data);
     }
    });

    $(window).on('hashchange', function(e){
      console.log("change");
      me.loadPage();
    });
  }

  displayQuestions(items, wrapper, rowsPerPage, page){
    $(wrapper).html("");
    page--;

    $("#page-number").html("Page " + (page + 1) + " out of " + this.maxPage);

    let start = rowsPerPage * page;
    let end = start + rowsPerPage
    let paginatedItems = items.slice(start, end);

    for(let i=0; i<paginatedItems.length; i++){
      let item = paginatedItems[i];

       $(wrapper).append(item);
    }
  }

  paginate(element){
    let id = element.id;
    if (id == "next"){
      if (this.maxPage >= this.currentPage + 1){
        this.currentPage++;
        this.displayQuestions(this.questionsList, "#question-list", this.rows, this.currentPage);
      }
    } else if (id == "previous"){
      if (this.currentPage - 1 > 0){
        this.currentPage--;
        this.displayQuestions(this.questionsList, "#question-list", this.rows, this.currentPage);
      }
    }
  }

  courseClicked(course_id){
    var url = new URL(window.location);
    console.log(url);
    if(url.search.includes("course")){
      url.searchParams.set("course", course_id);
    } else {
      url.searchParams.append("course", course_id);
    }

    window.history.replaceState(null, null, url.search+"#departments");
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
         console.log(data);
         let text = "";
         for(var i=0; i<data.length; i++){
           text += `<div class='col-lg-12'>
                       <div class='card bg-info card-padding card-style' style='height: auto;'>
                        <div class="card-header">
                          <h6 class='card-subtitle mb-2 text-muted'>Posted by: ${data[i].name}</h6>
                          <h6 class='card-subtitle mb-2 text-muted'>${data[i].posted_at}</h6>
                        </div>
                         <div class='card-body'>
                           <div class="container-fluid">
                              <div class="row">
                                <div class="col-md-10">
                                  <p class='card-text'>${data[i].body}</p>
                                </div>`;
          if(data[i].is_pinned == 1){
              text += `<div id="pin-${data[i].id}" class="col-md-2 green">
              <i onclick='departments.pinned(${data[i].id}, ${data[i].question_id})' class="fa fa-map-pin pointer pull-right"></i>
            </div>`;
          } else {
            text += `<div id="pin-${data[i].id}" class="col-md-2">
            <i onclick='departments.pinned(${data[i].id}, ${data[i].question_id})' class="fa fa-map-pin pointer pull-right"></i>
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
         console.log(jqXHR);
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
            console.log(jqXHR);
          }
        });
  }

  semesterClicked(semester_id){
    let query = window.location.search;
    const urlParams = new URLSearchParams(query);
    if(urlParams.has("semester")){
      urlParams.set("semester", semester_id);
    } else {
      urlParams.append("semester", semester_id);
    }

    if(urlParams.has("course")){
      urlParams.delete("course");
    }

    window.history.replaceState(null, null, "?"+urlParams.toString()+"#departments");
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
           console.log(jqXHR);
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
           console.log(jqXHR);
         }
      });



  }

}
