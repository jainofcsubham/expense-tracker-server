import { ERROR, OK } from "../../utils/handler";
import connectToMongo from "../../utils/mongoClient";
import { CustomRequest } from "../../types";
import { COLLECTIONS } from "../..//utils/collections";
import { Budget } from "../../entities/Budget";

export const getBudget = async (req: CustomRequest) => {
    const {sub : user_id} = req.user
    const {month, year} = req.query
    const month_string = `${month}/${year}`;
    try{
        const db = await connectToMongo();
        const budgetCollection = db.collection<Partial<Budget>>(COLLECTIONS.BUDGETS);
        const cursor= await budgetCollection.find({user_id,month:month_string})
        const data = await cursor.toArray();
        if(!data || (data && !data.length)){
            return ERROR({message: "Budget is not allocated yet."})
        }
        return OK({message : "Allocated Budget Found",data})
        // const records: Partial<Budget>[] = allocation.map((each:any) => {
        //     return {
        //         user_id,
        //         month : month_string,
        //         category_id : each.category_id,
        //         allocated_amount : each.allocated_amount
        //     }
        // })
        // const data = await budgetCollection.insertMany(records)
        // return OK({message: "Budget Created.",data})
    }catch(e){
        console.log("ERROR: ",e);
        return ERROR({message: "ERROR!! Something went wrong!!"})
    }
}