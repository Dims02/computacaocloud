import { NextResponse, NextRequest } from 'next/server';

import { getPrimes } from '../../utils/primes';
 
export async function GET(request: NextRequest) {

    const primes = getPrimes(1000);

    return NextResponse.json({primes: primes});

}
