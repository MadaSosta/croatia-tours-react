import { BASE_API_URL_GEONAME, BASE_API_URL_RADIUS, LIMIT, RADIUS } from '@/constants/consts'
import { TRadius, type TGeoname, TRadiusApiResponse } from '@/types/typings'
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {

    const query = req?.url?.split('?')[1];
    const searchQuery = query?.split('=')[1];
    console.log(searchQuery);

    if(!searchQuery) return NextResponse.error()

    const geoNameSearchParams = new URLSearchParams( { 
      apikey: process.env.TRIP_MAP_API_KEY!,
      name: searchQuery })

    const geonameResponse = await fetch(`${BASE_API_URL_GEONAME}?` + geoNameSearchParams)

    const geonameData = await geonameResponse.json() as TGeoname

    const radiusQueryParams = new URLSearchParams({
      apikey: process.env.TRIP_MAP_API_KEY!,
      lat: geonameData.lat.toString(),
      lon: geonameData.lon.toString(),
      radius: RADIUS,
      limit: LIMIT,
    })

    const radiusResponse = await fetch(`${BASE_API_URL_RADIUS}?` + radiusQueryParams)

    const radiusData = await radiusResponse.json() as TRadiusApiResponse

    console.log(radiusData)
    return NextResponse.json({ 
     radiusData,
    })
  } catch (error) {
    return NextResponse.error()
  }

}