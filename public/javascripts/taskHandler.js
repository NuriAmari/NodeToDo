$(document).ready(function() {
  $(".tasks li").click(function() {
    console.log(window.location.pathname);
    $.ajax({
      url: window.location.pathname + '/delete/' + this.id,
      type: 'DELETE',
      success: function(result) {
        location.reload();
      }
    });
  });
});
