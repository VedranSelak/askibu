class Account {

  constructor(){
    this.offsetYourQuestions = 0;
    this.totalYourQuestions;

    this.offsetYourAnswers = 0;
    this.totalYourAnswers;

    this.offsetRemovedQuestions = 0;
    this.totalRemovedQuestions;

    this.offsetRemovedAnswers = 0;
    this.totalRemovedAnswers;
    this.rows = 5;
  }

  init(){
    let me = this;
    $(document).ready(function() {
      me.loadYourQuestions();
      me.loadYourAnswers();
      me.loadYourRemovedQuestions();
      me.loadYourRemovedAnswers();
    });

    $("#edit-question").validate({
     submitHandler: function(form, event) {
       event.preventDefault();
       let data = AskIbuUtils.formToJson($(form));
       me.update(data);
     }
    });
  }

  loadYourQuestions(){
    let me = this;
    $.ajax({
            url: "api/user/question",
            type: "GET",
            data: {
              "order":"%2Bid",
              "limit": me.rows,
              "offset" : this.offsetYourQuestions
            },
            beforeSend: function(xhr){xhr.setRequestHeader('Authentication', localStorage.getItem("token"));},
            success: function(data, textStatus, request) {
              let text = "";
              me.totalYourQuestions = request.getResponseHeader("total-records");
              if(request.getResponseHeader("total-records") == 0){
                $(".account-questions-pagination-nav").addClass("hidden");
                $("#account-questions-list").addClass("hidden");
                $("#account-no-questions-alert").removeClass("hidden");
                return;
              } else {
                $(".account-questions-pagination-nav").removeClass("hidden");
                $("#aaccount-questions-list").removeClass("hidden");
              }

              for(var i=0; i<data.length; i++){
                text += `<div class='col-lg-12'>
                                      <div class='card bg-grey card-padding card-style' style='height: auto;'>
                                        <div class='card-body p-1'>
                                        <div class="container-fluid cut-size p-1">
                                          <div class="row">
                                            <div class="col-md-6 col-sm-6 col-xs-6">
                                              <h3 class='card-title question-subject'>${data[i].subject}</h3>
                                            </div>
                                            <div class="col-md-6 col-sm-6 col-xs-6">
                                              <a onclick="account.preEdit(${data[i].id})" class="pull-right pointer edit-link"><i class="fa fa-edit fa-2x"></i></a>
                                            </div>
                                          </div>
                                        </div>
                                          <h6 class='card-subtitle mb-2 text-muted'><strong>Posted</strong> ${AskIbuUtils.time(data[i].posted_at)}</h6>
                                          <p class='card-text panel p-1'>${data[i].body}</p>
                                        </div>
                                        <div class="container-fluid p-1">
                                          <div class="row">
                                            <div class="col-md-6 col-sm-6 col-xs-6">
                                              <a onclick='account.loadAnswers(${data[i].id})' class="pointer load-hide-answers"><i class='fa fa-comments'></i>Anwsers</a>
                                            </div>
                                            <div class="col-md-6 col-sm-6 col-xs-6">
                                              <a id="account-add-answer-show-form-${data[i].id}" onclick="account.showAnswerForm(${data[i].id}, '#account-add-answer-')" class="pull-right pointer add-answer">+ Add answer</a>
                                            </div>
                                          </div>
                                        </div>

                                        <div id='account-answers-container-${data[i].id}' class="container-fluid hidden">
                                          <div class="row" id='account-answers-list-${data[i].id}'>

                                          </div>
                                          <div class='row text-center'>
                                            <div class="card-footer load-hide-answers"><i class="fa fa-chevron-up pointer" onclick='account.hideAnswers(${data[i].id})'></i></div>
                                          </div>
                                        </div>
                                        <div id="account-add-answer-${data[i].id}" class="container-fluid hidden">

                                           <input name="question_id" type="hidden" value="${data[i].id}">
                                           <div class="row m-1">
                                              <textarea name="body" type="text" class="form-control"></textarea>
                                           </div>
                                            <div class="row m-1">
                                              <button onclick="account.addAnswer('#account-add-answer-${data[i].id}', '')" class="btn btn-success" type="button">Send</button>
                                            </div>

                                        </div>
                                      </div>
                                    </div>`;
              }
              $("#account-questions-list").html(text);
              if(me.offsetYourQuestions+me.rows >= me.totalYourQuestions ){
                $("#next-questions").prop("disabled", true);
              } else {
                $("#next-questions").prop("disabled", false);

              }

              if(me.offsetYourQuestions == 0){
                $("#previous-questions").prop("disabled", true);
              } else {
                $("#previous-questions").prop("disabled", false);
              }

              if(me.offsetYourQuestions+me.rows > me.totalYourQuestions){
                $("#account-questions-page-number").html("Showing from "+(me.offsetYourQuestions+1)+" to "+ me.totalYourQuestions + " of " + me.totalYourQuestions + " total entries");
              } else {
                $("#account-questions-page-number").html("Showing from "+(me.offsetYourQuestions+1)+" to "+ (me.offsetYourQuestions+me.rows) + " of " + me.totalYourQuestions + " total entries");
              }
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
              "limit": me.rows,
              "offset" : me.offsetYourAnswers
            },
            beforeSend: function(xhr){xhr.setRequestHeader('Authentication', localStorage.getItem("token"));},
            success: function(data, textStatus, request) {
              let text = "";
              me.totalYourAnswers = request.getResponseHeader("total-records");
              if(request.getResponseHeader("total-records") == 0){
                $(".account-answers-pagination-nav").addClass("hidden");
                $("#account-answers-list").addClass("hidden");
                $("#account-no-answers-alert").removeClass("hidden");
                return;
              } else {
                $(".account-answers-pagination-nav").removeClass("hidden");
                $("#aaccount-answers-list").removeClass("hidden");
              }
              for(var i=0; i<data.length; i++){
                text += `<div class='col-lg-12' id="${data[i].id}-your-answer-${data[i].question_id}">
                            <div class='card bg-while border-blue card-padding-s card-style' style='height: auto;'>
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
                   text += `<div id="account-pin-${data[i].id}" class="col-md-2 col-sm-2 col-xs-2 green">
                   <i class="fa fa-map-pin fa-2x pull-right"></i>
                 </div>`;
               } else {
                 text += `<div id="pin-${data[i].id}" class="col-md-2 col-sm-2 col-xs-2">
                 <i class="fa fa-map-pin fa-2x pull-right"></i>
               </div>`;
               }
               text += `            </div>
                                    <div class="row">
                                      <a onclick="account.loadQuestion(${data[i].question_id}, ${data[i].id})" class="pointer toggling-link pl-1">Load question</a>
                                    </div>
                                 </div>
                              </div>
                            </div>
                          </div>`;
              }
              $("#account-answers-list").html(text);
              if(me.offsetYourAnswers+me.rows >= me.totalYourAnswers ){
                $("#next-answers").prop("disabled", true);
              } else {
                $("#next-answers").prop("disabled", false);

              }

              if(me.offsetYourAnswers == 0){
                $("#previous-answers").prop("disabled", true);
              } else {
                $("#previous-answers").prop("disabled", false);
              }

              if(me.offsetYourAnswers+me.rows > me.totalYourAnswers){
                $("#account-answers-page-number").html("Showing from "+(me.offsetYourAnswers+1)+" to "+ me.totalYourAnswers + " of " + me.totalYourAnswers + " total entries");

              } else {
                $("#account-answers-page-number").html("Showing from "+(me.offsetYourAnswers+1)+" to "+ (me.offsetYourAnswers+me.rows) + " of " + me.totalYourAnswers + " total entries");
              }
            },
            error: function(jqXHR, textStatus, errorThrown ){
              toastr.error(jqXHR.responseJSON.message);
              console.log(jqXHR);
            }
         });
  }

  loadQuestion(question_id, answer_id, check = false){
    let me = this;
    $.ajax({
       url: "api/user/question/",
       type: "GET",
       beforeSend: function(xhr){xhr.setRequestHeader('Authentication', localStorage.getItem("token"));},
       data: { "answer_id" : answer_id },
       success: function(data) {
         if(data.length == 0){
           toastr.error("Question of this answer has been removed!");
         } else {
           let text = `<div class='col-lg-12'>
                                 <div class='card bg-grey card-padding card-style' style='height: auto;'>
                                   <div class='card-body p-1'>
                                     <h3 class='card-title question-subject'>${data[0].subject}</h3>
                                     <h6 class='card-subtitle mb-2 text-muted'><strong>Posted</strong> ${AskIbuUtils.time(data[0].posted_at)}</h6>
                                     <p class='card-text panel p-1'>${data[0].body}</p>
                                   </div>`;
                                   if(check){
                                     text += `<div class="container-fluid p-1">
                                       <div class="row">
                                         <div class="col-md-6 col-sm-6 col-xs-6">
                                           <a onclick="account.loadAnswer(${answer_id}, true)" class="pointer toggling-link">Load answer</a>
                                         </div>
                                         <div class="col-md-6 col-sm-6 col-xs-6">
                                           <a id="account-answers-add-answer-show-form-${data[0].id}" onclick="account.showAnswerForm(${data[0].id}, '#account-answers-add-answer-')" class="pull-right pointer add-answer">+ Add answer</a>
                                         </div>
                                       </div>
                                     </div>`;
                                   } else {
                                     text += `<div class="container-fluid p-1">
                                       <div class="row">
                                         <div class="col-md-12">
                                           <a id="account-answers-add-answer-show-form-${data[0].id}" onclick="account.showAnswerForm(${data[0].id}, '#account-answers-add-answer-')" class="pull-right pointer add-answer">+ Add answer</a>
                                         </div>
                                       </div>
                                     </div>`;
                                   }

                    text += `      <div id='account-${answer_id}-answers-container-${data[0].id}' class="container-fluid hidden">
                                     <div class="row" id='account-${answer_id}-answers-list-${data[0].id}'>

                                     </div>`;
                                     if(check){
                                       text += `<div class="row text-center">
                                         <a onclick="account.loadAnswer(${answer_id}, true)" class="toggling-link pointer">Load answer</a>
                                       </div>`;
                                     } else {
                                       text += `<div class="row text-center">
                                         <a onclick="account.loadAnswer(${answer_id})" class="toggling-link pointer">Load answer</a>
                                       </div>`;
                                     }
                text += `          </div>
                                   <div id="account-answers-add-answer-${data[0].id}" class="container-fluid hidden">

                                      <input name="question_id" type="hidden" value="${data[0].id}">
                                      <div class="row m-1">
                                         <textarea name="body" type="text" class="form-control"></textarea>
                                      </div>
                                       <div class="row m-1">
                                         <button onclick="account.addAnswer('#account-answers-add-answer-${data[0].id}', '-${answer_id}')" class="btn btn-success" type="button">Send</button>
                                       </div>
                                   </div>
                                 </div>
                               </div>`;
                  $("#"+answer_id+"-your-answer-"+question_id).html(text);
                  me.loadAnswers(question_id, `-${answer_id}`);
         }
       },
       error: function(jqXHR, textStatus, errorThrown ){
         toastr.error(jqXHR.responseJSON.message);
         console.log(jqXHR);
       }
    });
  }

  loadYourRemovedQuestions(){
    let me = this;
    $.ajax({
            url: "api/user/question",
            type: "GET",
            data: {
              "order":"%2Bid",
              "limit":  me.rows,
              "offset" : me.offsetRemovedQuestions,
              "status" : "REMOVED"
            },
            beforeSend: function(xhr){xhr.setRequestHeader('Authentication', localStorage.getItem("token"));},
            success: function(data, textStatus, request) {
              let text = "";
              me.totalRemovedQuestions = request.getResponseHeader("total-records");
              if(request.getResponseHeader("total-records") == 0){
                $(".account-removed-question-pagination-nav").addClass("hidden");
                $("#account-removed-question-list").addClass("hidden");
                $("#account-no-removed-question-alert").removeClass("hidden");
                return;
              } else {
                $(".account-removed-question-pagination-nav").removeClass("hidden");
                $("#aaccount-removed-question-list").removeClass("hidden");
              }
              for(var i=0; i<data.length; i++){
                text += `<div class='col-lg-12'>
                            <div class='card bg-grey card-padding card-style' style='height: auto;'>
                              <div class='card-body p-1'>
                                <h3 class='card-title question-subject'>${data[i].subject}</h3>
                                <h6 class='card-subtitle mb-2 text-muted'><strong>Posted</strong> ${AskIbuUtils.time(data[i].posted_at)}</h6>
                                <p class='card-text panel p-1'>${data[i].body}</p>
                              </div>
                            </div>
                          </div>`;
              }
              $("#account-removed-question-list").html(text);
              if(me.offsetRemovedQuestions+me.rows >= me.totalRemovedQuestions ){
                $("#next-questions-removed").prop("disabled", true);
              } else {
                $("#next-questions-removed").prop("disabled", false);

              }

              if(me.offsetRemovedQuestions == 0){
                $("#previous-questions-removed").prop("disabled", true);
              } else {
                $("#previous-questions-removed").prop("disabled", false);
              }

              if(me.offsetRemovedQuestions+me.rows > me.totalRemovedQuestions){
                $("#account-removed-question-page-number").html("Showing from "+(me.offsetRemovedQuestions+1)+" to "+ me.totalRemovedQuestions + " of " + me.totalRemovedQuestions + " total entries");

              } else {
                $("#account-removed-question-page-number").html("Showing from "+(me.offsetRemovedQuestions+1)+" to "+ (me.offsetRemovedQuestions+me.rows) + " of " + me.totalRemovedQuestions + " total entries");
              }
              },
            error: function(jqXHR, textStatus, errorThrown ){
              toastr.error(jqXHR.responseJSON.message);
              console.log(jqXHR);
            }
         });
  }

  loadYourRemovedAnswers(){
    let me = this;
    $.ajax({
            url: "api/user/answer",
            type: "GET",
            data: {
              "order":"+id",
              "limit": me.rows,
              "offset" : me.offsetRemovedAnswers,
              "status" : "REMOVED"
            },
            beforeSend: function(xhr){xhr.setRequestHeader('Authentication', localStorage.getItem("token"));},
            success: function(data, textStatus, request) {
              me.totalRemovedAnswers = request.getResponseHeader("total-records");
              if(request.getResponseHeader("total-records") == 0){
                $(".account-removed-answers-pagination-nav").addClass("hidden");
                $("#account-removed-answer-list").addClass("hidden");
                $("#account-no-removed-answers-alert").removeClass("hidden");
                return;
              } else {
                $(".account-removed-answers-pagination-nav").removeClass("hidden");
                $("#account-removed-answer-list").removeClass("hidden");
              }
              let text = "";
              for(var i=0; i<data.length; i++){
                text += `<div class='col-lg-12' id="${data[i].id}-your-answer-${data[i].question_id}">
                            <div class='card bg-white border-blue card-padding-s card-style' style='height: auto;'>
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
                   <i class="fa fa-map-pin fa-2x pull-right"></i>
                 </div>`;
               } else {
                 text += `<div id="pin-${data[i].id}" class="col-md-2 col-sm-2 col-xs-2">
                 <i class="fa fa-map-pin fa-2x pull-right"></i>
               </div>`;
               }
               text += `            </div>
                                    <div class="row">
                                      <a onclick="account.loadQuestion(${data[i].question_id}, ${data[i].id}, true)" class="pointer toggling-link pl-1">Load question</a>
                                    </div>
                                 </div>
                              </div>
                            </div>
                          </div>`;
              }
              $("#account-removed-answer-list").html(text);
              if(me.offsetRemovedAnswers+me.rows >= me.totalRemovedAnswers ){
                $("#next-answers-removed").prop("disabled", true);
              } else {
                $("#next-answers-removed").prop("disabled", false);

              }

              if(me.offsetRemovedAnswers == 0){
                $("#previous-answers-removed").prop("disabled", true);
              } else {
                $("#previous-answers-removed").prop("disabled", false);
              }

              if(me.offsetRemovedAnswers+me.rows > me.totalRemovedAnswers){
                $("#account-removed-answers-page-number").html("Showing from "+(me.offsetRemovedAnswers+1)+" to "+ me.totalRemovedAnswers + " of " + me.totalRemovedAnswers + " total entries");

              } else {
                $("#account-removed-answers-page-number").html("Showing from "+(me.offsetRemovedAnswers+1)+" to "+ (me.offsetRemovedAnswers+me.rows) + " of " + me.totalRemovedAnswers + " total entries");

              }
            },
            error: function(jqXHR, textStatus, errorThrown ){
              toastr.error(jqXHR.responseJSON.message);
              console.log(jqXHR);
            }
         });
  }

  paginate(element){
    let id = element.id;
    if (id == "next-answers-removed"){
      this.offsetRemovedAnswers += this.rows;
      this.loadYourRemovedAnswers();
    } else if (id == "previous-answers-removed"){
      this.offsetRemovedAnswers -= this.rows;
      this.loadYourRemovedAnswers();
    } else if (id == "next-questions-removed"){
      this.offsetRemovedQuestions += this.rows;
      this.loadYourRemovedQuestions();
    } else if (id == "previous-questions-removed"){
      this.offsetRemovedQuestions -= this.rows;
      this.loadYourRemovedQuestions();
    } else if (id == "next-answers"){
      this.offsetYourAnswers += this.rows;
      this.loadYourAnswers();
    } else if (id == "previous-answers"){
      this.offsetYourAnswers -= this.rows;
      this.loadYourAnswers();
    } else if (id == "next-questions"){
      this.offsetYourQuestions += this.rows;
      this.loadYourQuestions();
    } else if (id == "previous-questions"){
      this.offsetYourQuestions -= this.rows;
      this.loadYourQuestions();
    }
  }

  loadAnswers(questionId, selector = ""){
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

          if(selector != ""){
            if(data[i].is_pinned == 1){
                text += `<div id="account${selector}-pin-${data[i].id}" class="col-md-2 col-sm-2 col-xs-2 green">
                <i onclick='account.pinned(${data[i].id}, ${data[i].question_id}, ${selector})' class="fa fa-map-pin fa-2x pointer pull-right"></i>
              </div>`;
            } else {
              text += `<div id="account${selector}-pin-${data[i].id}" class="col-md-2 col-sm-2 col-xs-2">
              <i onclick='account.pinned(${data[i].id}, ${data[i].question_id}, ${selector})' class="fa fa-map-pin fa-2x pointer pull-right"></i>
            </div>`;
            }
          } else {
            if(data[i].is_pinned == 1){
                text += `<div id="account-pin-${data[i].id}" class="col-md-2 col-sm-2 col-xs-2 green">
                <i onclick='account.pinned(${data[i].id}, ${data[i].question_id})' class="fa fa-map-pin fa-2x pointer pull-right"></i>
              </div>`;
            } else {
              text += `<div id="account-pin-${data[i].id}" class="col-md-2 col-sm-2 col-xs-2">
              <i onclick='account.pinned(${data[i].id}, ${data[i].question_id})' class="fa fa-map-pin fa-2x pointer pull-right"></i>
            </div>`;
            }
          }
          text += `            </div>`;
          if(data[i].id == selector.substring(1)){
            text += `<div class="row">
                      <a onclick="account.loadAnswer(${data[i].id})" class="pointer toggling-link pl-1">Load answer</a>
                    </div>`;
          }
          text += `          </div>
                         </div>
                       </div>
                     </div>`;
         }
         try {
           $("#account"+selector+"-answers-list-"+data[0].question_id).html(text);
           $("#account"+selector+"-answers-container-"+data[0].question_id).removeClass("hidden");
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

  loadAnswer(answer_id, check = false){
    $.ajax({
       url: "api/user/answer/"+answer_id,
       type: "GET",
       beforeSend: function(xhr){xhr.setRequestHeader('Authentication', localStorage.getItem("token"));},
       success: function(data) {
         console.log(data)
         let text = `
                     <div class='card bg-white border-blue card-padding-s card-style' style='height: auto;'>
                      <div class="card-header">
                        <h6 class='card-subtitle mb-2 text-muted'><strong>Posted by:</strong> ${data.name} ${AskIbuUtils.time(data.posted_at)}</h6>
                      </div>
                       <div class='card-body'>
                         <div class="container-fluid">
                            <div class="row">
                              <div class="col-md-10 col-sm-10 col-xs-10">
                                <p class='card-text'>${data.body}</p>
                              </div>`;
        if(data.is_pinned == 1){
            text += `<div id="pin-${data.id}" class="col-md-2 col-sm-2 col-xs-2 green">
            <i class="fa fa-map-pin fa-2x pull-right"></i>
          </div>`;
        } else {
          text += `<div id="pin-${data.id}" class="col-md-2 col-sm-2 col-xs-2">
          <i class="fa fa-map-pin fa-2x pull-right"></i>
        </div>`;
        }
        text += `            </div>`;
        if(check){
          text += `<div class="row">
            <a onclick="account.loadQuestion(${data.question_id}, ${data.id}, true)" class="pointer toggling-link pl-1">Load question</a>
          </div>`;
        } else {
          text += `<div class="row">
            <a onclick="account.loadQuestion(${data.question_id}, ${data.id})" class="pointer toggling-link pl-1 ">Load question</a>
          </div>`;
        }

        text += `        </div>
                       </div>
                     </div>`;
         $(`#${data.id}-your-answer-${data.question_id}`).html(text);
       },
       error: function(jqXHR, textStatus, errorThrown ){
         toastr.error(jqXHR.responseJSON.message);
         console.log(jqXHR);
       }
    });
  }

  addAnswer(selector, load_selector){
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
           me.loadAnswers(question_id, load_selector);
         },
         error: function(jqXHR, textStatus, errorThrown ){
           toastr.error(jqXHR.responseJSON.message);
           console.log(jqXHR);
         }
      });
  }

  preEdit(id){
    RestClient.get("api/user/question/"+id, null, function(data){
        AskIbuUtils.dataToForm("#edit-question", data);
        $("#edit-question-modal").modal("show");
    });
  }

  update(question){
    let me = this;
    $.ajax({
            url: "api/user/question/"+question.id,
            type: "PUT",
            data: JSON.stringify(question),
            contentType: "application/json",
            beforeSend: function(xhr){xhr.setRequestHeader('Authentication', localStorage.getItem("token"));},
            success: function(data) {
              toastr.success("Question was updated!");
              $("#edit-question").trigger("reset");
              $("#edit-question *[name='id']").val("");
              $('#edit-question-modal').modal("hide");
              me.loadYourQuestions();
              me.loadYourAnswers();
              me.loadYourRemovedQuestions();
              me.loadYourRemovedAnswers();
              },
            error: function(jqXHR, textStatus, errorThrown ){
              toastr.error(jqXHR.responseJSON.message);
              console.log(jqXHR);
            }
         });
 }

  pinned(answer_id, question_id, selector = ""){
    let value = 0;
    if(!$("#account"+selector+"-pin-"+answer_id).hasClass("green")){
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
           me.loadAnswers(question_id, String(selector));
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

  showAnswerForm(question_id, selector){
    $(selector+question_id).toggleClass("hidden");
    $(selector+"show-form-"+question_id).toggleClass("active");
    if($(selector+"show-form-"+question_id).hasClass("active")){
      $(selector+"show-form-"+question_id).html("Hide answer form");
    } else {
      $(selector+"show-form-"+question_id).html("+ Add answer");
    }
  }

}
