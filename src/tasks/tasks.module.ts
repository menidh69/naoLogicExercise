import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ProductModule } from '../product/product.module';
import { OpenAiModule } from '../open-ai/open-ai.module';

@Module({
  imports: [ProductModule, OpenAiModule],
  providers: [TasksService],
})
export class TasksModule {}
