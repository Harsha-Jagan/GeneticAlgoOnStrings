let p;
let flag = true;
let target;
let count = 0;
function setup() {
  createCanvas(600, 400);
  background(150);
  //initialize population w random genes
  target = "To be, or not to be, that is the question.";
  p = new Population(1000, target.length, target);
  // frameRate(10);
}

function draw() {
  count++;
  if (flag) {
    //evaluate fitness score for population
    //relative to other creatures - rawfitness / totFitness of pop = score.

    p.evaluateFitness();
    var best = p.displayBest();
    if (best == target) flag = false;
    //reproduce - with probs according to fitness, crossover, mutation
    p.reproduce();
    //check if any one reached goal
    //display
    document.getElementById("demo2").innerHTML =
      count + " many generations have passed.";
  }
}
