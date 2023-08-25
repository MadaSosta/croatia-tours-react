import { TReview } from "@/types/typings";
import { db, auth } from "@/config/firebaseConfig";
import { addDoc, collection, doc, setDoc, query, getDocs, limit, where } from "firebase/firestore";

export interface IReviewsDatabase {
    AddReview(review: TReview, tripID: string): void;
    GetReviewsForTrip(tripID: string): Promise<{
        review: TReview;
        tripID: string;
    }[]>;
}

class ReviewsDatabase implements IReviewsDatabase {

    AddReview(review: TReview, tripID: string) {
        
        const reviewRef = collection(db, "reviews");
        addDoc(reviewRef, {
            review,
            tripID,
        })
            .catch((error) => {
                throw new Error(error);
            });
    }

    GetReviewsForTrip(tripID: string) {
        const q = query(collection(db, "reviews"), where("tripID", "==", tripID), limit(5));

        const response = getDocs(q)
        .then((querySnapshot) => {
            const data = querySnapshot.docs.map((doc) => doc.data());
            return data as unknown as {
                review: TReview;
                tripID: string;
            }[]
        }).catch((error) => {
            throw new Error(error);
        });

        return response;
    }
}

const reviewsDatabase = Object.freeze(new ReviewsDatabase());

export default reviewsDatabase;