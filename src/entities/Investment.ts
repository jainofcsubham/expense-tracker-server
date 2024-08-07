export interface Investment {
    _id : string,
    user_id : string,
    transaction_id : string,
    investment_category_id : string,
    month : string,
    amount : number,
    type : "CREDIT" | "DEBIT"
}