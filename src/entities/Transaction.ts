export interface Transaction {
    _id : string,
    user_id : string,
    category_id : string,
    type : "DEBIT" | "CREDIT",
    card_type : "DEBIT" | "CREDIT",// This tells whether the transaction is related to Debit Card or credit
    amount : number,
    isInvestmentRelated : boolean,
    notes : string,
    share : number, // This tells from the whole amount how much amount is my expense  and the remaining is something I will be getting back.
}