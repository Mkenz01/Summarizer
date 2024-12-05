const { JSDOM } = require('jsdom');
const { window } = new JSDOM(``).window;
require('dotenv').config();
global.window = window;
const officeParser = require('officeparser');
const fs = require('fs');
//const pipe = require('@huggingface/transformers');
//const { pipeline } = require('@huggingface/transformers');
const { OpenAI } = require('openai');
//const { SummarizationPipeline } = require('@huggingface/transformers');
const {openAiAPI} = require('./.env');

const openai = new OpenAI({
  apiKey: "", dangerouslyAllowBrowser: true,
});

async function extractTextFromFile(filePath) {
  return new Promise((resolve, reject) => {
      console.log("extractingtext")
    officeParser.parseOffice(filePath, (data, err) => {
      if (err) {
        console.log("Error is : " + err);
        //reject(err);
      } else {
        //console.log("Extracted data:\n " + data);
        resolve(data);
      }
    });
  });
}


async function summarizeText(text, maxLength = 1024) {
  try {
    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system",
                content: "You are a study assistant used to summarize large amounts of information presented in class. Please summarize the following text while maintaining all important and key bits of information.:"
            },
            {
                role: "user",
                content: text
            }
        ],
  
    });
    return response.choices[0].message.content;
} catch (error) {
    console.error('Error in summarization:', error);
    throw error;
}
  
}
/* Initially used to summarize slides but we are no longer processing slide by slide
async function summarizeSlides(textData, maxLength = 40) {
  const summaries = [];
  for (const text of textData) {
    const summary = await summarizeText(text, maxLength);
    summaries.push(summary);
  }
  return summaries;
}
*/
async function generateQuizQuestions(textData, maxLength = 50, temp) {
  // Create the string of summarized data
  //const combinedText = textData.join(" ");

  const messages = [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: `Based on the following summarized content, generate a list of ten quiz questions:\n\n${textData}\n\nPlease make the questions varied and engaging, and ensure they are suitable for a quiz. output only the quiz in exactly the following format with no unnecessary quote marks or headers\n
    
    "quizQuestions": [
        {
            "question": "What are the two major abiotic factors that shape terrestrial biomes?",
            "options": [
                "A. Sunlight and wind",
                "B. Temperature and precipitation",
                "C. Altitude and soil type",
                "D. Latitude and ocean currents"
            ],
            "answer": "B"
        },
        {
            "question": "Which biome is characterized by high biodiversity and year-round growing conditions?",
            "options": [
                "A. Subtropical Desert",
                "B. Temperate Grassland",
                "C. Tropical Wet Forest",
                "D. Chaparral"
            ],
            "answer": "C"
        }
     ]
    
    ` }
  ];

  console.log(messages[1].content);

  try {
    // Prompt the model to create the quiz
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: messages,
      max_tokens: 1000,
      temperature: temp 
    });
    const generatedText = response.choices[0].message.content;
    let formattedText = "{"+ generatedText +"}"
      console.log("formatted generated text:\n" + formattedText);
      console.log("parsed generated text:\n" + JSON.stringify((JSON).parse(formattedText)));
    let ret = JSON.stringify((JSON).parse(formattedText))
    return ret;
  } catch (error) {
    console.error("Error generating quiz questions:", error);
  }
}
/*
// Example usage
(async () => {
  try{
    //const filePath = "C:/Users/andre/Downloads/COP 4331 - Gathering Requirements.pptx";
    const filePath = "C:/Users/andre/Downloads/Projects.docx";
    const textData = await extractTextFromFile(filePath);
    console.log("Printing the text:\n" +textData);

    const summaries = await summarizeText(textData);
    console.log("Starting summaries:\n" + summaries);

    const quiz = await generateQuizQuestions(summaries);
    //console.log("Here is your quiz:\n" + quiz);
    for (const question of quiz) {
      console.log(question);
    }
  }
  catch(error){
    console.log(error);
  }
})();
*/
module.exports = {
  extractTextFromFile,
  summarizeText,
  generateQuizQuestions,
};
