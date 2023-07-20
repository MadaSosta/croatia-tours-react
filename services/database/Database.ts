import userDatabase, { IUserDatabase } from "@/services/database/UserDatabase";
import { TUser } from "@/types/typings";

interface IDatabase extends IUserDatabase {

}

class Database implements IDatabase {
    constructor(
        private userDatabase: IUserDatabase
    ) {}

    AddUser(user: TUser, uid: string) {
        this.userDatabase.AddUser(user, uid);
    }
}

const database = Object.freeze(new Database(
    userDatabase
));

export default database;