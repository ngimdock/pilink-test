import { Module } from '@nestjs/common';
import { ForumsService } from './forums.service';

@Module({
  providers: [ForumsService],
})
export class ForumsModule {}
