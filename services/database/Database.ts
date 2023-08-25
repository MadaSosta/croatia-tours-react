import userDatabase, { IUserDatabase } from "@/services/database/UserDatabase";
import { TReview, TTrip, TUser } from "@/types/typings";
import tripsDatabase, { ITripsDatabase } from "./TripsDatabase";
import reviewsDatabase, { IReviewsDatabase } from "./ReviewsDatabase";

interface IDatabase extends IUserDatabase, ITripsDatabase, IReviewsDatabase {

}

class Database implements IDatabase {
    constructor(
        private tripsDatabase: ITripsDatabase,
        private userDatabase: IUserDatabase,
        private reviewsDatabase: IReviewsDatabase,
    ) {}
    AddReview(review: TReview, tripID: string): void {
        this.reviewsDatabase.AddReview(review, tripID);
    }

    GetReviewsForTrip(tripID: string): Promise<{
        review: TReview;
        tripID: string;
    }[]> {
        return this.reviewsDatabase.GetReviewsForTrip(tripID);
    }

    AddFeaturedTrip(trip: TTrip): void {
        this.tripsDatabase.AddFeaturedTrip(trip);
    }

    UpdateFeaturedTrip(xid: string): void {
        this.tripsDatabase.UpdateFeaturedTrip(xid);
    }

    AddUser(user: TUser, uid: string) {
        this.userDatabase.AddUser(user, uid);
    }
}

const database = Object.freeze(new Database(
    tripsDatabase,
    userDatabase,
    reviewsDatabase,
));

export default database;