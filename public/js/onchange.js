$('#focalslider').on('input', function(){
  userColumn.components[0].updateFocalLength(this.value);
});

$('#focalslider2').on('input', function(){
  userColumn.components[1].updateFocalLength(this.value);
});

$('#x1').on('input', function(){
  userColumn.components[1].updatex1(this.value);
});

$('#x2').on('input', function(){
  userColumn.components[1].updatex2(this.value);
});
