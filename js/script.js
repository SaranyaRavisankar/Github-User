
   
$(document).ready(function(){
var patt2,result2;
}); 	

 $("input#txt_name").keyup(function(){
		if($('#txt_name').val().length >= 1){
			$('#submit').attr('disabled', false).css('opacity','1');
			$('#reset').attr('disabled', false).css('opacity','1');
		}
}); 

 $('#submit').off('click').on('click',myFunction); 
 $('#reset').off('click').on('click',function(){
         location.reload();
    }); 
 
$('.close').off('click').on('click',function() {
  $('#myModal').hide();
 $('#txt_name').val('');
  
})


$(window).click(function(event) {
console.log(event.target.id)
  if (event.target.id == 'myModal') {
    $('#myModal').hide();
	$('#txt_name').val('');
  }
})
  
  
function myFunction(){
$('#mygithubprojects').hide();

var Uname = $('#txt_name').val();
 console.log(Uname,Uname.length);
  patt2 = (/^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i);
  result2 = patt2.test(Uname);
  console.log(result2)
  if(result2 == false){
    $('#mygithubprojects').hide();
    $('#myModal p').html('Enter valid Github username');
	$('#myModal').show();
  }
  else{
  $("#mygithubprojects,#mygithubprojectsTitle,#mygithubprojectsTitle2").empty();
  $("#mygithubprojects").loadRepositories(Uname);
  }
}

