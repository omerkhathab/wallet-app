import db from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { SendMoney } from "../../../components/SendMoney";

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

export default async function() {
    const balance = await getBalance();
    return <div className="w-full px-10">
        <div>
            <SendMoney balance={balance.amount / 100}/>
        </div>
    </div>
}