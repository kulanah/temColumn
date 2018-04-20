import {column} from './app.js';

export function setOnChange(){
  $('#focalslider').on('input', function(){
    column.updateFocalLength(2, this.value);
  });

  $('#focalslider2').on('input', function(){
    column.updateFocalLength(3, this.value);
  });

  $('#apertureslider').on('input', function(){
    column.updateAperture(2, this.value);
  });

  $('#aperture2slider').on('input', function(){
    column.updateAperture(3, this.value);
  });

  $('#rayradiusslider').on('input', function(){
    column.updateBotRadius(5, this.value);
  });

  $('#focusslider').on('input', function(){
    column.focusColumn(this.value - 1);
  });
}
