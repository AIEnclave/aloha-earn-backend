import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenAI } from 'openai';
import { TextCompletionDto } from './dto/base.dto';
import { ChromaClient } from "chromadb";
const chroma = new ChromaClient({ path: "http://localhost:8000" });

@Injectable()
export class OpenaiService {
  private readonly logger = new Logger(OpenaiService.name);
  private readonly openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY 
    });
  }

  async generateText(payload: TextCompletionDto): Promise<string> {
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          { "role": "system", "content": `
              You are a comment validator. 
              User will proviode 3 items, originalQuestion, originalResponse and then user will comment (userComment) where he will tell reason why he thinks the originalResponse is correct or wrong.
              User can provide misleading comment or jargon or anything.
              You have to check if user comment is valid or not by checking his comment is properly defining why he think the originalResponse is wrong or correct. 
              User comment should be explaining why he thinks the response is correct. 
              If explaination is not correct or user is throwing jargon or user response is misleading then response : wrong, otherwise response: correct`
          },
          { "role": "user", "content": `
              originalQuestion:  who won latest IPL ?
              originalResponse: The latest IPL (Indian Premier League) was won by the Kolkata Knight Riders (KKR). They defeated Sunrisers Hyderabad (SRH) by 8 wickets in the final match to secure the title. Notable individual awards included Virat Kohli of Royal Challengers Bangalore (RCB) winning the Orange Cap for scoring the most runs (741), and Harshal Patel of Punjab Kings (PBKS) winning the Purple Cap for taking the most wickets (24). Sunil Narine of KKR was named the Most Valuable Player of the season
              userComment: Tomorrow is monday
            ` 
          },
          { "role": "assistant", "content": '{ "result": false , "reason": "This is not relevant comment, this doesnt match with context of question and answer at all. Please explain properly why you think answer is correct or wrong."}' },
          { "role": "user", "content": `
              originalQuestion:  who won latest IPL ?
              originalResponse: The latest IPL (Indian Premier League) was won by the Kolkata Knight Riders (KKR). They defeated Sunrisers Hyderabad (SRH) by 8 wickets in the final match to secure the title. Notable individual awards included Virat Kohli of Royal Challengers Bangalore (RCB) winning the Orange Cap for scoring the most runs (741), and Harshal Patel of Punjab Kings (PBKS) winning the Purple Cap for taking the most wickets (24). Sunil Narine of KKR was named the Most Valuable Player of the season
              userComment: I checked google and yes the anwer is correct
            ` 
          },
          { "role": "assistant", "content": '{ "result": true , "reason": "Yeah I do checked google and yes you are right"}' },
          { "role": "user", "content": `
              originalQuestion:  who won latest IPL ?
              originalResponse: The latest IPL (Indian Premier League) was won by the Kolkata Knight Riders (KKR). They defeated Sunrisers Hyderabad (SRH) by 8 wickets in the final match to secure the title. Notable individual awards included Virat Kohli of Royal Challengers Bangalore (RCB) winning the Orange Cap for scoring the most runs (741), and Harshal Patel of Punjab Kings (PBKS) winning the Purple Cap for taking the most wickets (24). Sunil Narine of KKR was named the Most Valuable Player of the season
              userComment: This is correct because I know that
            ` 
          },
          { "role": "assistant", "content": '{ "result": false , "reason": "You are not explaining properly why think the answer is correct. You cant just tell you know it, Provide some more explaination"}' },
          { "role": "user", "content": `
              originalQuestion:  who won election india ?
              originalResponse: Congress won the recent election in India and Rahul Gandhi is the currect PM
              userComment: I checked google and yes the anwer is correct
            ` 
          },
          { "role": "assistant", "content": '{ "result": false , "reason": "Wrong I did checked google and you are wrong"}' },
          { "role": "user", "content": payload.prompt }
        ],
      });

      return response.choices[0].message.content.trim();
    } catch (error) {
      console.log("error::::", error)
      this.logger.error('Error generating text:', error);
      throw new Error('Failed to generate text');
    }
  }

  async generateOCR(payload: TextCompletionDto): Promise<string> {
    try {

    } catch (error) {
      console.log("error::::", error)
      this.logger.error('Error generating text:', error);
      throw new Error('Failed to generate text');
    }
  }
  
}
