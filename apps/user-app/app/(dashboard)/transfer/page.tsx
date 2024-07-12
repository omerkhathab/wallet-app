import db from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { Transactions } from "../../../components/Transactions";
import { AddMoney } from "../../../components/AddMoney";
import { Balance } from "../../../components/Balance";

async function getBalance() {
    const session = await getServerSession(authOptions);
    const balance = await db.balance.findFirst({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return {
        amount: balance?.amount || 0,
    }
}

async function getTransactions() {
    const session = await getServerSession(authOptions);
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

export default async function() {
    const balance = await getBalance();
    let transactions = await getTransactions();
    transactions = transactions.reverse().splice(0,3); // get the recent three transactions only
    return <div className="w-full px-10">
        <div className="text-5xl text-[#6a51a6] px-4 pt-8 mb-8 font-bold">
            Transfer
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
            <div>
                <AddMoney />
            </div>
            <div>
                <Balance amount={balance.amount} />
                <div className="pt-4">
                    <Transactions transactions={transactions} />
                </div>
            </div>
        </div>
    </div>
}