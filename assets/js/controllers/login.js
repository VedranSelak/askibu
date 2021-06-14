class Login {

  static init(){
    if(window.localStorage.getItem("token")){
      window.location = "index.html";
    } else {
      $("body").show();
    }

    var urlParams = new URLSearchParams(window.location.search);
    if(urlParams.has("token")){
      $("#reset-token").val(urlParams.get("token"));
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
  }

  static showLoginForm(){
    $("#login-form-container").removeClass("hidden");
    $("#register-form-container").addClass("hidden");
    $("#forgot-form-container").addClass("hidden");
  }

  static doRegister(){
    $("#register-link").prop("disabled", true);
    $.post("api/register", AskIbuUtils.formToJson("#register-form") ).done(function( data ) {
      console.log(data);
      if($("#register-alert").hasClass("alert-danger")){
        $("#register-alert").removeClass("alert-danger");
      }
      $("#register-alert").html(data.message);
      $("#register-alert").addClass("alert-success");
      $("#register-alert").removeClass("hidden");
    }).fail(function(error) {
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
    $.post("api/login",  AskIbuUtils.formToJson("#login-form") ).done(function( data ) {
      window.localStorage.setItem("token", data.token);
      window.location = "index.html";
    }).fail(function(error) {
      $("#login-link").prop("disabled", false);
      toastr.error(error.responseJSON.message);
    });
  }

  static doResetPassword(){
    $("#reset-link").prop("disabled", true);
    $.post("api/reset",  AskIbuUtils.formToJson("#reset-form") ).done(function( data ) {
      window.localStorage.setItem("token", data.token);
      window.location = "index.html";
    }).fail(function(error) {
      $("#reset-link").prop("disabled", false);
      alert(error.responseJSON.message);
    });
  }

  static doForgotPassword(){
    $("#forgot-link").prop("disabled", true);
    $.post("api/forgot",  AskIbuUtils.formToJson("#forgot-form") ).done(function( data ) {
      if($("#forgot-alert").hasClass("alert-danger")){
        $("#forgot-alert").removeClass("alert-danger");
      }
      $("#forgot-alert").html(data.message);
      $("#forgot-alert").addClass("alert-success");
      $("#forgot-alert").removeClass("hidden");
    }).fail(function(error) {
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
