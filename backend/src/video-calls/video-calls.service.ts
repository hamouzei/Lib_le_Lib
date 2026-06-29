import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VideoVerificationCall, VideoCallStatus } from './entities/video-verification-call.entity';
import { Match } from '../matches/entities/match.entity';

@Injectable()
export class VideoCallsService {
  constructor(
    @InjectRepository(VideoVerificationCall)
    private readonly videoCallsRepository: Repository<VideoVerificationCall>,
    @InjectRepository(Match)
    private readonly matchesRepository: Repository<Match>,
  ) {}

  private async validateMatchMembership(matchId: string, userId: string): Promise<Match> {
    const match = await this.matchesRepository.findOne({
      where: { id: matchId },
    });

    if (!match) {
      throw new NotFoundException('Match not found');
    }

    if (match.status !== 'active') {
      throw new ForbiddenException('Match is no longer active');
    }

    if (match.userAId !== userId && match.userBId !== userId) {
      throw new ForbiddenException('You are not part of this match');
    }

    return match;
  }

  async scheduleCall(matchId: string, initiatorId: string, scheduledAt: Date): Promise<VideoVerificationCall> {
    await this.validateMatchMembership(matchId, initiatorId);

    const call = this.videoCallsRepository.create({
      matchId,
      initiatedById: initiatorId,
      status: VideoCallStatus.SCHEDULED,
      scheduledAt,
    });

    return this.videoCallsRepository.save(call);
  }

  async updateStatus(
    matchId: string,
    callId: string,
    userId: string,
    status: VideoCallStatus,
  ): Promise<VideoVerificationCall> {
    await this.validateMatchMembership(matchId, userId);

    const call = await this.videoCallsRepository.findOne({
      where: { id: callId, matchId },
    });

    if (!call) {
      throw new NotFoundException('Video call not found');
    }

    call.status = status;
    if (status === VideoCallStatus.COMPLETED) {
      call.completedAt = new Date();
    }

    return this.videoCallsRepository.save(call);
  }
}
