// factorial function with cache
function memfactorial(n) {
    if (!memfactorial.cache) {
        memfactorial.cache = {
            '0': 1,
            '1': 1,
        };
    }

    if (!memfactorial.cache.hasOwnProperty(n)) {
        memfactorial.cache[n] = n * memfactorial(n - 1);
    }

    return memfactorial.cache[n];
}

// general memoization function
function memoze(fundamental, cache) {
    cache = cache || {};

    var shell = function(arg) {
        if (!cache.hasOwnProperty(arg)) {
            cache[arg] = fundamental(arg);
        }
        return cache[arg];
    };

    return shell;
}