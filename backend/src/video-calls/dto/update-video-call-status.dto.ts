import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { VideoCallStatus } from '../entities/video-verification-call.entity';

export class UpdateVideoCallStatusDto {
  @ApiProperty({ enum: VideoCallStatus })
  @IsEnum(VideoCallStatus)
  status: VideoCallStatus;
}
