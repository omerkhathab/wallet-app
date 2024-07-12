import db from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { Card } from "@repo/ui/card";

async function getBalance(session: any) {
    const balance = await db.balance.findFirst({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return {
        amount: balance?.amount || 0,
    }
}
async function getUserDetails(session: any) {
    const user = await db.user.findFirst({
        where: {
            id: Number(session?.user?.id)
        }
    })
    return user;
}
export default async function() {
    const session = await getServerSession(authOptions);
    const user = await getUserDetails(session);
    const balance = await getBalance(session);

    return <div className="w-full px-10">
        <div className="text-5xl text-[#6a51a6] px-4 pt-8 mb-8 font-bold">
            Hello There
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
            <div>
                <Card title={"Your Details"}>
                <div className="flex justify-between border-b border-slate-300 py-3">
                    <div>User Id</div>
                    <div>{user?.id || "Not Found"}</div>
                </div>
                <div className="flex justify-between border-b border-slate-300 py-3">
                    <div>Phone Number</div>
                    <div>{user?.number || "Not Found"}</div>
                </div>
                <div className="flex justify-between border-b border-slate-300 py-3">
                    <div>Email</div>
                    <div>{user?.email || "Not Found"}</div>
                </div>
                <div className="flex justify-between border-b border-slate-300 py-3">
                    <div>Balance</div>
                    <div>INR {balance.amount / 100}</div>
                </div>
                </Card>
            </div>
        </div>
    </div>
}