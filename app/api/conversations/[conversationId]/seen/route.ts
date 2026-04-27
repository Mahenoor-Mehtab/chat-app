import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/lib/prismadb";
// import { pusherServer } from "@/app/libs/pusher";

interface IParams {
  conversationId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  try {
    const currentUser = await getCurrentUser();
    const { conversationId } = await params;

    // Auth check
    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Conversation fetch with messages
    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
      include: {
        messages: {
          include: { seen: true },
        },
        users: true,
      },
    });

    if (!conversation) {
      return new NextResponse("Invalid ID", { status: 400 });
    }

    // Last message find karo
    const lastMessage = conversation.messages[conversation.messages.length - 1];

    if (!lastMessage) {
      return NextResponse.json(conversation);
    }

    // Seen update — current user ko seenIds mein add karo
    const updatedMessage = await prisma.message.update({
      where: { id: lastMessage.id },
      include: {
        sender: true,
        seen: true,
      },
      data: {
        seen: {
          connect: { id: currentUser.id }, // already seen hai toh duplicate nahi banega
        },
      },
    });

    // // Pusher se realtime update bhejo
    // await pusherServer.trigger(currentUser.email, "conversation:update", {
    //   id: conversationId,
    //   messages: [updatedMessage],
    // });

    // // Agar already seen hai toh early return
    // if (lastMessage.seenIds.indexOf(currentUser.id) !== -1) {
    //   return NextResponse.json(conversation);
    // }

    // // Conversation channel pe message:update trigger karo
    // await pusherServer.trigger(
    //   conversationId!,
    //   "message:update",
    //   updatedMessage
    // );

    return NextResponse.json(updatedMessage);
  } catch (error) {
    console.error("ERROR_MESSAGES_SEEN", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}