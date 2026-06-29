import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoCallsController } from './video-calls.controller';
import { VideoCallsService } from './video-calls.service';
import { VideoVerificationCall } from './entities/video-verification-call.entity';
import { Match } from '../matches/entities/match.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VideoVerificationCall, Match])],
  controllers: [VideoCallsController],
  providers: [VideoCallsService]
})
export class VideoCallsModule {}
