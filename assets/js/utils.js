
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

}
