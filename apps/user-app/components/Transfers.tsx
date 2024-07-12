import { Card } from "@repo/ui/card"

interface Transfer {
    id: number,
    time: string,
    amount: number,
    from: number,
    to: number
}
export const Transfers = ({ transfers, userId }: { transfers: Transfer[] , userId: Number}) => {
    if (!transfers.length) {
        return <Card title="Recent transfers">
            <div className="text-center pb-8 pt-8">
                No Transfers
            </div>
        </Card>
    }
    return <Card title="Recent Transfers">
        <div className="pt-2">
            {transfers.map(t => <div key={t.id} className="flex justify-between py-1">
                <div>
                    <div className="text-sm">
                        {t.from == userId ? "Sent" : "Received"}
                    </div>
                    <div className="text-slate-600 text-xs">
                        {t.time}
                    </div>
                </div>
                <div className="flex flex-col justify-center">
                    Rs {t.amount / 100}
                </div>
            </div>)}
        </div>
    </Card>
}