$(document).ready(function() {
    $('.add-review').on('click', function(e) {
      $target = $(e.target);
      const resourceID = $target.attr('data-id');
      const userID = $target.attr('data-user');
      const message= $(this).parent().find('.message').val();
      console.log(message);
      $.ajax({
        type: 'POST',
        url: 'http://localhost:8002/dashboard/resources/comment/',
        data: {postId: resourceID, comment: message,author:userID},
        success: function(response){
                console.log("comentário adicionado ...")   
            window.location.href='http://localhost:8002/dashboard/resources?id='+resourceID;
        },
        error: function(err){
          console.log(err);
        }
      });
    });
  });



  $(document).ready(function(){
    $('.delete-comment').on('click', function(e){
      $target = $(e.target);
      const id = $target.attr('data-id');
      const comment_id = $target.attr('comment-id');
      $.ajax({
        type: 'DELETE',
        url:'http://localhost:8001/resources/comment?resource='+id+'&comment='+comment_id,
        success: function(response){
          alert('Deleting Comment...');
          window.location.href='http://localhost:8002/dashboard/resources?id='+id;
        },
        error: function(err){
          console.log(err);
        }
      });
    });
  });


  $(document).ready(function() {
    $('.edit-review').on('click', function(e) {
      $target = $(e.target);
      const id = $target.attr('data-id');
      const comment_id = $target.attr('comment-id');
      var msg = $(this).parent().find('.message').val();
      console.log(msg);
      $.ajax({
        type: 'POST',
        url:'http://localhost:8001/resources/comment?resource='+id+'&comment='+comment_id,
        data: {comment: msg, _id: comment_id},
        success: function(response){
          window.location.href= '/resources/'+id;
        },
        error: function(err){
          console.log(err);
        }
      });
    });
  });