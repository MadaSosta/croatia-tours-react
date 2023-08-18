import useSWR from 'swr'
import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore'

import { db } from '../config/firebaseConfig'
import { TReview, TTrip } from '@/types/typings';

const featuredTripsFetcher = async () => {
    const q = query(collection(db, "featuredTrips"), orderBy("viewCount", "desc"), limit(7));
    const latestTripsSnapshot = await getDocs(q)

    const data = latestTripsSnapshot.docs.map((doc) => doc.data().trip);

     return data as TTrip[]; 
}

export const useFeaturedTrips = () => {
    const { data, error } = useSWR('featuredTrips', featuredTripsFetcher, { revalidateOnFocus: false });

    return {
        featuredTrips: data,
        isLoading: !error && !data,
        isError: error
    }
}
const reviewsFetcher = async (tripID: string) => {
    const q = query(collection(db, "reviews"), 
    where("tripID", "==", tripID), limit(5));
    const latestReviews = await getDocs(q)

    const data = latestReviews.docs.map((doc) => doc.data());

     return data as {
            review: TReview,
            tripID: string,
     }[]; 
}

export const useReviews = (tripID: string) => {
    const { data, error } = useSWR(`reviews${tripID}`, () =>reviewsFetcher(tripID), { revalidateOnFocus: false });

    return {
        reviews: data,
        isLoading: !error && !data,
        isError: error
    }
}