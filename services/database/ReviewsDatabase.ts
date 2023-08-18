import { TReview } from "@/types/typings";
import { db, auth } from "@/config/firebaseConfig";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

export interface IReviewsDatabase {
    AddReview(review: TReview, tripID: string): void;
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
}

const reviewsDatabase = Object.freeze(new ReviewsDatabase());

export default reviewsDatabase;