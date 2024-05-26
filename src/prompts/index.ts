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
};

export default prompts;
