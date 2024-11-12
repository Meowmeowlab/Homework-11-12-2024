function hill_climbing(f, x0) {
    let x = x0; // initial solution
    while (true) {
        const neighbors = generate_neighbors(x); // generate neighbors of x
        const best_neighbor = neighbors.reduce((a, b) => (f(a) > f(b) ? a : b)); // find the neighbor with the highest function value
        if (f(best_neighbor) <= f(x)) {
            // if the best neighbor is not better than x, stop
            return x;
        }
        x = best_neighbor; // otherwise, continue with the best neighbor
    }
}
