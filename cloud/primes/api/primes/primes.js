// api/primes.js

export default function handler(req, res) {
    // 1. Get the number 'n' from the URL query string
    const { n } = req.query;
    const limit = parseInt(n);

    if (isNaN(limit)) {
        return res.status(400).json({ error: "Please provide a valid number in the URL (e.g., ?n=10)" });
    }

    // 2. Your prime number logic
    const primes = [];
    for (let i = 2; i <= limit; i++) {
        let isPrime = true;
        for (let j = 2; j <= Math.sqrt(i); j++) {
            if (i % j === 0) {
                isPrime = false;
                break;
            }
        }
        if (isPrime) primes.push(i);
    }

    // 3. Return the result as JSON
    res.status(200).json({
        input: limit,
        primes: primes
    });
}
