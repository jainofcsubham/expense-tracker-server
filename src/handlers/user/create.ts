import { ERROR, OK } from "../../utils/handler";
import connectToMongo from "../../utils/mongoClient";
import { User } from "../../entities/User";
import { CustomRequest } from "../../types";
import { COLLECTIONS } from "../..//utils/collections";
import { Filter, UpdateFilter, UpdateOptions } from "mongodb";

export const addUser = async (req: CustomRequest) => {
    const {sub : user_id, email} = req.user
    try{
        const db = await connectToMongo();
        const userCollection = db.collection<User>(COLLECTIONS.USERS);
        const filter:Filter<User> = {user_id : req.user.sub} 
        const update: UpdateFilter<User> = {
            $setOnInsert : {
                user_id,
                email,
                last_fetch : new Date(0),
            }
        }
        const options:UpdateOptions = {upsert : true}
        const result = await userCollection.updateOne(filter,update,options)
        if (result.upsertedCount > 0) {
            return OK({message: "User Created."})
        } else {
            return OK({message: "User already exists."})
        }
    }catch(e){
        console.log("ERROR: ",e);
        return ERROR({message: "ERROR!! Something went wrong!!"})
    }
}