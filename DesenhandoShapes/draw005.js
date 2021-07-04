function draw() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext){
    var ctx = canvas.getContext('2d');

    for(var i=0;i<4;i++){
      for(var j=0;j<3;j++){
        ctx.beginPath();
        var x              = 25+j*50;               // coordenada x
        var y              = 25+i*50;               // coordenada y
        var radius         = 20;                    // Raio do Arco
        var startAngle     = 0;                     // Ponto inicial no círculo
        var endAngle       = Math.PI+(Math.PI*j)/2; // Ponto final no círculo
        var anticlockwise  = i%2==0 ? false : true; // horário ou anti-horário

        ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);

        if (i>1){
          ctx.fill();
        } else {
          ctx.stroke();
        }
      }
    }
  }
}