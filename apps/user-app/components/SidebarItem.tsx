"use client"
import { usePathname, useRouter } from "next/navigation"

export const SidebarItem = ({icon, title, href}: any) => {
    const router = useRouter();
    const pathname = usePathname();
    const selected = pathname==href
    return (
        <div onClick={()=>router.push(href)} className={`font-bold ${selected ? "text-[#6a51a6]" : "text-slate-800"} cursor-pointer`}>
            <div className={`flex py-5`}>
                <div className="pr-2">{icon}</div>
                <div>{title}</div>
            </div>
        </div>
    )
}