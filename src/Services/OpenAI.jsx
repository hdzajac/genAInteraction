import OpenAI from "openai";

class OpenAIClient {
  constructor() {
    if (!OpenAIClient.instance) {
        this.client = new OpenAI({
        apiKey: process.env.REACT_APP_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true
    }); 
      OpenAIClient.instance = this;
    }

    return OpenAIClient.instance;
  }

  getClient() {
    return this.client;
  }
}

const openAIClient = new OpenAIClient().getClient();

export default openAIClient;
