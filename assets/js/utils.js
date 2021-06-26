
class AskIbuUtils {

  static formToJson(selector){
    var data = $(selector).serializeArray();
    var form_data = {};
    for(var i=0; i<data.length;  i++){
      form_data[data[i].name] = data[i].value;
    }
    return form_data;
  }

  static dataToForm(selector, data){
    for (const attr in data){
      $(selector+" *[name='"+attr+"']").val(data[attr]);
    }
  }

  static parseJWT(token){
    var base64Url = token.split('.')[1];
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
  }

  static time(time){
    var data = Math.abs((new Date(time).getTime() / 1000).toFixed(0));
    var currentDate = Math.abs((new Date().getTime() / 1000).toFixed(0));
    var diff = currentDate - data;

    var days = Math.floor(diff / 86400);
    var hours = Math.floor(diff / 3600) % 24;
    var minutes = Math.floor(diff / 60) % 60;

    if(days == 0){
      if(hours == 0){
        if(minutes == 0){
          return "just now";
        } else {
          return minutes+"min ago";
        }
      } else {
        return hours+"h ago";
      }
    } else {
      return days+"d ago";
    }
  }

}
