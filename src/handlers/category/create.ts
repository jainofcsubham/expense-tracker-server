import { ERROR, OK } from "../../utils/handler";
import connectToMongo from "../../utils/mongoClient";
import { CustomRequest } from "../../types";
import { COLLECTIONS } from "../..//utils/collections";
import { Filter, UpdateFilter, UpdateOptions } from "mongodb";
import { Category } from "../../entities/Category";

export const addCategory = async (req: CustomRequest) => {
    const {sub : user_id} = req.user
    const {label} = req.body
    try{
        const db = await connectToMongo();
        const categoryCollection = db.collection<Category>(COLLECTIONS.CATEGORIES);
        const filter:Filter<Category> = {user_id,label} 
        const update: UpdateFilter<Category> = {
            $setOnInsert : {
                user_id,
                label,
            }
        }
        const options:UpdateOptions = {upsert : true}
        const result = await categoryCollection.updateOne(filter,update,options)
        if (result.upsertedCount > 0) {
            return OK({message: "Category Created."})
        } else {
            return ERROR({message: "Category already exists."})
        }
    }catch(e){
        console.log("ERROR: ",e);
        return ERROR({message: "ERROR!! Something went wrong!!"})
    }
}