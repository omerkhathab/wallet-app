"use server"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import db from "@repo/db/client"

export const createTransaction = async (provider: string, amount: number) => {
    const session = await getServerSession(authOptions);
    if(!session?.user || !session?.user.id){
        return {
            message: "unauthenticated request"
        }
    }
    try {
        const txn = await db.transaction.create({
            data: {
                amount: amount * 100,
                startTime: new Date(),
                userId: Number(session?.user.id),
                provider: provider,
                status: "Processing"
            }
        });
        console.log(txn);
        return {
            message: "Transaction Processing",
            txnId: txn.id
        }
    } catch(e){
        console.log(e);
        return {
            message: "Error Processing Transaction. Try Again."
        }
    }
}