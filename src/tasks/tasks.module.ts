import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ProductModule } from 'src/product/product.module';
import { OpenAiModule } from 'src/open-ai/open-ai.module';

@Module({
  imports: [ProductModule, OpenAiModule],
  providers: [TasksService],
})
export class TasksModule {}
