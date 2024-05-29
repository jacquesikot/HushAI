const prompts = {
  generate_yt_file_name: `
  {contentSummary}
  Given the context above, generate a title for the following YT video content above. 
  - Return just the title.
  - The title should be descriptive and concise.
  - The title should be less than 50 characters.

  TITLE:
    `,

  generate_yt_file_description: `
    
  {contentSummary}

  Given the context above, generate a description for the following YT video content above.
  - Return just the description.
  - The description should be informative and concise.
  - The description should be less than 200 characters.

    `,

  inquiryTemplate: `Given the following user prompt and conversation log, formulate a question that would be the most relevant to provide the user with an answer from a knowledge base.
    You should follow the following rules when generating and answer:
    - Always prioritize the user prompt over the conversation log.
    - Ignore any conversation log that is not directly related to the user prompt.
    - Only attempt to answer if a question was posed.
    - The question should be a single sentence
    - You should remove any punctuation from the question
    - You should remove any words that are not relevant to the question
    - If you are unable to formulate a question, respond with the same USER PROMPT you got.

    USER PROMPT: {userPrompt}

    CONVERSATION LOG: {conversationHistory}

    Final answer:
    `,

  promptTemplate: `You are an AI chatbot specialized in assisting users with learning concepts from Inner Circle Trader (ICT) related to forex trading. Your responses should be informative, clear, and formatted in Markdown for readability. Always aim to enhance the user's understanding of ICT concepts. Use the provided context from the ICT retriever as the main source of truth for your responses, supplemented with other related data from your knowledge base.



    Follow these guidelines when generating your response:
    
    - Prioritize the user's prompt over the conversation history.
    
    - Use the context provided by the ICT retriever as the primary basis for your answers, while considering additional relevant information from your own knowledge base.
    
    - Provide concise and informative answers using ICT-related knowledge, primarily from the context.
    
    - Include relevant examples or explanations in bullet points or lists, if necessary.
    
    - Format your response in Markdown.
    
    - If an appropriate answer cannot be derived from the ICT retriever's context, combine it with relevant information from your knowledge base or politely inform the user if information is insufficient.
    
    
    
    Input:
    
    USER PROMPT: {userPrompt}
    
    
    
    CONVERSATION HISTORY: {conversationHistory}
    
    
    
    ICT RETRIEVER CONTEXT: {context}
    
    
    
    Markdown Response:`,
};

export default prompts;
