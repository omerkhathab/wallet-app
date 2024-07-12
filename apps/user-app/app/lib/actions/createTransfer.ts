"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import db from "@repo/db/client"

export const createTransfer = async (number: string, amount: number) => {
    const session = await getServerSession(authOptions);
    if(!session?.user || !session?.user.id){
        return {
            message: "unauthenticated request"
        }
    }
    const toUser = await db.user.findFirst({
        where: {
            number: number
        }
    })
    if(!toUser || session.user.id == toUser.id){
        return {
            message: "User not found"
        }
    }
    await db.$transaction(async (txn)=>{
        // locking the current row so that no double transaction takes place
        await txn.$queryRaw`SELECT * FROM "Balance" where "userId"=${Number(session.user.id)} FOR UPDATE`;
        const balance = await txn.balance.findUnique({
            where: {
                userId: Number(session.user.id)
            }
        })
        if(!balance || balance.amount < amount){
            return {
                message: "Balance not enough to send"
            }
        }
        await txn.balance.update({
            where: {
                userId: Number(session.user.id)
            },
            data: {
                amount: {
                    decrement: amount
                }
            }
        })
        await txn.balance.update({
            where: {
                userId: Number(toUser.id)
            },
            data: {
                amount: {
                    increment: amount
                }
            }
        });
        await txn.p2pTransfer.create({
            data: {
                amount: amount,
                fromUserId: Number(session.user.id),
                toUserId: Number(toUser.id),
                timestamp: new Date()
            }
        });
    });
    return {
        message: "Transfer Successful"
    }
}