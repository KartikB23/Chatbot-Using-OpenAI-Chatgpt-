import openai from "./config/open-ai.js";
import readlineSync from "readline-sync";
import colors from "colors";

async function manin() {
  console.log(colors.bold.blue("Welcome! How may I help you?"));
  const chatHistory = [];
  while (true) {
    const userInput = readlineSync.question(colors.yellow("You: "));
    try {
      // const messages = chatHistory.map([role, content])=>({role, content});
      const messages = chatHistory.map(([role, content]) => ({
        role,
        content,
      }));

      messages.push({
        role: "user",
        content: userInput,
      });

      //Call the API with use input
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: messages,
      });

      //Get completion text/content
      const completionText = completion.data.choices[0].message.content;
      if (userInput.toLowerCase() == "exit") {
        console.log(colors.green("Bot: ") + completionText);
        return;
      }
      chatHistory.push(["user".userInput]);
      chatHistory.push(["assistant".completionText]);
    } catch (error) {
      console.error(colors.red(error));
    }
  }
}

manin();
