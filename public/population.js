class Population {
  constructor(size, length, target) {
    this.target = target;
    this.population = [];

    for (let i = 0; i < size; i++) {
      this.population[i] = new DNA(length);
    }
  }

  evaluateFitness() {
    this.maxFitness = -1;
    for (var creature of this.population) {
      creature.calcRawFitness(this.target);
      if (creature.rawFitness > this.maxFitness)
        this.maxFitness = creature.rawFitness;
    }

    //normalize with respect to the fitness of other creatures in the population
    for (var creature of this.population) {
      creature.fitScore = Math.floor(
        (creature.rawFitness / this.maxFitness) * 100
      );
    }
  }

  reproduce() {
    this.matingPool = [];
    for (var i = 0; i < this.population.length; i++) {
      //creatures with more fitness have more spots on mating pool
      for (var j = 0; j < this.population[i].fitScore; j++) {
        this.matingPool.push(i);
      }
    }
    this.crossover();
    this.population = this.children;
  }

  crossover() {
    this.children = [];
    for (var i = 0; i < this.population.length; i++) {
      var parent1 = Math.floor(Math.random() * this.matingPool.length);
      var parent2 = Math.floor(Math.random() * this.matingPool.length);

      while (parent1 == parent2) {
        parent2 = Math.floor(Math.random() * this.matingPool.length);
      }

      parent1 = this.population[this.matingPool[parent1]];
      parent2 = this.population[this.matingPool[parent2]];

      this.children[i] = parent1.cross(parent2);
    }
  }

  displayBest() {
    let bestGenes;
    let bestScore = -1;
    for (var creature of this.population) {
      if (creature.fitScore > bestScore) {
        bestScore = creature.fitScore;
        bestGenes = creature.genes;
      }
    }
    document.getElementById("demo").innerHTML = bestGenes;
    document.getElementById("demo").style.textAlign = "center";
    return bestGenes;
  }
}
