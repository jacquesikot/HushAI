'use client';

import { useRef, useState } from 'react';
import { useChat } from 'ai/react';
import ChatHeader from '@/components/chat/ChatHeader';
import ChatInput from '@/components/chat/ChatInput';
import ChatMessage from '@/components/chat/ChatMessage';
import type { ChatMessage as IChatMessage } from '@/types';
import styled from 'styled-components';

const PageWrapper = styled.div`
  display: flex;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.background['bg-primary'].value};
`;

const ContextSection = styled.div`
  display: flex;
  width: 50%;

  @media (max-width: 768px) {
    display: none;
  }
`;

const ChatSection = styled.div`
  display: flex;
  width: 50%;
  flex-direction: column;
  border-left: 1px solid ${(props) => props.theme.colors.border['border-secondary'].value};

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ChatMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: ${(props) => props.theme.spacing['spacing-2xl'].value};
  flex: 1;
`;

interface Props {
  messages: IChatMessage[];
  userId: string;
  chatId: string;
}

const PlaygroundPage = (props: Props) => {
  const [chatMessages, setChatMessages] = useState<IChatMessage[]>(props.messages);
  const [currentAIChat, setCurrentAIChat] = useState<IChatMessage | null>(null);

  const chatMessagesRef = useRef(chatMessages);
  const currentAiChatRef = useRef(currentAIChat);
  chatMessagesRef.current = chatMessages;
  currentAiChatRef.current = currentAIChat;

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: 'api/chat',
    body: {
      userId: props.userId,
      chatId: props.chatId.toString(),
    },
    onError: (e) => {
      // Empty error handler function. Add error handling logic here if needed.
    },
    onResponse: async (data) => {
      // Asynchronously handle the response from the API.
    
      const reader = data.body?.getReader() as any;
      // Get a reader from the response body to read the stream of data.
      // The ?. (optional chaining) ensures that this is done only if data.body is not null or undefined.
      // The "as any" is used to bypass TypeScript's strict type checking.
    
      const decoder = new TextDecoder();
      // Create a TextDecoder to decode bytes into text.
    
      let done = false;
      // Initialize a boolean variable to control the reading loop.
    
      while (!done) {
        // Loop until the stream is fully read (done is true).
    
        const { value, done: doneReading } = await reader.read();
        // Read the next chunk of data from the stream.
        // Await the promise returned by reader.read(), which resolves to an object with 'value' (the data chunk) and 'done' (boolean indicating if the stream is finished).
    
        done = doneReading;
        // Update the done variable. If doneReading is true, the loop will terminate.
    
        const chunk = decoder.decode(value, { stream: true });
        // Decode the chunk of bytes into a string using the TextDecoder.
        // The { stream: true } option allows streaming decoding.
    
        console.log('🚀 ~ onResponse: ~ chunk:', chunk);
        // Log the decoded chunk to the console for debugging purposes.
    
        const chunkData = chunk.split(':"')[1]?.slice(0, -1) ?? '';
        // Process the chunk to extract the relevant data.
        // Split the string at ':"' and take the second part (index 1).
        // Remove the last character using slice(0, -1).
        // If the result is undefined or null, use an empty string as the default value.
    
        const updatedMessages = [...chatMessagesRef.current];
        // Create a copy of the current chat messages array.
        // Use the spread operator (...) to avoid directly mutating the state.
    
        const index = updatedMessages.findIndex((msg) => msg.id === currentAiChatRef?.current?.id);
        // Find the index of the current AI chat message in the updatedMessages array.
        // Use findIndex() to search for the message with the same id as currentAiChatRef.current?.id.
    
        if (index !== -1) {
          // If the AI chat message is found in the array (index is not -1),
    
          updatedMessages[index] = {
            ...updatedMessages[index],
            // Spread the existing properties of the message to retain them.
    
            entry: updatedMessages[index].entry + chunkData,
            // Append the new chunkData to the existing entry property.
    
            isLoading: false,
            // Set isLoading to false to indicate that the message is fully loaded.
          };
        }
    
        setChatMessages(updatedMessages);
        // Update the state of chat messages with the new array of updated messages.
        // This triggers a re-render of the component to display the updated messages.
      }
    },
    
  });

  return (
    <PageWrapper>
      <ContextSection>
        <h3>Contexts section</h3>
      </ContextSection>

      <ChatSection>
        <ChatHeader headerText="Your Inner Circle Trader AI Companion" />

        <ChatMessageContainer>
          {chatMessages.map((chat) => (
            <ChatMessage
              key={chat.id}
              message={chat.entry}
              loading={chat.isLoading || false}
              time={chat.created_at}
              speaker={chat.speaker}
            />
          ))}
        </ChatMessageContainer>

        <ChatInput
          value={input}
          onChange={(e) => handleInputChange(e)}
          onClickSend={(e: any) => {
            e.preventDefault();
            const newMessage: IChatMessage = {
              entry: input,
              created_at: new Date().toISOString(),
              id: Math.random().toString(),
              speaker: 'user',
              user_id: props.userId,
            };

            const aiLoadingPlaceholder: IChatMessage = {
              entry: '',
              created_at: new Date().toISOString(),
              id: Math.random().toString(),
              speaker: 'ai',
              user_id: '0',
              isLoading: true,
            };

            setCurrentAIChat(aiLoadingPlaceholder);
            setChatMessages([...chatMessages, newMessage, aiLoadingPlaceholder]);
            handleSubmit(e);
          }}
        />
      </ChatSection>
    </PageWrapper>
  );
};

export default PlaygroundPage;
