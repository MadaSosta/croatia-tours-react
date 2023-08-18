import { TTrip, TUser } from "@/types/typings";
import { db, auth } from "@/config/firebaseConfig";
import { doc, increment, setDoc } from "firebase/firestore";

export interface ITripsDatabase {
    AddFeaturedTrip(trip: TTrip): void;
    UpdateFeaturedTrip(xid: string): void;
}

class TripsDatabase implements ITripsDatabase {

    AddFeaturedTrip(trip: TTrip) {
        const tripRef = doc(db, "featuredTrips", trip.xid);
        setDoc(tripRef, {
            trip,
            viewCount: increment(1)
            
        } , { merge: true})
            .catch((error) => {
                throw new Error(error);
            });
    }

    UpdateFeaturedTrip(xid: string) {
        const tripRef = doc(db, "featuredTrips", xid);
        setDoc(tripRef, {
            viewCount: increment(1)
        }, { merge: true })
            .catch((error) => {
                throw new Error(error);
            });
    }

}

const tripsDatabase = Object.freeze(new TripsDatabase());

export default tripsDatabase;