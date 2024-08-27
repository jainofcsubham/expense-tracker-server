import { ERROR, OK } from "../../utils/handler";
import connectToMongo from "../../utils/mongoClient";
import { CustomRequest } from "../../types";
import { COLLECTIONS } from "../..//utils/collections";
import { Budget } from "../../entities/Budget";

export const addBudget = async (req: CustomRequest) => {
    const {sub : user_id} = req.user
    const {month, year,allocation} = req.body
    const month_string = `${month}/${year}`;
    try{
        const db = await connectToMongo();
        const budgetCollection = db.collection<Partial<Budget>>(COLLECTIONS.BUDGETS);
        const record= await budgetCollection.findOne({user_id,month:month_string})
        if(record){
            return ERROR({message: "Budget already exists."})
        }
        const records: Partial<Budget>[] = allocation.map((each:any) => {
            return {
                user_id,
                month : month_string,
                category_id : each.category_id,
                allocated_amount : each.allocated_amount
            }
        })
        const data = await budgetCollection.insertMany(records)
        return OK({message: "Budget Created.",data})
    }catch(e){
        console.log("ERROR: ",e);
        return ERROR({message: "ERROR!! Something went wrong!!"})
    }
}