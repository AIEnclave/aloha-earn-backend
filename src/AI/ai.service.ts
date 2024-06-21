import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenAI } from 'openai';
import { PassThrough } from 'stream';
import * as Promise from "bluebird";
import { TextCompletionDto, ImageCompletionDto, ImageFetchCompletionDto, ImageFetchQueryCompletionDto } from './dto/base.dto';
import { ChromaClient, OpenAIEmbeddingFunction } from "chromadb";
const fs = require('fs');
const path = require('path');

const chroma = new ChromaClient({ path: "http://localhost:8000" });
const embedder = new OpenAIEmbeddingFunction({
  openai_api_key: process.env.OPENAI_API_KEY,
});

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
        model: 'gpt-4o',
        messages: [
          {
            "role": "system", "content": `
              You are a comment validator. 
              User will proviode 3 items, originalQuestion, originalResponse and then user will comment (userComment) where he will tell reason why he thinks the originalResponse is correct or wrong.
              User can provide misleading comment or jargon or anything.
              You have to check if user comment is valid or not by checking his comment is properly defining why he think the originalResponse is wrong or correct. 
              User comment should be explaining why he thinks the response is correct. 
              If explaination is not correct or user is throwing jargon or user response is misleading then response : wrong, otherwise response: correct`
          },
          {
            "role": "user", "content": `
              originalQuestion:  who won latest IPL ?
              originalResponse: The latest IPL (Indian Premier League) was won by the Kolkata Knight Riders (KKR). They defeated Sunrisers Hyderabad (SRH) by 8 wickets in the final match to secure the title. Notable individual awards included Virat Kohli of Royal Challengers Bangalore (RCB) winning the Orange Cap for scoring the most runs (741), and Harshal Patel of Punjab Kings (PBKS) winning the Purple Cap for taking the most wickets (24). Sunil Narine of KKR was named the Most Valuable Player of the season
              userComment: Tomorrow is monday
            `
          },
          { "role": "assistant", "content": '{ "result": false , "reason": "This is not relevant comment, this doesnt match with context of question and answer at all. Please explain properly why you think answer is correct or wrong."}' },
          {
            "role": "user", "content": `
              originalQuestion:  who won latest IPL ?
              originalResponse: The latest IPL (Indian Premier League) was won by the Kolkata Knight Riders (KKR). They defeated Sunrisers Hyderabad (SRH) by 8 wickets in the final match to secure the title. Notable individual awards included Virat Kohli of Royal Challengers Bangalore (RCB) winning the Orange Cap for scoring the most runs (741), and Harshal Patel of Punjab Kings (PBKS) winning the Purple Cap for taking the most wickets (24). Sunil Narine of KKR was named the Most Valuable Player of the season
              userComment: I checked google and yes the anwer is correct
            `
          },
          { "role": "assistant", "content": '{ "result": true , "reason": "Yeah I do checked google and yes you are right"}' },
          {
            "role": "user", "content": `
              originalQuestion:  who won latest IPL ?
              originalResponse: The latest IPL (Indian Premier League) was won by the Kolkata Knight Riders (KKR). They defeated Sunrisers Hyderabad (SRH) by 8 wickets in the final match to secure the title. Notable individual awards included Virat Kohli of Royal Challengers Bangalore (RCB) winning the Orange Cap for scoring the most runs (741), and Harshal Patel of Punjab Kings (PBKS) winning the Purple Cap for taking the most wickets (24). Sunil Narine of KKR was named the Most Valuable Player of the season
              userComment: This is correct because I know that
            `
          },
          { "role": "assistant", "content": '{ "result": false , "reason": "You are not explaining properly why think the answer is correct. You cant just tell you know it, Provide some more explaination"}' },
          {
            "role": "user", "content": `
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

  async generateOCR(payload: ImageCompletionDto): Promise<any> {
    try {
      //   public/alphabet/alphabet_page-0001.jpg
      // src/AI/ai.service.ts
      const fileKeys = ["Alphabet", "Tesla"]
      const alphabetBase64Image0001 = fs.readFileSync(path.join(__dirname, '../.././public/alphabet/alphabet_page-0001.jpg')).toString('base64');
      const alphabetBase64Image0002 = fs.readFileSync(path.join(__dirname, '../.././public/alphabet/alphabet_page-0002.jpg')).toString('base64');
      const alphabetBase64Image0003 = fs.readFileSync(path.join(__dirname, '../.././public/alphabet/alphabet_page-0003.jpg')).toString('base64');
      const alphabetBase64Image0004 = fs.readFileSync(path.join(__dirname, '../.././public/alphabet/alphabet_page-0004.jpg')).toString('base64');
      const alphabetBase64Image0005 = fs.readFileSync(path.join(__dirname, '../.././public/alphabet/alphabet_page-0005.jpg')).toString('base64');
      const alphabetBase64Image0006 = fs.readFileSync(path.join(__dirname, '../.././public/alphabet/alphabet_page-0006.jpg')).toString('base64');
      const alphabetBase64Image0007 = fs.readFileSync(path.join(__dirname, '../.././public/alphabet/alphabet_page-0007.jpg')).toString('base64');
      const alphabetBase64Image0008 = fs.readFileSync(path.join(__dirname, '../.././public/alphabet/alphabet_page-0008.jpg')).toString('base64');
      const alphabetBase64Image0009 = fs.readFileSync(path.join(__dirname, '../.././public/alphabet/alphabet_page-0009.jpg')).toString('base64');
      const alphabetBase64Image0010 = fs.readFileSync(path.join(__dirname, '../.././public/alphabet/alphabet_page-0010.jpg')).toString('base64');
      const alphabetBase64Image0011 = fs.readFileSync(path.join(__dirname, '../.././public/alphabet/alphabet_page-0011.jpg')).toString('base64');
      const alphabetBase64Image0012 = fs.readFileSync(path.join(__dirname, '../.././public/alphabet/alphabet_page-0012.jpg')).toString('base64');

      const alphabetBase64Images = [
        alphabetBase64Image0001,
        alphabetBase64Image0002,
        alphabetBase64Image0003,
        alphabetBase64Image0004,
        alphabetBase64Image0005,
        alphabetBase64Image0006,
        alphabetBase64Image0007,
        alphabetBase64Image0008,
        alphabetBase64Image0009,
        alphabetBase64Image0010,
        alphabetBase64Image0011,
        alphabetBase64Image0012,
      ]

      const teslaBase64Image0001 = fs.readFileSync(path.join(__dirname, '../.././public/tesla/tesla_page-0001.jpg')).toString('base64');
      const teslaBase64Image0002 = fs.readFileSync(path.join(__dirname, '../.././public/tesla/tesla_page-0002.jpg')).toString('base64');
      const teslaBase64Image0003 = fs.readFileSync(path.join(__dirname, '../.././public/tesla/tesla_page-0003.jpg')).toString('base64');
      const teslaBase64Image0004 = fs.readFileSync(path.join(__dirname, '../.././public/tesla/tesla_page-0004.jpg')).toString('base64');
      const teslaBase64Image0005 = fs.readFileSync(path.join(__dirname, '../.././public/tesla/tesla_page-0005.jpg')).toString('base64');
      const teslaBase64Image0006 = fs.readFileSync(path.join(__dirname, '../.././public/tesla/tesla_page-0006.jpg')).toString('base64');
      const teslaBase64Image0007 = fs.readFileSync(path.join(__dirname, '../.././public/tesla/tesla_page-0007.jpg')).toString('base64');
      const teslaBase64Image0008 = fs.readFileSync(path.join(__dirname, '../.././public/tesla/tesla_page-0008.jpg')).toString('base64');
      const teslaBase64Image0009 = fs.readFileSync(path.join(__dirname, '../.././public/tesla/tesla_page-0009.jpg')).toString('base64');
      const teslaBase64Image0010 = fs.readFileSync(path.join(__dirname, '../.././public/tesla/tesla_page-0010.jpg')).toString('base64');
      const teslaBase64Image0011 = fs.readFileSync(path.join(__dirname, '../.././public/tesla/tesla_page-0011.jpg')).toString('base64');
      const teslaBase64Image0012 = fs.readFileSync(path.join(__dirname, '../.././public/tesla/tesla_page-0012.jpg')).toString('base64');
      const teslaBase64Image0013 = fs.readFileSync(path.join(__dirname, '../.././public/tesla/tesla_page-0013.jpg')).toString('base64');
      const teslaBase64Image0014 = fs.readFileSync(path.join(__dirname, '../.././public/tesla/tesla_page-0014.jpg')).toString('base64');
      const teslaBase64Image0015 = fs.readFileSync(path.join(__dirname, '../.././public/tesla/tesla_page-0015.jpg')).toString('base64');
      const teslaBase64Image0016 = fs.readFileSync(path.join(__dirname, '../.././public/tesla/tesla_page-0016.jpg')).toString('base64');
      const teslaBase64Image0017 = fs.readFileSync(path.join(__dirname, '../.././public/tesla/tesla_page-0017.jpg')).toString('base64');
      const teslaBase64Image0018 = fs.readFileSync(path.join(__dirname, '../.././public/tesla/tesla_page-0018.jpg')).toString('base64');
      const teslaBase64Image0019 = fs.readFileSync(path.join(__dirname, '../.././public/tesla/tesla_page-0019.jpg')).toString('base64');
      const teslaBase64Image0020 = fs.readFileSync(path.join(__dirname, '../.././public/tesla/tesla_page-0020.jpg')).toString('base64');
      const teslaBase64Image0021 = fs.readFileSync(path.join(__dirname, '../.././public/tesla/tesla_page-0021.jpg')).toString('base64');
      const teslaBase64Image0022 = fs.readFileSync(path.join(__dirname, '../.././public/tesla/tesla_page-0022.jpg')).toString('base64');
      const teslaBase64Image0023 = fs.readFileSync(path.join(__dirname, '../.././public/tesla/tesla_page-0023.jpg')).toString('base64');
      const teslaBase64Image0024 = fs.readFileSync(path.join(__dirname, '../.././public/tesla/tesla_page-0024.jpg')).toString('base64');
      const teslaBase64Image0025 = fs.readFileSync(path.join(__dirname, '../.././public/tesla/tesla_page-0025.jpg')).toString('base64');
      const teslaBase64Image0026 = fs.readFileSync(path.join(__dirname, '../.././public/tesla/tesla_page-0026.jpg')).toString('base64');
      const teslaBase64Image0027 = fs.readFileSync(path.join(__dirname, '../.././public/tesla/tesla_page-0027.jpg')).toString('base64');
      const teslaBase64Image0028 = fs.readFileSync(path.join(__dirname, '../.././public/tesla/tesla_page-0028.jpg')).toString('base64');
      const teslaBase64Image0029 = fs.readFileSync(path.join(__dirname, '../.././public/tesla/tesla_page-0029.jpg')).toString('base64');
      const teslaBase64Image0030 = fs.readFileSync(path.join(__dirname, '../.././public/tesla/tesla_page-0030.jpg')).toString('base64');
      const teslaBase64Image0031 = fs.readFileSync(path.join(__dirname, '../.././public/tesla/tesla_page-0031.jpg')).toString('base64');

      const teslaBase64Images = [
        teslaBase64Image0001,
        teslaBase64Image0002,
        teslaBase64Image0003,
        teslaBase64Image0004,
        teslaBase64Image0005,
        teslaBase64Image0006,
        teslaBase64Image0007,
        teslaBase64Image0008,
        teslaBase64Image0009,
        teslaBase64Image0010,
        teslaBase64Image0011,
        teslaBase64Image0012,
        teslaBase64Image0013,
        teslaBase64Image0014,
        teslaBase64Image0015,
        teslaBase64Image0016,
        teslaBase64Image0017,
        teslaBase64Image0018,
        teslaBase64Image0019,
        teslaBase64Image0020,
        teslaBase64Image0021,
        teslaBase64Image0022,
        teslaBase64Image0023,
        teslaBase64Image0024,
        teslaBase64Image0025,
        teslaBase64Image0026,
        teslaBase64Image0027,
        teslaBase64Image0028,
        teslaBase64Image0029,
        teslaBase64Image0030,
        teslaBase64Image0031,
      ]
      
      const base64Images = [
        alphabetBase64Images,
        teslaBase64Images
      ]

      const resultData = await Promise.mapSeries(base64Images, async (base64Image:any, index:number) => {
        const ImageRequestObj = base64Image.map((encodedImg: any) => ({
          type: "image_url",
          image_url: {
            "url": `data:image/jpeg;base64,${encodedImg}`,
          },
        }))
        const responseForRAG = await this.openai.chat.completions.create({
          model: "gpt-4o",
          messages: [
            {
              role: "user",
              // @ts-ignore: Unreachable code error
              content: [{ type: "text", text: "Extract all content from the provided set of images. Ensure that the extraction includes headings, paragraphs, tablular data or any data present in the images. The content should be structured in the same order as it appears in the images." }, ...ImageRequestObj]
            },
          ],
        });
        const extractedTextRAG = responseForRAG.choices[0].message.content.trim();
        await this.saveToChroma(payload.ragCollectionName, extractedTextRAG, fileKeys[index]);

        const responseForKeyValue = await this.openai.chat.completions.create({
          model: "gpt-4o",
          messages: [
            {
              role: "user",
              // @ts-ignore: Unreachable code error
              content: [{ type: "text", text: `
                Extract all key-value pairs from the provided set of images. The data can be present in tables or embedded within sentences. Format the extracted data as follows:

                Heading (in bold)
                {key}: {value}

                Ensure each key-value pair is presented under the appropriate heading.
              ` }, ...ImageRequestObj]
            },
          ],
        });
        const extractedTextKeyValue = responseForKeyValue.choices[0].message.content.trim();
        await this.saveToChroma(payload.keyValueCollectionName, extractedTextKeyValue, fileKeys[index]);

        const responseForAnalyse = await this.openai.chat.completions.create({
          model: "gpt-4o",
          messages: [
            {
              role: "user",
              // @ts-ignore: Unreachable code error
              content: [{ type: "text", text: `
                Analyze the extracted key-value pairs from the provided set of images and perform necessary aggregations. For instance, if revenue data is provided for multiple quarters (e.g., Q1, Q2), calculate and provide the sum of the revenue for the mentioned periods. Perform similar aggregations for other financial metrics and provide the results in the following format:

                Aggregation Heading (in bold)
                {key}: {value}

                Ensure each aggregation result is presented under the appropriate heading.
              ` }, ...ImageRequestObj]
            },
          ],
        });
        const extractedTextAnalyse = responseForAnalyse.choices[0].message.content.trim();
        await this.saveToChroma(payload.analysingCollectionName, extractedTextAnalyse, fileKeys[index]);

        const responseForWhyInvest = await this.openai.chat.completions.create({
          model: "gpt-4o",
          messages: [
            {
              role: "user",
              // @ts-ignore: Unreachable code error
              content: [{ type: "text", text: `
                Based on this report. Please suggest Should I invest in this. Just answer yes and no with proper analysis and report
                Response in this format
                1. Should I invest
                2. Why should invest or why i should not invest
                3. Some analytical data to support your answer
              ` }, ...ImageRequestObj]
            },
          ],
        });
        const extractedTextWhyInvest = responseForWhyInvest.choices[0].message.content.trim();
        await this.saveToChroma(payload.whyInvestCollectionName, extractedTextWhyInvest, fileKeys[index]);

        return {
          extractedTextRAG,
          extractedTextKeyValue,
          extractedTextAnalyse,
          extractedTextWhyInvest
        };

      })

      return resultData

      
    } catch (error) {
      console.log("ERROR::::::", error)
      this.logger.error('Error generating OCR:', error);
      throw new Error('Failed to generate OCR');
    }
  }

  async saveToChroma(collectionName: string, extractedText: string, fileKey: string): Promise<void> {
    try {
      console.log("HERE 1 collectionName", collectionName)
      console.log("HERE 2 fileKey", fileKey)
      const collection = await chroma.getOrCreateCollection({
        name: collectionName,
        embeddingFunction: embedder,
      });
      console.log("HERE 2")
      await collection.upsert({
        documents: [extractedText],
        ids: [fileKey],
        metadatas: [{"company": fileKey, "type": collectionName}]
      });
      console.log("HERE 3")
    } catch (error) {
      console.log("error---------------->", error)
      this.logger.error('Error saving to Chroma:', error);
      throw new Error('Failed to save to Chroma');
    }
  }

  async fetchOCR(payload: ImageFetchCompletionDto): Promise<any> {
    try {
      // let collection = await chroma.getCollection({name: payload.collectionName})
      // await chroma.deleteCollection({name: payload.collectionName}) 
      // return "asd"
      const collection = await chroma.getCollection({ name: payload.collectionName, embeddingFunction: embedder, });
      const results = await collection.get({ ids: [payload.key] });
      console.log("results:::", results.documents)
      return results.documents.join("\n\n");
      // return results;
    } catch (error) {
      console.log("error-------fetchOCR--------->", error)
      this.logger.error('Error fetching from Chroma:', error);
      throw new Error('Failed to fetch from Chroma');
    }
  }

  async deleteOCR(): Promise<any> {
    try {
      await chroma.deleteCollection({name: "ocrDetail"}) 
      await chroma.deleteCollection({name: "ocrDetailKeyValue"}) 
      await chroma.deleteCollection({name: "ocrDetailAnalyse"}) 
      return "done"
    } catch (error) {
      console.log("error-------fetchOCR--------->", error)
      this.logger.error('Error fetching from Chroma:', error);
      throw new Error('Failed to fetch from Chroma');
    }
  }

  async fetchOCRQuery(payload: ImageFetchQueryCompletionDto): Promise<any> {
    try {
      const query = payload.query
      const passThrough = new PassThrough();
      const collection = await chroma.getCollection({ name: payload.collectionName, embeddingFunction: embedder, });
      const payloadObj = {
        queryTexts: [query],
        nResults: 5,
      }
      if(payload.key) {
        // @ts-ignore: Unreachable code error
        payloadObj.where = { company: payload.key }
      }
      console.log(":::payloadObj:::::===>", payloadObj)
      const results = await collection.query(payloadObj);
      // console.log("results:::==============", results.documents)
      const stream = await this.openai.chat.completions.create({
        model: 'gpt-4o',
        stream: true,
        messages: [
          {
            "role": "system", "content": `
              You are a data scientist and you have the below content on which you answer user questions'

              Content: ${results.documents.join("\n\n")}
            `
          },
          { "role": "user", "content": query }
        ],
      });
      console.log("STREAM START");
      // for await (const chunk of stream) {
      //   console.log("chunk.choices[0]?.delta?.content ", chunk.choices[0]?.delta?.content )
      //   passThrough.write(chunk.choices[0]?.delta?.content || '');
      // }
      // passThrough.end();
      (async () => {
        for await (const chunk of stream) {
          passThrough.write(chunk.choices[0]?.delta?.content || '');
        }
        passThrough.end();
      })();
      console.log("STREAM END")
      return passThrough;
      // return response.choices[0].message.content.trim();
    } catch (error) {
      console.log("error-------fetchOCR--------->", error)
      this.logger.error('Error fetching from Chroma:', error);
      throw new Error('Failed to fetch from Chroma');
    }
  }

  async updateOCRAnalytics(payload: ImageFetchCompletionDto): Promise<any> {
    try {
      // await chroma.deleteCollection({name: payload.collectionName}) 
      const collection = await chroma.getCollection({ name: "ocrDetailKeyValue", embeddingFunction: embedder, });
      const results = await collection.get({ ids: [payload.key] });
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          {
            "role": "system", "content": `
            You are a data scientist and you have the below content on which you will be performing certain aggregation, sum, average, all those kind of things which is needed for analysis by human

            Content: ${results.documents.join("\n\n")}

            Dont add equation in those anaylytics
            `
          },
          {
            "role": "user", "content": `
              Provide me total revenue, average revenue, and increase % etc
            `
          },
          { "role": "assistant", "content": `
              Average Revenue Q1 and Q2: $5235432
              Total Revenue Q1 and Q2: $6435343
              Increase: $6435343 - $5235432
            `
          },
          { "role": "user", "content": `Provide all sum, aggregated, average kind of stuff for all keys in the content
            Must to have
            1. Total or Sum of Q1 and Q2
            2. Average
            3. Increase or decrease %

            You can other parameter as well on whatever you think there should be.

            Dont add equation in those anaylytics
          ` }
        ],
      });

      const extractedTextAnalyse = response.choices[0].message.content.trim();
      await this.saveToChroma(payload.collectionName, extractedTextAnalyse, payload.key);
      console.log("results:::", results.documents)
      return results.documents.join("\n\n");
      // return results;
    } catch (error) {
      console.log("error-------fetchOCR--------->", error)
      this.logger.error('Error fetching from Chroma:', error);
      throw new Error('Failed to fetch from Chroma');
    }
  }

}
