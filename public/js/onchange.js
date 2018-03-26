$('#focalslider').on('input', function(){
  column.updateFocalLength(1, this.value);
});

$('#focalslider2').on('input', function(){
  column.updateFocalLength(2, this.value);
});

$('#x1').on('input', function(){
  column.updateLeftBoundry(1, this.value);
});

$('#x2').on('input', function(){
  column.updateRightBoundry(1, this.value);
});
