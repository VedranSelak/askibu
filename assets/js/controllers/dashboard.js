class Dashboard {

  static init(){
    $(document).ready(function() {
      RestClient.get("api/user/question-count", null, function(data) {
        $("#question-count").html(data.count);
      });

      RestClient.get("api/user/answer-count", null, function(data) {
        $("#pin-count").html(data.pins);
        $("#answer-count").html(data.count);
      });
    });

    Dashboard.loadLatestQuestions();
  }

  static loadLatestQuestions(){
    let body = {
      "limit" : 3,
      "order": "%2Bid"
    };
    RestClient.get("api/user/question", body, function(data) {
      let text = "";
      for(var i=0; i<data.length; i++){
        text += `<div class='col-lg-12 col-md-12 col-sm-12'>
                              <div class='card bg-grey card-padding card-style' style='height: auto;'>
                                <div class='card-body p-1'>
                                  <h3 class='card-title'>${data[i].subject}</h3>
                                  <h6 class='card-subtitle mb-2 text-muted'>Posted at: ${data[i].posted_at}</h6>
                                  <p class='card-text panel p-1'>${data[i].body}</p>
                                </div>
                                <div class="container-fluid p-1">
                                  <div class="row">
                                    <div class="col-md-6 col-sm-6">
                                      <a onclick='Departments.loadAnswers(${data[i].id})' class="pointer" style='text-decoration: none; color:black;'><i class='fa fa-comments'></i>Anwsers</a>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                      <a onclick="Departments.showAnswerForm(${data[i].id})" class="pull-right pointer" style='text-decoration: none; color:black;'>Reply</a>
                                    </div>
                                  </div>
                                </div>
                                <div id='answers-container-${data[i].id}' class="container-fluid hidden">
                                  <div class="row" id='answers-list-${data[i].id}'>

                                  </div>
                                  <div class='row text-center'>
                                    <div class="card-footer"><i class="fa fa-chevron-up pointer" onclick='Departments.hideAnswers(${data[i].id})'></i></div>
                                  </div>
                                </div>
                                <div id="add-answer-${data[i].id}" class="container hidden">

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

      $("#latest-questions").html(text);
    });
  }

}
