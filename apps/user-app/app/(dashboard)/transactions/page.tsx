import { getServerSession } from "next-auth";
import { Transactions } from "../../../components/Transactions";
import { authOptions } from "../../lib/auth";
import db from "@repo/db/client";
import { Transfers } from "../../../components/Transfers";
import { Center } from "@repo/ui/center";

async function getTransactions(session: any) {
    const txns = await db.transaction.findMany({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return txns.map(t => ({
        txnId: t.id,
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider
    }))
}

async function getTransfers(session: any) {
    const transfers = await db.p2pTransfer.findMany({
        where: {
            OR: [
                {fromUserId: Number(session?.user?.id)},
                {toUserId: Number(session?.user?.id)}
            ]
        }
    });
    return transfers.map(t=>({
        id: t.id,
        amount: t.amount,
        time: t.timestamp.toDateString(),
        from: t.fromUserId,
        to: t.toUserId
    }))
}

export default async function() {
    const session = await getServerSession(authOptions);
    const transactions = await getTransactions(session);
    const transfers = await getTransfers(session);
    return <div className="w-full py-10">
        <Center>
        <div className="flex w-full">
            <div className="px-5 w-1/2">
                <Transactions transactions={transactions} />
            </div>
            <div className="pr-5 w-1/2">
                <Transfers transfers={transfers} userId={session?.user?.id}/>
            </div>
        </div>
        </Center>
    </div>
}