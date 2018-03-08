$('#focalslider').on('input', function(){
  temColumn.components[0].updateFocalLength(this.value);
  console.log(this.value);
});