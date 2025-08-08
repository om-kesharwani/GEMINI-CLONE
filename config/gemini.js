

// import { GoogleGenerativeAI } from "@google/generative-ai"; 


// // Make sure to set your API key as an environment variable
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY); 

// async function run(prompt) { 
//  // For chat, use the gemini-pro model
//  const model = genAI.getGenerativeModel({ model: "gemini-pro"}); 

//  const chat = model.startChat({ 
//   history: [ 
//    { 
//     role: "user", 
//     parts: "Hello, I have 2 dogs in my house.", 
//    }, 
//    { 
//     role: "model", 
//     parts: "Great to meet you. What would you like to know?", 
//    }, 
//   ], 
//   generationConfig: { 
//    maxOutputTokens: 100, 
//   }, 
//  }); 

//  const msg = "How many paws are in my house?"; 

//  const result = await chat.sendMessage(prompt); 
//  const response = await result.response; 
//  const text = response.text(); 
//  console.log(text); 
// } 

// export default run;
 
import { GoogleGenerativeAI } from "@google/generative-ai";

// WARNING: This method is insecure and should only be used for local testing.
// Do not deploy this code to a public website.
const apiKey = "AIzaSyDQMlDONoLLOpd4WiJxXUPeLTWArZ9i1BA"; // Replace with your actual key
const genAI = new GoogleGenerativeAI(apiKey);

async function run(prompt) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{text:"Hello, I have 2 dogs in my house."}],
      },
      {
        role: "model",
        parts: [{text:"Great to meet you. What would you like to know?"}],
      },
    ],
    generationConfig: {
      maxOutputTokens:10000,
    },
  });

  // The original error in your logic is still here. You probably want to send the 'prompt'.
  // I've corrected it to send the 'prompt' argument.
  const result = await chat.sendMessage(prompt);
  const response =  result.response;
  const text = response.text();
  console.log(text);
  return response.text();
}

export default run;