'use strict';

function playSound(e) {
  console.log('trying to play sound');
  const audio = document.querySelector(`audio[data-key='${e.keyCode}']`);
  const key = document.querySelector(`.key[data-key='${e.keyCode}']`)
  console.log('audio',audio);
  if(!audio) return; //stop the function from runinning
  audio.currentTime = 0; //rewind to the start
  audio.play();
  key.classList.add('playing');
};

function removeTransition(e) {
  if(e.propertyName !== 'transform') return; //skip it if it's not a transform
  this.classList .remove('playing');
};

const keys = document.querySelectorAll('.key');
keys.forEach( key => key.addEventListener('transitionend', removeTransition));

window.addEventListener('keydown', playSound);
 var stas = console.log('hi');

