jQuery.githubUser = function(username, callback) {
   jQuery.getJSON('https://api.github.com/users/'+username+'/repos?callback=?',callback)
}

jQuery.fn.loadRepositories = function(username) {
console.log("here")
    var target = this;
    $.githubUser(username, function(data) {
        var repos = data.data; 
		console.log(data,repos,repos.length,data.data)
		if(repos == undefined){
		$('#mygithubprojects').hide();
		$("#mygithubprojects,#mygithubprojectsTitle,#mygithubprojectsTitle2").empty();
		$('#myModal p').html('Sorry, We couldn\'t find an account with this user name');
		$('#myModal').show();
		} else if(repos.length == 0) {
		$('#mygithubprojects').hide();
		$("#mygithubprojects,#mygithubprojectsTitle,#mygithubprojectsTitle2").empty();
		$('#myModal p').html('Sorry, no repository found in this username');
		$('#myModal').show();
		}else if(repos.length >= 1) {
		$('#mygithubprojects').css('display','block');
        $('#mygithubprojects').html("<span>Querying GitHub for " + username +"'s repositories...</span>");
		sortByName(repos);    
     
        var list = $('<dl/>');
        target.empty().append(list);
		$('#mygithubprojectsTitle').html("<span>List of " + username +"'s repositories...</span>").css('display','block');
		
        $(repos).each(function() {
            if (this.name != (username.toLowerCase()+'.github.com') && this.name != (username.toLowerCase()+'.github.io')) {
                list.append('<dt><a target="_blank" href="'+ (this.homepage?this.homepage:this.html_url) +'">' + this.name + '</a> <em>'+(this.language?('('+this.language+')'):'')+'</em>: ' + this.description + '</dt>');
            }
        }); 
        $('#mygithubprojectsTitle2').html("<span>Total no. of repositories found &nbsp;= <b>"+($('dl').children().length)+"</b></span>").css('display','block');		
		}
            
      });
      
    function sortByName(repos) {
        repos.sort(function(a,b) {
        return a.name - b.name;
       });
    }
};
 