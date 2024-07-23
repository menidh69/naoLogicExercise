import { Injectable } from '@nestjs/common';
import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { StringOutputParser } from '@langchain/core/output_parsers';

@Injectable()
export class OpenAiService {
  private model = new ChatOpenAI({ model: 'gpt-3.5-turbo' });

  async getNewAIDesscription({
    productDescription,
    productName,
    category,
  }: {
    productDescription: string;
    productName: string;
    category: string;
  }): Promise<{ success: boolean; description: string }> {
    try {
      const messages = [
        new SystemMessage(`
        You are an expert in medical sales. 
        Your specialty is medical consumables used by hospitals on a daily basis. 
        Your task to enhance the description of a product based on the information provided, you should 
        return a description of one parapgraph long`),
        new HumanMessage(`
        Product name: $${productName}
        Product description: ${productDescription}
        Category: ${category}
        `),
      ];

      const parser = new StringOutputParser();
      const result = await this.model.invoke(messages);
      const description = await parser.invoke(result);
      console.log(description);
      return { success: true, description };
    } catch (e) {
      console.error('Unable to get AI response');
      console.error(e);
      return Promise.resolve({
        success: false,
        description: productDescription,
      });
    }
  }
}
