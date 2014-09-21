/*
function uniformSample(arr) {
  var ind = Math.floor(Math.random() * arr.length);
  if (arr.length > 0) {
    ind = Math.min(arr.length - 1, ind);
  }
  return arr[ind];
}
*/

function sampleFrom(arr, weights) {
  var cutoff = Math.random();
  var totalWeightSoFar = 0.0;
  var index = 0;
  while (cutoff < 1) {
    totalWeightSoFar += weights[index];
    if (cutoff < totalWeightSoFar) {
      return arr[index];
    }
    index += 1;
  }
  return arr[index];
}

function sum(arr) {
  var acc = 0;
  for (var i = 0; i < arr.length; i++) {
    acc += arr[i];
  }
  return acc;
}

function normalize(arr) {
  var total = sum(arr);
  return arr.map(function(val) {return val / total;});
}

function getUniformDistrWeights(arr, index) {
  var result = [];
  for (var i = 0; i < arr.length; i++) {
    result.push(i);
  }
  return normalize(result);
}

function getTriangleDistrWeights(arr, index) {
  var result = [];
  for (var i = 0; i < arr.length; i++) {
    var distFromInd = Math.abs(i - index);
    result.push(arr.length - distFromInd);
  }
  return normalize(result);
}


function getSmoothedTriangleDistrWeights(arr, index, alpha) {
  var result = [];
  var l =  1 / (index + 1); 
  for (var i = 0; i < arr.length; i++) {
    var distFromInd = Math.abs(i - index);
    result.push(arr.length - distFromInd + alpha);
  }
  return normalize(result);
}


/*
var fruits = ['apples', 'oranges', 'bannanas', 'pears', 'peaches', 'strawberries'];
var weights = getTriangleDistrWeights(fruits, 1);
var results = {};
console.log(weights);
for (var i = 0; i < fruits.length; i++) {
  results[fruits[i]] = 0;
}
for (var i = 0; i < 100; i++) {
  var got = sampleFrom(fruits, weights);
  console.log(got);
  results[got] += 1;
}
console.log(results);
*/