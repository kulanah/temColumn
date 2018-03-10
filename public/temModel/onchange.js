$('#focalslider').on('input', function(){
  userColumn.components[0].updateFocalLength(this.value);
});
$('#focalslider2').on('input', function(){
  userColumn.components[1].updateFocalLength(this.value);
});