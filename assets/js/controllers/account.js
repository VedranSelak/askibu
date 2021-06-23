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
      me.loadQuestions();
    });
  }

  loadQuestions(){
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
                                          <h6 class='card-subtitle mb-2 text-muted'>Posted by: ${data[i].name}</h6>
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

                                        <div id='answers-container-${data[i].id}' class="container-fluid hidden">
                                          <div class="row" id='answers-list-${data[i].id}'>

                                          </div>
                                          <div class='row text-center'>
                                            <div class="card-footer"><i class="fa fa-chevron-up pointer" onclick='account.hideAnswers(${data[i].id})'></i></div>
                                          </div>
                                        </div>
                                        <div id="add-answer-${data[i].id}" class="container hidden">

                                           <input name="question_id" type="hidden" value="${data[i].id}">
                                           <div class="row m-1">
                                              <textarea name="body" type="text" class="form-control"></textarea>
                                           </div>
                                            <div class="row m-1">
                                              <button onclick="account.addAnswer('#add-answer-${data[i].id}')" class="btn btn-success" type="button">Send</button>
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

  displayQuestions(items, wrapper, rowsPerPage, page){
    $(wrapper).html("");
    page--;

    if(this.maxPageQuestions == 0) {
      $(".account-questions-pagination-nav").addClass("hidden");
      $("#account-no-questions-alert").removeClass("hidden");
      return;
    } else {
      $(".account-questions-pagination-nav").removeClass("hidden");
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

  paginate(element){
    let id = element.id;
    if (id == "next"){
      if (this.maxPageQuestions >= this.currentPageQuestions + 1){
        this.currentPageQuestions++;
        this.displayQuestions(this.yourQuestionsList, "#account-question-list", this.rows, this.currentPageQuestions);
      }
    } else if (id == "previous"){
      if (this.currentPageQuestions - 1 > 0){
        this.currentPageQuestions--;
        this.displayQuestions(this.yourQuestionsList, "#account-question-list", this.rows, this.currentPageQuestions);
      }
    }
  }

}
