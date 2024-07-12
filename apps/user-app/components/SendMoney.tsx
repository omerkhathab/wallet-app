"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import { createTransfer } from "../app/lib/actions/createTransfer";

export function SendMoney({balance}:{balance: number}) {
    const [number, setNumber] = useState("");
    const [amount, setAmount] = useState("");

    return <div className="h-[90vh]">
        <Center>
        <Card title="Send">
            <div className="min-w-72 pt-2">
                <div>Your Balance: INR {balance}</div>
                <TextInput placeholder={"12345"} label="Phone Number" onChange={(value) => {
                    setNumber(value)
                }} />
                <TextInput placeholder={"100"} label="Amount" onChange={(value) => {
                    setAmount(value)
                }} />
                <div className="pt-4 flex justify-center">
                    <Button onClick={() => {
                        createTransfer(number, Number(amount)*100).then(res=>{
                            alert(res.message)
                            if(res.message == "Transfer Successful") window.location.reload();
                        })
                    }}>Send</Button>
                </div>
            </div>
        </Card>
        </Center>
    </div>
}