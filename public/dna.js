class DNA {
  static mutationRate = 0.001;
  constructor(length, genes, mutationRate) {
    if (length == -1) {
      this.genes = genes;
    } else {
      this.genes = "";
      for (let j = 0; j < length; j++) {
        this.genes += this.getRandomGene();
      }
    }
  }

  getRandomGene() {
    let letters = ".;, abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return letters.charAt(Math.floor(Math.random() * letters.length));
  }

  calcRawFitness(target) {
    this.rawFitness = 0;
    for (let i = 0; i < this.genes.length; i++) {
      this.rawFitness += this.genes.charAt(i) == target.charAt(i) ? 1 : 0;
    }
  }

  cross(other) {
    var midpt = Math.floor(Math.random() * this.genes.length);
    var childGenes = "";
    for (var i = 0; i < this.genes.length; i++) {
      childGenes += i < midpt ? this.genes.charAt(i) : other.genes.charAt(i);
    }
    childGenes = this.mutate(childGenes);
    return new DNA(-1, childGenes);
  }

  mutate(genes) {
    for (var i = 0; i < genes.length; i++) {
      if (Math.random() < DNA.mutationRate)
        genes =
          genes.substring(0, i) +
          this.getRandomGene() +
          genes.substring(i + 1, genes.length);
    }
    return genes;
  }
}
