try {
  /*create canvas's element then append to body */
  var __canvas_DOM = document.createElement('canvas'),
    __content = document.getElementsByTagName('body')[0];
  if (window.getComputedStyle(__content).getPropertyValue('position') != 'relative') {
    __content.style.position = 'relative';
  }
  __canvas_DOM.setAttribute('style', 'position: fixed; top: 0; left: 0;');
  __content.appendChild(__canvas_DOM);
} catch (e) {
  console.info('Exception occur: ' + e);
}

/*canvas basic setting*/
__canvas_DOM.width = window.innerWidth;
__canvas_DOM.height = window.innerHeight;

/*story starts here*/
if (__canvas_DOM.getContext) {
  var c = __canvas_DOM.getContext('2d'),
    w = __canvas_DOM.width,
    h = __canvas_DOM.height;

  var centerPoint = {
    x: w / 2,
    y: h / 2,
  };

  var mousePosition = {
    x: centerPoint.x,
    y: centerPoint.y,
  };

  var flashlight_size = {
    center: h / 10,
    outside: h / 5,
  };

  var gradient_color = {
    first: 'rgba(0,0,0,0.8)',
    second: 'rgba(0,0,0,0)',
  };

  var gradient;

  function draw() {
    c.save();
    c.clearRect(0, 0, w, h);
    /*flashlight color*/
    gradient = c.createRadialGradient(
      mousePosition.x,
      mousePosition.y,
      flashlight_size.center,
      mousePosition.x,
      mousePosition.y,
      flashlight_size.outside
    );
    gradient.addColorStop(0, gradient_color.first);
    gradient.addColorStop(1, gradient_color.second);

    c.fillStyle = '#000';
    c.fillRect(0, 0, w, h);

    c.globalCompositeOperation = 'destination-out';
    c.fillStyle = gradient;
    c.arc(mousePosition.x, mousePosition.y, flashlight_size.outside, 0, Math.PI * 2, false);

    c.fill();
    c.restore();
  }

  draw();
  // timer
  // setInterval(draw, 80);
}

__canvas_DOM.addEventListener('mousemove', function (e) {
  if (e.type == 'mousemove') {
    mousePosition.x = e.offsetX;
    mousePosition.y = e.offsetY;
  }
  draw();
});

window.onresize = function () {
  __canvas_DOM.width = window.innerWidth;
  __canvas_DOM.height = window.innerHeight;
  (w = __canvas_DOM.width), (h = __canvas_DOM.height);
  console.log('width: ' + w, ',Height: ' + h);
  draw();

  updateSwitch();
};


//Audio Button

var audioButton = document.querySelector('[id="sound-on"]');

document.querySelector('#switch').addEventListener('click', function () {
  toggleAudio(audioButton);
  document.querySelectorAll('svg g:not([id="switch-off"])').forEach(function (e) {
    e.classList.add('show');
  });
  document.querySelector('canvas').classList.add('hide');
  document.querySelector('[id="switch-off"]').style.display = 'none';
  this.style.pointerEvents = 'none';
})

updateSwitch();

function updateSwitch() {
  var switchSVG = document.querySelector('#switch-on').getBoundingClientRect();
  var switchHTML = document.querySelector('#switch');

  switchHTML.style.width = switchSVG.width + 'px';
  switchHTML.style.height = switchSVG.height + 'px';
  switchHTML.style.top = (switchSVG.top + window.scrollY - 10) + 'px';
  switchHTML.style.left = (switchSVG.left + window.scrollX - 10) + 'px';
}


var audio = new Audio('audio/Christmas-Interactive-eCard-Loopsound.wav');
audio.loop = true;
function toggleAudio(btn) {
  if (audio.paused) {
    btn.classList.add('show');
    audio.play();
  } else {
    btn.classList.remove('show');
    audio.pause();
  }
}

document.querySelectorAll('[id*="sound-"]').forEach(function(el){
  el.addEventListener('click', function(){
    toggleAudio(audioButton);
  });
});

