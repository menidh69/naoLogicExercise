import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { createReadStream } from 'fs';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const csv = require('csv-parser');
import { ProductService } from '../product/product.service';
import { ProductCsvDto } from '../dtos/productCsv.dto';
import { join } from 'path';
import { OpenAiService } from '../open-ai/open-ai.service';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  constructor(
    private productService: ProductService,
    private openAIService: OpenAiService,
  ) {}

  @Cron('0 17 0 * * 1-5')
  handleCron() {
    const results: ProductCsvDto[] = [];
    // Call provider endpoint
    createReadStream(join(process.cwd()) + '/../static/images40.txt')
      .pipe(csv({ separator: '\t' }))
      .on('data', (data: ProductCsvDto) => {
        results.push(data);
      })
      .on('end', async () => {
        console.log('attempting to saved ' + results.length + ' records');
        try {
          let count = 1;
          for (const data of results) {
            await this.productService.create(data);
            console.log('saved ' + data.ProductID);
            if (count < 11) {
              const { description, success } =
                await this.openAIService.getNewAIDesscription({
                  productDescription: data.ProductDescription,
                  productName: data.ProductName,
                  category: data.CategoryName,
                });
              if (success) {
                this.productService.updateProductDescription({
                  productId: data.ProductID,
                  description,
                });
              }
            }
            count++;
            // call chatgpt for description
          }
        } catch (err) {
          console.log('An error ocurred');
          console.error(err);
        }
      });
  }
}
