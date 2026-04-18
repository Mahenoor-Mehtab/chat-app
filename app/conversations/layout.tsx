import Sidebar from "../components/sidebar/Sidebar";
import ConversationList from "./components/ConversationList";
import getConversations from "../actions/getConversation";

export default async function ConversationsLayout({
    children
}:{children: React.ReactNode }){

    const conversations = await getConversations()

    return (
        <Sidebar>
            <div className="h-full bg-[#0f0c29]">
                <ConversationList initialItems={conversations} />
                {children}
            </div>
        </Sidebar>
    )
}