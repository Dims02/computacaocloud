export default function handler(req, res) {
    const startTime = performance.now();
    const { n } = req.query;
    const limit = parseInt(n);

    if (isNaN(limit) || limit < 2) {
        return res.status(200).json({ input: limit, primes: [] });
    }

    // 2. Initialize a "sieve" array
    // Uint8Array uses 1 byte per element, initialized to 0.
    // We'll treat 1 as "is prime" and 0 as "not prime".
    const isPrime = new Uint8Array(limit + 1).fill(1);
    isPrime[0] = 0; // 0 is not prime
    isPrime[1] = 0; // 1 is not prime

    const root = Math.sqrt(limit);
    for (let p = 2; p <= root; p++) {
        // If isPrime[p] is still 1, it's a prime
        if (isPrime[p] === 1) {
            // Mark all multiples of p starting from p * p as NOT prime
            // We start at p*p because smaller multiples (like 2p, 3p)
            // have already been marked by smaller primes.
            for (let i = p * p; i <= limit; i += p) {
                isPrime[i] = 0;
            }
        }
    }

    // 4. Collect the results
    const primes = [];
    for (let i = 2; i <= limit; i++) {
        if (isPrime[i] === 1) {
            primes.push(i);
        }
    }

    const endTime = performance.now();
    const duration = endTime - startTime;

    // 5. Return the response
    res.status(200).json({
        input: limit,
        count: primes.length,
        primes: primes,
        stats: {
            executionTimeMs: duration.toFixed(4),
            memoryHint: `${(limit / 1024 / 1024).toFixed(2)} MB (Sieve Size)`,
            computeTimestamp: new Date().toISOString()
        }
    });
}
