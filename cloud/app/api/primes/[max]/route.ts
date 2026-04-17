import { NextRequest, NextResponse} from "next/server";

import { getPrimes } from '../../../utils/primes';

export function GET(req: NextRequest, { params }: {params: any}) {

    const max = parseInt(params.max);

    if (isNaN(max) || max < 0)
        return NextResponse.json({error: 'Invalid number. Correct usage: /api/primes/[max] where [max] is a positive number.'});


    const primes = getPrimes(max);

    return NextResponse.json({primes: primes});
}