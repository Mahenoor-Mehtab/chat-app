import getConversationById from "@/app/actions/getConversationById";
import getMessages from "@/app/actions/getMessages";
import EmptyState from "@/app/components/EmptyState";
import Header from '@/app/conversations/[conversationId]/components/Header'
import Body from "./components/Body";
import Form from "./components/Form";

interface IParams{
    conversationId: string
}


const ConversationId = async ({params}: {params:IParams})=>{
   const { conversationId } = await params;  
    
    const conversation = await getConversationById(conversationId);
    const messages = await getMessages(conversationId);
    if(!conversation){
        return (
            <div>
                <div>
                    <EmptyState/>
                </div>
            </div>
        )
    }


    return (
        <div>
          <div>
            <Header conversation={conversation}/>

            <Body/>
            <Form/>
          </div>
        </div>
    )
}

export default ConversationId;