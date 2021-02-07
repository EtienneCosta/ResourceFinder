$(document).ready(function(){
  $('.delete-resource').on('click', function(e){
    $target = $(e.target);
    const resourceID = $target.attr('data-id');
    const userID = $target.attr('data-user');

    $.ajax({
      type: 'DELETE',
      url: 'http://localhost:8001/resources/'+resourceID,
      success: function(response){
        alert('Deleting Resource');
        window.location.href='http://localhost:8002/dashboard/resources/'+userID;
        
      },
      error: function(err){
        console.log(err);
      }
    });
  });
});