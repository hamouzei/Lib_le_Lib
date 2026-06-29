import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message, MessageType } from './entities/message.entity';
import { MessageAttachment } from './entities/message-attachment.entity';
import { Match } from '../matches/entities/match.entity';
import { Device } from '../users/entities/device.entity';
import { Profile } from '../profiles/entities/profile.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messagesRepository: Repository<Message>,
    @InjectRepository(MessageAttachment)
    private readonly messageAttachmentsRepository: Repository<MessageAttachment>,
    @InjectRepository(Match)
    private readonly matchesRepository: Repository<Match>,
    @InjectRepository(Device)
    private readonly devicesRepository: Repository<Device>,
    @InjectRepository(Profile)
    private readonly profilesRepository: Repository<Profile>,
  ) {}

  /**
   * Validates if the match exists, is active, and the user is part of it.
   */
  async validateMatchMembership(matchId: string, userId: string): Promise<Match> {
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

  /**
   * Returns the public keys for the other user in the match.
   */
  async getMatchPublicKeys(matchId: string, userId: string): Promise<string[]> {
    const match = await this.validateMatchMembership(matchId, userId);
    
    // The other user is whoever is not the requesting user
    const targetUserId = match.userAId === userId ? match.userBId : match.userAId;

    const devices = await this.devicesRepository.find({
      where: { userId: targetUserId },
      select: ['publicKey'],
    });

    return devices.map(d => d.publicKey).filter(Boolean) as string[];
  }

  /**
   * Saves an end-to-end encrypted message.
   * Expects ciphertext and nonce as Buffers. No plaintext code path.
   */
  async createMessage(
    matchId: string,
    senderId: string,
    messageType: MessageType,
    ciphertext: Buffer,
    nonce: Buffer,
  ): Promise<Message> {
    await this.validateMatchMembership(matchId, senderId);

    const message = this.messagesRepository.create({
      matchId,
      senderId,
      messageType,
      ciphertext,
      nonce,
    });

    return this.messagesRepository.save(message);
  }

  /**
   * Retrieves paginated messages for a match, including their attachments.
   */
  async getMatchMessages(
    matchId: string,
    userId: string,
    limit: number = 50,
    offset: number = 0,
  ): Promise<[Message[], number]> {
    await this.validateMatchMembership(matchId, userId);

    return this.messagesRepository.findAndCount({
      where: { matchId },
      relations: ['attachments'],
      order: { sentAt: 'DESC' },
      take: limit,
      skip: offset,
    });
  }

  /**
   * Marks a message as read and returns whether the read receipt should be suppressed
   * due to the reader's discreet_mode setting.
   */
  async markMessageAsRead(
    matchId: string,
    messageId: string,
    readerId: string,
  ): Promise<{ message: Message; suppressReceipt: boolean }> {
    await this.validateMatchMembership(matchId, readerId);

    const message = await this.messagesRepository.findOne({
      where: { id: messageId, matchId },
    });

    if (!message) {
      throw new NotFoundException('Message not found');
    }

    // Only mark as read if the reader is NOT the sender
    if (message.senderId !== readerId && !message.readAt) {
      message.readAt = new Date();
      await this.messagesRepository.save(message);
    }

    const readerProfile = await this.profilesRepository.findOne({
      where: { userId: readerId },
      select: ['discreetMode'],
    });

    return {
      message,
      suppressReceipt: readerProfile?.discreetMode || false,
    };
  }

  /**
   * Registers a message attachment
   */
  async registerAttachment(messageId: string, storageRef: string): Promise<MessageAttachment> {
    const attachment = this.messageAttachmentsRepository.create({
      messageId,
      storageRef,
      blurredDefault: true,
    });
    return this.messageAttachmentsRepository.save(attachment);
  }

  /**
   * Reveal or revoke a message attachment
   */
  async toggleAttachmentReveal(attachmentId: string, reveal: boolean): Promise<MessageAttachment> {
    const attachment = await this.messageAttachmentsRepository.findOne({ where: { id: attachmentId } });
    if (!attachment) {
      throw new NotFoundException('Attachment not found');
    }

    if (reveal) {
      attachment.revealedAt = new Date();
      attachment.revokedAt = null;
    } else {
      attachment.revokedAt = new Date();
      attachment.revealedAt = null; // Option to clear or just set revoked_at
    }

    return this.messageAttachmentsRepository.save(attachment);
  }
}
