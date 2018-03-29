'use strict';
$('#focalslider').on('input', function(){
  column.updateFocalLength(2, this.value);
});

$('#focalslider2').on('input', function(){
  column.updateFocalLength(3, this.value);
});
