import { ERROR, OK } from "../../utils/handler";
import connectToMongo from "../../utils/mongoClient";
import { CustomRequest } from "../../types";
import { COLLECTIONS } from "../..//utils/collections";
import { Category } from "../../entities/Category";

export const readCategory = async (req: CustomRequest) => {
    const {sub : user_id} = req.user
    try{
        const db = await connectToMongo();
        const categoryCollection = db.collection<Category>(COLLECTIONS.CATEGORIES);
        const cursor = await categoryCollection.find({user_id})
        const data = await cursor.toArray()
        return OK(data)
    }catch(e){
        console.log("ERROR: ",e);
        return ERROR({message: "ERROR!! Something went wrong!!"})
    }
}