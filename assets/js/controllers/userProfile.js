class UserProfile {

  static init(){

    $(window).on('hashchange', function(e){
      UserProfile.loadData();
    });

    UserProfile.loadData();
  }

  static loadData(){
    let query = window.location.search;
    const urlParams = new URLSearchParams(query);
    let user_id = urlParams.get("user");
    console.log(user_id);
    RestClient.get("api/admin/user/"+user_id, null, function (data){
      RestClient.get("api/admin/department-faculty/"+data.department_id, null, function(data) {
        console.log(data);
        $("#users-faculty").html("Users faculty: " + data.faculty);
        $("#users-department").html("Users department: " + data.name);
      });
      $("#users-name").html("Users name: " + data.name);
      $("#users-email").html("Users email: " + data.email);
      $("#users-password").html("Users password: " + data.password);
      $("#users-date-of-joining").html("Date of joining: " + data.date_of_joining);
      $("#users-status").html("Users status: " + data.status);
      $("#users-role").html("Users role: " + data.role);
    });
  }

}
