import { NextRequest, NextResponse } from 'next/server'
import { getDocs, query, where, collection, limit } from "firebase/firestore";
import { db } from "../../../config/firebaseConfig";
import database from "@/services/database/Database";

export async function GET(req: NextRequest, res: NextResponse) {
    const { searchParams } = req.nextUrl

    if (searchParams.has('tripID')) {
        const tripID = searchParams.get('tripID')

        if(tripID === null) return NextResponse.json(
            { error: 'No value for tripID provided' },
            { status: 400 }
        )

      const res = await database.GetReviewsForTrip(tripID)

      console.log(res)

        return NextResponse.json(res)
    } else {
        return NextResponse.json(
            { error: 'No tripID query paramater provided' }, 
            { status: 400 }
            )
    }
}