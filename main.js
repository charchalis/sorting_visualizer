//'use strict';

import 'regenerator-runtime/runtime';

var WIDTH = 400;
var HEIGHT = 600;

var canvas;
var canvasContext;

var values = [];

var sorting = false;

window.onload = function () {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');
  document.getElementById("bubble").onclick = bubbleSort;
  document.getElementById("insertion").onclick = insertionSort;
  document.getElementById("quick").onclick = startQuickSort;
  document.getElementById("gravity").onclick = gravitySort;
  document.getElementById("shuffle").onclick = shuffle;

  //fancy populating
  for (var i = 0; i < WIDTH; i++) {
    values.push(HEIGHT * i / WIDTH);
  }
  shuffle();

  draw();
}

function isSorted() {
  for (var i = 1; i < WIDTH; i++) {
    if (values[i] < values[i - 1]) return false;
  }
  return true;
}


function draw() {

  //background
  colorRect(0, 0, canvas.width, canvas.height, 'black');

  canvasContext.beginPath();

  var trippyShitInt = 0;                                             // 0 for default, any other number for trippy shit

  for (var i = 1; i < values.length; i++) {
    drawLine(i * 2, i * 2 + trippyShitInt, HEIGHT, HEIGHT - values[i]);
  }
}

function drawLine(x1, x2, y1, y2) {
  canvasContext.moveTo(x1, y1);
  canvasContext.lineTo(x2, y2);
  canvasContext.strokeStyle = 'white';
  canvasContext.stroke();
}

function shuffle() {

  if(sorting) return;

  var currentIndex = values.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = values[currentIndex];
    values[currentIndex] = values[randomIndex];
    values[randomIndex] = temporaryValue;
  }

  draw();
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function bubbleSort() {
  if(sorting || isSorted()) return;
  sorting = true;
  draw();
  let len = values.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      if (values[j] > values[j + 1]) {
        let tmp = values[j];
        values[j] = values[j + 1];
        values[j + 1] = tmp;
        //draw();
        //await sleep(1);
      }
    }
    draw();
    await sleep(1);
  }
  sorting = false;
}

async function gravitySort() {
  if(sorting || isSorted()) return;
  sorting = true;
  draw();
  let len = values.length;
  for (let i = len - 1; i >= 0; i--) {
    for (let j = len - 1; j > 0; j--) {
      if (values[j] < values[j - 1]) {
        let tmp = values[j];
        values[j] = values[j - 1];
        values[j - 1] = tmp;
        //draw();
        //await sleep(1);
      }
    }
    draw();
    await sleep(1);
  }
  sorting = false;
}

async function insertionSort() {
  if(sorting || isSorted()) return;
  let length = values.length;
  for (let i = 1; i < length; i++) {
    let key = values[i];
    let j = i - 1;
    while (j >= 0 && values[j] > key) {
      values[j + 1] = values[j];
      j--;
    }
    draw();
    await sleep(1);
    values[j + 1] = key;
  }
}

function colorRect(leftX, TopY, width, height, color) {
  canvasContext.fillStyle = color;
  canvasContext.fillRect(leftX, TopY, width, height);
}


function swap(items, leftIndex, rightIndex) {
  var temp = items[leftIndex];
  items[leftIndex] = items[rightIndex];
  items[rightIndex] = temp;
}

function partition(left, right) {
  var pivot = values[Math.floor((right + left) / 2)], //middle element
    i = left, //left pointer
    j = right; //right pointer
  while (i <= j) {
    while (values[i] < pivot) {
      i++;
    }
    while (values[j] > pivot) {
      j--;
    }
    if (i <= j) {
      swap(values, i, j); //swap two elements
      i++;
      j--;
    }
  }
  return i;
}

async function quickSort(left, right) {
  sorting = true;
  var index;
  if (values.length > 1) {
    index = partition(left, right); //index returned from partition
    if (left < index - 1) { //more elements on the left side of the pivot
      quickSort(left, index - 1);
      draw();
      await sleep(1);
    }
    if (index < right) { //more elements on the right side of the pivot
      quickSort(index, right);
      draw();
      await sleep(1);
    }
  }
  sorting = false;
}

function startQuickSort(){
  if(sorting || isSorted()) return;
  quickSort(0, values.length - 1);
}