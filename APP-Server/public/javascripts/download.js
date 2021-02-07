$(document).ready(function(){
    $('.download-resource').on('click', function(e){
      $target = $(e.target);
      const resourceID = $target.attr('data-id');
  
      $.ajax({
        type: 'GET',
        url: 'http://localhost:8002/dashboard/resources/download/'+resourceID,
        success: function(response){
          alert('Downloading  Resource ...');
          window.location.href='http://localhost:8002/dashboard/resources?id='+resourceID;
        },
        error: function(err){
          console.log(err);
        }
      });
    });
  });