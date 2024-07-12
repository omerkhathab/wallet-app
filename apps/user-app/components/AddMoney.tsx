"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { useState } from "react";
import { TextInput } from "@repo/ui/textinput";
import { createTransaction } from "../app/lib/actions/createTransaction";

const banks:{name: string, url: string}[] = [{
    name: "HDFC Bank",
    url: "https://netbanking.hdfcbank.com"
}, {
    name: "ICICI Bank",
    url: "https://www.icicibank.com/"
}];

export const AddMoney = () => {
    const [url, setUrl] = useState(banks[0]?.url);
    const [amount, setAmount] = useState(0);
    const [provider, setProvider] = useState<string>(banks[0]?.name || "");
    return (
    <Card title="Add Money">
        <div className="w-full">
            <TextInput label={"Amount"} placeholder={"Amount"} onChange={(e) => {setAmount(Number(e))}} />
            <div className="py-4 text-left">Bank</div>
            <Select onSelect={(value) => {
                setUrl(banks.find(x => x.name === value)?.url || "")
                setProvider(banks.find(x => x.name === value)?.name || "")
            }} options={banks.map(x => ({
                key: x.name,
                value: x.name
            }))} />
            <div className="flex justify-center pt-4">
                <Button onClick={async () => {
                    await createTransaction(provider,amount).then(value=>alert(value.message)).then(()=>window.location.reload());
                    // window.location.href = url || "";
                }}>
                Add Money
                </Button>
            </div>
        </div>
    </Card>
    )
}