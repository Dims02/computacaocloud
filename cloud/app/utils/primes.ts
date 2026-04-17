export function getPrimes(max: number) {
    let primes: number[] = [2,3];

    if(max < 2)
        return [];

    if(max == 2)
        return [2];

    if(max < 5)
        return primes;
    
    for (let i = 5; i <= max; i += 2) {

        if (isPrime(i, primes))
            primes.push(i);

    }

    return primes;
}

function isPrime(num: number, primes: number[]) {
    
    const half = Math.floor(num / 2);

    for (let i = 0; i < num; i++) {

        if (i < primes.length && num % primes[i] === 0) 
            return false;

        if (i == half)
            return true;

    }

}