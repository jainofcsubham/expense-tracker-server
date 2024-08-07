import { Request } from "express";

export interface RequestReturnType {
    status : number,
    data : any
}

export interface CustomRequest extends Request {
    user ?: any
}

export interface TransactionData {
    amount: number;
    transactionType: 'debit' | 'credit';
    transactionMethod: 'debit' | 'credit';
}