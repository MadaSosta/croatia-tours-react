import { TUser } from "@/types/typings";
import { db, auth } from "@/config/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

export interface IUserDatabase {
    AddUser(user: TUser, uid: string): void;
}

class UserDatabase implements IUserDatabase {

    AddUser(user: TUser, uid: string) {
        const {
            email,
            username,
        } = user

        const userRef = doc(db, "users", uid);
        setDoc(userRef, {
            uid,
            email,
            username,
        })
            .catch((error) => {
                throw new Error(error);
            });
    }
}

const userDatabase = Object.freeze(new UserDatabase());

export default userDatabase;