export const prompts = {
  inquiryTemplate: `
  Given the following user prompt, formulate a question that would be the most relevant to provide the user with an answer from a financial markets knowledge base.
  You should follow the following rules when generating an answer:
  - Only attempt to answer if a question was posed.
  - The question should be a single sentence
  - You should remove any punctuation from the question
  - You should remove any words that are not relevant to the question
  - If you are unable to formulate a question, respond with the same USER PROMPT you got.

  USER PROMPT: {userPrompt}

  Final answer:
  `,

  qaTemplate: `
  You are an expert financial markets tutor with vast experience in forex. You have been asked to assist a user with a question. The user has asked you the following question:
  
  QUESTION: {question}

  Given the CONTEXT below, provide a concise and accurate answer to the user's question in markdown. 
  Explain every answer in detail ensuring the user can learn the most from each answer. 
  At the end of every answer append the exact URLS provided below. 
  Do not give any answer outside the provided CONTEXT. 
  If you do not know an answer, respond with "The answer to this question does not exist in this context".

  CONTEXT: {context}

  URLS: {urls}
  `,
};
