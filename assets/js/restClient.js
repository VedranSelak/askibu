class RestClient {

  static request(endpoint, method, body, success, error){
    $.ajax({
         url: endpoint,
         type: method,
         data: JSON.stringify(body),
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
            errror(jqXHR, textStatus, errorThrown);
          } else {
            toastr.error(jqXHR.responseJSON.message);
          }
        }
      });
  }

  static post(endpoint, body, success, error){
    RestClient.request(endpoint, "POST", body, success, error);
  }

  static put(endpoint, body, success, error){
    RestClient.request(endpoint, "PUT", body, success, error);
  }

  static get(endpoint, body, success, error){
    RestClient.request(endpoint, "GET", body, success, error);
  }

}
