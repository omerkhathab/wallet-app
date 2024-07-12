import { Sidebar } from "../../components/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }): JSX.Element {
    return (
        <div className="flex w-full">
            <div className="w-72 h-full">
                <Sidebar />
            </div>
            <div className="flex-1 h-full overflow-auto">
                {children}
            </div>
        </div>
    )
  }