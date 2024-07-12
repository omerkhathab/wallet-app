import express from "express";
import db from "@repo/db/client"
const app = express();
app.use(express.json());

app.post("/webhook", async (req,res)=>{
    const paymentInfo: { txnId: string, userId: string, amount: string }= {
        txnId: req.body.txnId,
        userId: req.body.userId,
        amount: req.body.amount
    }
    try {
        const txn = await db.transaction.findFirst({
            where: {
                id: Number(paymentInfo.txnId)
            }
        })
        if(txn?.status == "Success"){
            return res.json({
                message: "Transaction already processed."
            })
        }
    } catch(error){
        res.json({
            message: "there was an error.",
            error
        })
    }
    try {
        await db.$transaction([
            db.balance.update({
                where: {
                    userId: Number(paymentInfo.userId)
                },
                data: {
                    amount: {
                        increment: Number(paymentInfo.amount)
                    }
                }
            }),
            db.transaction.update({
                where: {
                    id: Number(paymentInfo.txnId)
                }, 
                data: {
                    status: "Success"
                }
            })
        ])
        res.json({
            message: "transaction successful"
        })
    } catch (error) {
        res.json({
            message: "there was an error.",
            error
        })
    }
})

app.listen(3003);