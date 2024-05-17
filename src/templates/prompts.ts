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
  {ai_role} 
  You have been asked to assist a user with a question. 
  The user has asked you the following question:
  
  QUESTION: {question}

  {ai_instruction}. 
  
  {ai_output_rules}
  All output should be in markdown format.
  Do not give any answer outside the provided CONTEXT.

  CONTEXT: {context}

  Final answer:
  `,

  simplePrompt: `

  You are a medical science expert and tutor

  CONTEXT: {context}

  Given the context above only. Answer the following question:

  QUESTION: {question}

  Your answer should follow the following rules:
  - The answer should be very detailed and provide all the information possible from the context provided
  - The answer should not be verbose and should be concise
  - The answer should include a conclusion that answers the exact question asked by the user
  - For every answer and point provided within the answer, add exact references to the location within the document that the answer can be found by the user
  - All answers should be in markdown format. 
  
  `,
};
