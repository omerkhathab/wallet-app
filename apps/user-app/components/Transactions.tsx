import { Card } from "@repo/ui/card"
interface Transaction {
    txnId: number,
    time: Date,
    amount: number,
    status: "Processing" | "Success" | "Failure",
    provider: string
}
export const Transactions = ({ transactions }: { transactions: Transaction[] }) => {
    if (!transactions.length) {
        return <Card title="Recent Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }
    return <Card title="Recent Transactions">
        <div className="pt-2">
            {transactions.map(txn => <div key={txn.txnId} className="flex justify-between py-1">
                <div>
                    <div className="text-sm">
                        {txn.status}
                    </div>
                    <div className="text-slate-600 text-xs">
                        {txn.time.toDateString()}
                    </div>
                </div>
                <div className="flex flex-col justify-center">
                    Rs {txn.amount / 100}
                </div>

            </div>)}
        </div>
    </Card>
}