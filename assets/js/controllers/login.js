class Login {

  static init(){
    if(window.localStorage.getItem("token")){
      window.location = "index.html";
    } else {
      $("body").show();
    }

    var urlParams = new URLSearchParams(window.location.search);
    if(urlParams.has("token")){
      $("#reset-form *[name='token']").val(urlParams.get("token"));
      Login.showResetPasswordForm();
    }
  }

  static showResetPasswordForm(){
    $("#reset-form-container").removeClass("hidden");
    $("#login-form-container").addClass("hidden");
    $("#forgot-form-container").addClass("hidden");
    $("#register-form-container").addClass("hidden");
  }

  static showForgotForm(){
    $("#login-form-container").addClass("hidden");
    $("#forgot-form-container").removeClass("hidden");
  }

  static showRegiterForm(){
    $("#login-form-container").addClass("hidden");
    $("#register-form-container").removeClass("hidden");
    RestClient.get("api/faculties", null, function(data){
      let text = "";
      for(let i=0; i<data.length; i++){
        text += `<li class="pointer"><a onclick="Login.facultyClicked(${data[i].id}, '${data[i].name}')">${data[i].name}</a></li>`;
      }
      $("#dropdown-menu-faculty").html(text);
    });
  }

  static facultyClicked(faculty_id, faculty_name){
    $("#department-form-item").removeClass("hidden");
    $("#register-form *[name='faculty_id']").val(faculty_id);
    $("#faculty-dropdown").html(faculty_name);
    RestClient.get("api/departments/"+faculty_id, null, function(data){
      let text = "";
      for(let i=0; i<data.length; i++){
        text += `<li class="pointer"><a onclick="Login.departmentClicked(${data[i].id}, '${data[i].name}')">${data[i].name}</a></li>`;
      }
      $("#dropdown-menu-department").html(text);
    });
  }

  static departmentClicked(department_id, department_name){
    $("#register-form *[name='department_id']").val(department_id);
    $("#department-dropdown").html(department_name);
  }

  static showLoginForm(){
    $("#login-form-container").removeClass("hidden");
    $("#register-form-container").addClass("hidden");
    $("#forgot-form-container").addClass("hidden");
  }

  static doRegister(){
    $("#register-link").prop("disabled", true);
    RestClient.post("api/register", AskIbuUtils.formToJson("#register-form"), function(data){
      if($("#register-alert").hasClass("alert-danger")){
        $("#register-alert").removeClass("alert-danger");
      }
      $("#register-alert").html(data.message);
      $("#register-alert").addClass("alert-success");
      $("#register-alert").removeClass("hidden");
    }, function(error){
      if($("#register-alert").hasClass("alert-success")){
        $("#register-alert").removeClass("alert-success");
      }
      $("#register-link").prop("disabled", false);
      $("#register-alert").html(error.responseJSON.message);
      $("#register-alert").addClass("alert-danger");
      $("#register-alert").removeClass("hidden");
    });
  }

  static doLogin(){
    $("#login-link").prop("disabled", true);

    RestClient.post("api/login",  AskIbuUtils.formToJson("#login-form"), function(data) {
      window.localStorage.setItem("token", data.token);
      window.location = "index.html";
    }, function(error) {
      $("#login-link").prop("disabled", false);
      toastr.error(error.responseJSON.message);
    });
  }

  static doResetPassword(){
    $("#reset-link").prop("disabled", true);
    RestClient.post("api/reset",  AskIbuUtils.formToJson("#reset-form"), function(data) {
      window.localStorage.setItem("token", data.token);
      window.location = "index.html";
    }, function(error) {
      $("#reset-link").prop("disabled", false);
      alert(error.responseJSON.message);
    });
  }

  static doForgotPassword(){
    $("#forgot-link").prop("disabled", true);
    RestClient.post("api/forgot",  AskIbuUtils.formToJson("#forgot-form"), function(data) {
      if($("#forgot-alert").hasClass("alert-danger")){
        $("#forgot-alert").removeClass("alert-danger");
      }
      $("#forgot-alert").html(data.message);
      $("#forgot-alert").addClass("alert-success");
      $("#forgot-alert").removeClass("hidden");
    }, function(error) {
      $("#forgot-link").prop("disabled", false);
      if($("#forgot-alert").hasClass("alert-success")){
        $("#forgot-alert").removeClass("alert-success");
      }

      $("#forgot-alert").html(error.responseJSON.message);
      $("#forgot-alert").addClass("alert-danger");
      $("#forgot-alert").removeClass("hidden");
    });
  }

}
