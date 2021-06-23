class Account {

  constructor(){
    this.yourQuestionsList = [];
    this.yourAnswersList = [];
    this.maxPageQuestions;
    this.maxPageAnswers;
    this.currentPageQuestions = 1;
    this.currentPageAnswers = 1;
    this.rows = 5;
  }

  init(){
    let me = this;
    $(document).ready(function() {
      me.loadYourQuestions();
      me.loadYourAnswers();
    });
  }

  loadYourQuestions(){
    let me = this;
    $.ajax({
            url: "api/user/question",
            type: "GET",
            data: {
              "order":"%2Bid",
              "limit":100000000
            },
            beforeSend: function(xhr){xhr.setRequestHeader('Authentication', localStorage.getItem("token"));},
            success: function(data) {
              for(var i=0; i<data.length; i++){
                me.yourQuestionsList[i] = `<div class='col-lg-12'>
                                      <div class='card bg-grey card-padding card-style' style='height: auto;'>
                                        <div class='card-body p-1'>
                                          <h3 class='card-title'>${data[i].subject}</h3>
                                          <h6 class='card-subtitle mb-2 text-muted'>Posted at: ${data[i].posted_at}</h6>
                                          <p class='card-text panel p-1'>${data[i].body}</p>
                                        </div>
                                        <div class="container-fluid p-1">
                                          <div class="row">
                                            <div class="col-md-6">
                                              <a onclick='account.loadAnswers(${data[i].id})' class="pointer" style='text-decoration: none; color:black;'><i class='fa fa-comments'></i>Anwsers</a>
                                            </div>
                                            <div class="col-md-6">
                                              <a onclick="account.showAnswerForm(${data[i].id})" class="pull-right pointer" style='text-decoration: none; color:black;'>Reply</a>
                                            </div>
                                          </div>
                                        </div>

                                        <div id='account-answers-container-${data[i].id}' class="container-fluid hidden">
                                          <div class="row" id='account-answers-list-${data[i].id}'>

                                          </div>
                                          <div class='row text-center'>
                                            <div class="card-footer"><i class="fa fa-chevron-up pointer" onclick='account.hideAnswers(${data[i].id})'></i></div>
                                          </div>
                                        </div>
                                        <div id="account-add-answer-${data[i].id}" class="container-fluid hidden">

                                           <input name="question_id" type="hidden" value="${data[i].id}">
                                           <div class="row m-1">
                                              <textarea name="body" type="text" class="form-control"></textarea>
                                           </div>
                                            <div class="row m-1">
                                              <button onclick="account.addAnswer('#account-add-answer-${data[i].id}')" class="btn btn-success" type="button">Send</button>
                                            </div>

                                        </div>
                                      </div>
                                    </div>`;
              }
              if(me.yourQuestionsList.length%me.rows == 0) {
                me.maxPageQuestions = me.yourQuestionsList.length/me.rows;
              } else {
                me.maxPageQuestions = Math.floor(me.yourQuestionsList.length/me.rows) + 1;
              }
              me.currentPageQuestions = 1;
             me.displayQuestions(me.yourQuestionsList, "#account-question-list",me.rows, me.currentPageQuestions);
            },
            error: function(jqXHR, textStatus, errorThrown ){
              toastr.error(jqXHR.responseJSON.message);
              console.log(jqXHR);
            }
         });
  }

  loadYourAnswers(){
    let me = this;
    $.ajax({
            url: "api/user/answer",
            type: "GET",
            data: {
              "order":"+id",
              "limit":100000000
            },
            beforeSend: function(xhr){xhr.setRequestHeader('Authentication', localStorage.getItem("token"));},
            success: function(data) {
              for(var i=0; i<data.length; i++){
                me.yourAnswersList[i] = `<div class='col-lg-12'>
                            <div class='card bg-info card-padding-s card-style' style='height: auto;'>
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
                   me.yourAnswersList[i] += `<div id="pin-${data[i].id}" class="col-md-2 green">
                   <i onclick='departments.pinned(${data[i].id}, ${data[i].question_id})' class="fa fa-map-pin pointer pull-right"></i>
                 </div>`;
               } else {
                 me.yourAnswersList[i] += `<div id="pin-${data[i].id}" class="col-md-2">
                 <i onclick='departments.pinned(${data[i].id}, ${data[i].question_id})' class="fa fa-map-pin pointer pull-right"></i>
               </div>`;
               }
               me.yourAnswersList[i] += `            </div>
                                 </div>
                              </div>
                            </div>
                          </div>`;
              }
              if(me.yourAnswersList.length%me.rows == 0) {
                me.maxPageAnswers = me.yourAnswersList.length/me.rows;
              } else {
                me.maxPageAnswers = Math.floor(me.yourAnswersList.length/me.rows) + 1;
              }
              me.currentPageAnswers = 1;
             me.displayAnswers(me.yourAnswersList, "#account-answers-list",me.rows, me.currentPageAnswers);
            },
            error: function(jqXHR, textStatus, errorThrown ){
              toastr.error(jqXHR.responseJSON.message);
              console.log(jqXHR);
            }
         });
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
                       <div class='card bg-info card-padding-s card-style' style='height: auto;'>
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
           $("#account-answers-list-"+data[0].question_id).html(text);
           $("#account-answers-container-"+data[0].question_id).removeClass("hidden");
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

  hideAnswers(questionId){
    $("#account-answers-container-"+questionId).addClass("hidden");
  }

  showAnswerForm(question_id){
    $("#account-add-answer-"+question_id).toggleClass("hidden");
  }

  displayQuestions(items, wrapper, rowsPerPage, page){
    $(wrapper).html("");
    page--;

    if(this.maxPageQuestions == 0) {
      $(".account-questions-pagination-nav").addClass("hidden");
      $("#account-question-list").addClass("hidden");
      $("#account-no-questions-alert").removeClass("hidden");
      return;
    } else {
      $(".account-questions-pagination-nav").removeClass("hidden");
      $("#account-question-list").removeClass("hidden");
    }

    $("#account-questions-page-number").html("Page " + (page + 1) + " out of " + this.maxPageQuestions);

    let start = rowsPerPage * page;
    let end = start + rowsPerPage
    let paginatedItems = items.slice(start, end);

    for(let i=0; i<paginatedItems.length; i++){
      let item = paginatedItems[i];

       $(wrapper).append(item);
    }
  }

  displayAnswers(items, wrapper, rowsPerPage, page){
    $(wrapper).html("");
    page--;

    if(this.maxPageAnswers == 0) {
      $(".account-answers-pagination-nav").addClass("hidden");
      $("#account-answers-list").addClass("hidden");
      $("#account-no-answers-alert").removeClass("hidden");
      return;
    } else {
      $(".account-answers-pagination-nav").removeClass("hidden");
      $("#account-answers-list").removeClass("hidden");
    }

    $("#account-answers-page-number").html("Page " + (page + 1) + " out of " + this.maxPageAnswers);

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
    if (id == "next-questions"){
      if (this.maxPageQuestions >= this.currentPageQuestions + 1){
        this.currentPageQuestions++;
        this.displayQuestions(this.yourQuestionsList, "#account-question-list", this.rows, this.currentPageQuestions);
      }
    } else if (id == "previous-questions"){
      if (this.currentPageQuestions - 1 > 0){
        this.currentPageQuestions--;
        this.displayQuestions(this.yourQuestionsList, "#account-question-list", this.rows, this.currentPageQuestions);
      }
    } else if (id == "next-answers"){
      if (this.maxPageAnswers >= this.currentPageAnswers + 1){
        this.currentPageAnswers++;
        this.displayAnswers(this.yourAnswersList, "#account-answers-list", this.rows, this.currentPageAnswers);
      }
    } else if (id == "previous-answers"){
      if (this.currentPageAnswers - 1 > 0){
        this.currentPageAnswers--;
        this.displayAnswers(this.yourAnswersList, "#account-answers-list", this.rows, this.currentPageAnswers);
      }
    }
  }

}
