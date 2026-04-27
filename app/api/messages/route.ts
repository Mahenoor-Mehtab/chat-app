import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import  prisma  from "@/app/lib/prismadb"

export async function POST(request: Request) {
    try {
        const currentUser = await getCurrentUser();

        // Case 1: User logged in nahi hai
        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const body = await request.json();
        const { message, image, conversationId } = body;

        //  Case 2: ConversationId missing
        if (!conversationId) {
            return new NextResponse('ConversationId is required', { status: 400 });
        }

        //  Case 3: Message aur image dono missing
        if (!message && !image) {
            return new NextResponse('Message or image required', { status: 400 });
        }

        // Case 4 & 5: Conversation exist karti hai + user member hai?
        const conversation = await prisma.conversation.findUnique({
            where: { id: conversationId }
        });

        if (!conversation) {
            return new NextResponse('Conversation not found', { status: 404 });
        }

        if (!conversation.userIds.includes(currentUser.id)) {
            return new NextResponse('Forbidden', { status: 403 });
        }

        // Message create karo
        const newMessage = await prisma.message.create({
            data: {
               body: message || null,
image: image || null,
                conversation: { connect: { id: conversationId } },
                sender: { connect: { id: currentUser.id } }, 
                seen: { connect: { id: currentUser.id } }     
            },
            include: { seen: true, sender: true }
        });

        // Conversation update karo
        await prisma.conversation.update({
            where: { id: conversationId },
            data: {
                lastMessageAt: new Date(),
                messages: { connect: { id: newMessage.id } }
            },
            include: {
                users: true,
                messages: { include: { seen: true } }
            }
        });

        //  Case 6: Success response bhejo ✅
        return NextResponse.json(newMessage, { status: 200 });

    } catch (error: any) {
        console.log(error, 'Error_Messages');
        return new NextResponse('Internal Error', { status: 500 });
    }
}