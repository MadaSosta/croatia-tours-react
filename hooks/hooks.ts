import useSWR from 'swr'
import { collection, doc, getDoc, getDocs, limit, orderBy, query, where } from 'firebase/firestore'

import { db } from '../config/firebaseConfig'

const latestUploadsImagesFetcher = async () => {
    const q = query(collection(db, "images"), orderBy("uploadDate", "desc"), limit(10));
    const latestUploadsImagesSnapshot = await getDocs(q)

    const data = latestUploadsImagesSnapshot.docs.map((doc) => doc.data());

    /* return data as TImageInfo[]; */
}

export const useLatestUploadsImages = () => {
    const { data, error } = useSWR('getlatestuploadsimages', latestUploadsImagesFetcher, { revalidateOnFocus: false });

    return {
        latestUploadsImagesData: data,
        isLoading: !error && !data,
        isError: error
    }
}