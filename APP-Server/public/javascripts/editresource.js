$('#editModal').on('show.bs.modal', function (event) {
    var id=$("#id").attr("value");
    var title=$("#title").attr("value");
    var subtitle=$("#subtitle").attr("value");
    var type=$("#type").attr("value");
    var date =$("#date").attr("value");
    var description=$("#description").attr("value");

    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this)
    modal.find('.modal-body #id').val(id)
    modal.find('.modal-body #title').val(title)
    modal.find('.modal-body #subtitle').val(subtitle)
    modal.find('.modal-body #type').val(type)
    modal.find('.modal-body #date').val(date)
    modal.find('.modal-body #description').val(description)

  })
  
   function editfunction() {
   document.getElementById("editForm").submit();
   }        