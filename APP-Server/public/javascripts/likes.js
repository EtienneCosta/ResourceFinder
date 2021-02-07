$(document).ready(function() {
    $('.toggle-state').on('change', function(e) {
      var likes = parseInt(document.getElementById("likesnr").innerHTML.split(":")[1].trim());
      const resourceID = $(e.target).attr('data-id');
      const userID = $(e.target).attr('data-user');

      if ($(this).is(':checked')){
        likes++;
         $("#likesnr").text("Likes         : "+likes);
        $.ajax({
          type: 'POST',
          url: 'http://localhost:8002/dashboard/resources/like',
          data: {_id: resourceID,userid: userID  ,likes: 1},
          error: function(err){
            console.log(err);
          }
        })
      }
      else {
        likes--;
        $("#likesnr").text("Likes         : "+(likes));
        $.ajax({
          type: 'POST',
          url: 'http://localhost:8002/dashboard/resources/like',
          data: {_id: resourceID,userid: userID  ,likes: -1},
          error: function(err){
            console.log(err);
          }
        });
      }

     });

   });