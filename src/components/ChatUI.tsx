'use client';

import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
  MainContainer,
  Sidebar,
  Search,
  ConversationList,
  Conversation,
  ChatContainer,
  ConversationHeader,
  MessageList,
  TypingIndicator,
  Message,
  MessageInput,
} from '@chatscope/chat-ui-kit-react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Chat, setActiveChat } from '@/redux/reducers/chatReducer';
import { toast } from 'react-toastify';
import useChatQuery from '@/hooks/useChatQuery';
import useChatMutation from '@/hooks/useChatMutation';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import useConversationQuery from '@/hooks/useConversationQuery';
import useContextQuery from '@/hooks/useContextQuery';
import ChooseContextModal from './ChooseContextModal';
import { ChangeEvent, act, useState } from 'react';
import AppContextCard from './AppContextCard';
import useContextMutation from '@/hooks/useContextMutation';
import useConversationMutation from '@/hooks/useConversationMutation';
import TrialCreditCard from './TrialCreditCard';
import AppInput from './AppInput';

interface ChatManager {
  createChat: (chat: { title?: string; description?: string }) => Promise<Chat | null>;
  logout: () => Promise<void>;
}

const ChatUI = (props: ChatManager) => {
  const dispatch = useAppDispatch();
  const activeChat = useAppSelector((state) => state.chat.activeChat);
  const chatQuery = useChatQuery();
  const conversationsQuery = useConversationQuery(activeChat?.id.toString());
  const { chatContexts } = useContextQuery(activeChat?.id.toString());
  const { createChatMutation, removeChatContextMutation } = useChatMutation({
    onCreateChatSuccess: async (data) => {
      await chatQuery.refetch();
      if (data) {
        dispatch(setActiveChat(data));
      }
    },
    onRemoveChatContextSuccess: () => {
      chatContexts.refetch();
    },
  });
  const chats = chatQuery.data || [];
  const conversations = conversationsQuery.data || [];
  const botIsTyping = false;
  const [showContextModal, setShowContextModal] = useState(false);
  const [text, setText] = useState('');
  const { addContextMutation } = useContextMutation({
    onAddContextSuccess: async () => {
      await chatContexts.refetch();
      setShowContextModal(false);
    },
  });
  const { addConversationMutation } = useConversationMutation({
    onAddConversationSuccess: () => {
      conversationsQuery.refetch();
    },
  });
  const handleCreateChat = async (e: any) => {
    e.preventDefault();
    createChatMutation.mutate({ title: 'New Chat', description: 'Chat Description' });
  };
  const handleLogout = async (e: any) => {
    e.preventDefault();
    await props.logout();
    toast.success('Logged out');
  };
  const handleAddContext = async (context: any) => {
    addContextMutation.mutate({
      chatId: activeChat?.id.toString() as string,
      contextId: context.id,
    });
  };
  const handleSubmitMessage = async () => {
    addConversationMutation.mutate({
      chat_id: activeChat?.id.toString() as string,
      message: text,
    });
  };

  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      <TrialCreditCard percentage={80} onDismissClick={() => true} onUpgradeClick={() => true} />
      <AppInput placeholder="Enter your email" label="Email" value={''} onChange={function (e: ChangeEvent<HTMLInputElement>): void {
        throw new Error('Function not implemented.');
      } }/>
      <MainContainer responsive>
        <Sidebar position="left">
          <Search placeholder="Search..." />
          <Button onClick={handleCreateChat}>Add Chat</Button>
          <ConversationList>
            {chatQuery.isLoading ? (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100vh',
                }}
              >
                <CircularProgress />
              </Box>
            ) : (
              chats.map((chat, index) => {
                return (
                  <Conversation
                    key={index}
                    active={activeChat?.id === chat.id}
                    name={chat.title}
                    info={chat.description}
                    onClick={() => {
                      dispatch(setActiveChat(chat));
                    }}
                  />
                );
              })
            )}
          </ConversationList>
        </Sidebar>

        <ChatContainer>
          <ConversationHeader>
            <ConversationHeader.Actions></ConversationHeader.Actions>
            <ConversationHeader.Content userName="ICT AI" />
            <ConversationHeader.Actions>
              <Button onClick={handleLogout}>Logout</Button>
            </ConversationHeader.Actions>
          </ConversationHeader>

          <MessageList typingIndicator={botIsTyping ? <TypingIndicator content="AI is typing" /> : null}>
            {activeChat ? (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  borderBottom: '1px solid black',
                  height: '70px',
                }}
              >
                {chatContexts.isLoading ? (
                  <CircularProgress />
                ) : (
                  <>
                    {chatContexts.data && chatContexts.data.length > 0 ? (
                      chatContexts.data.map((chatCtx, index) => (
                        <>
                          <AppContextCard
                            key={index}
                            name={chatCtx.context.name}
                            description={chatCtx.context.description}
                            handleClick={() => true}
                          />
                          <Button
                            size="small"
                            onClick={() =>
                              removeChatContextMutation.mutate({
                                chatId: activeChat.id.toString(),
                                contextId:
                                  chatContexts && chatContexts.data && (chatContexts.data[0].context.id as string),
                              })
                            }
                          >
                            Clear context
                          </Button>
                        </>
                      ))
                    ) : (
                      <Box>
                        <Typography>No contexts found</Typography>
                        <Button size="small" onClick={() => setShowContextModal(true)}>
                          Add context
                        </Button>
                      </Box>
                    )}
                  </>
                )}
              </Box>
            ) : (
              <Typography>Select a chat to start conversation</Typography>
            )}

            {conversations.map((message, index) => (
              <Message
                key={index}
                style={{ width: '90%' }}
                model={{
                  type: 'custom',
                  sender: message.speaker,
                  position: 'single',
                  direction: message.speaker === 'ai' ? 'incoming' : 'outgoing',
                }}
              >
                <Message.CustomContent>
                  <ReactMarkdown>{message.entry}</ReactMarkdown>
                </Message.CustomContent>
                <Message.Footer
                  sentTime={new Date(message.created_at).toLocaleTimeString()}
                  sender={message.speaker === 'ai' ? 'AI' : 'You'}
                />
              </Message>
            ))}
          </MessageList>
          <MessageInput
            placeholder="Type message here"
            onSend={handleSubmitMessage}
            onChange={(e, text) => {
              setText(text);
            }}
            sendButton={true}
            autoFocus
          />
        </ChatContainer>
      </MainContainer>

      <ChooseContextModal
        open={showContextModal}
        setOpen={setShowContextModal}
        handleAddContext={handleAddContext}
        isLoading={addContextMutation.isPending}
      />
    </div>
  );
};

export default ChatUI;
