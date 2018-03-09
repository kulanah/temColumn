$('#focalslider').on('input', function(){
  temColumn.components[0].updateFocalLength(this.value);
});
$('#focalslider2').on('input', function(){
  temColumn.components[1].updateFocalLength(this.value);
});