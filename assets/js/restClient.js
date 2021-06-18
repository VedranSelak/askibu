class RestClient {

  static request(endpoint, method, body, success, error){
    $.ajax({
         url: endpoint,
         type: method,
         data: body,
         contentType: "application/json",
         beforeSend: function(xhr){
           if(localStorage.getItem("token")){
             xhr.setRequestHeader('Authentication', localStorage.getItem("token"));
           }
         },
         success: function(data) {
           success(data);
        },
        error: function(jqXHR, textStatus, errorThrown){
          if(error) {
            error(jqXHR, textStatus, errorThrown);
          } else {
            toastr.error(jqXHR.responseJSON.message);
          }
        }
      });
  }

  static post(endpoint, body, success, error){
    RestClient.request(endpoint, "POST", JSON.stringify(body), success, error);
  }

  static put(endpoint, body, success, error){
    RestClient.request(endpoint, "PUT", JSON.stringify(body), success, error);
  }

  static get(endpoint, body, success, error){
    RestClient.request(endpoint, "GET", body, success, error);
  }

}
