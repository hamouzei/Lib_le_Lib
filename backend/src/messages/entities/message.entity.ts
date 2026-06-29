import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Match } from '../../matches/entities/match.entity';
import { User } from '../../users/entities/user.entity';
import { MessageAttachment } from './message-attachment.entity';

export enum MessageType {
  TEXT = 'text',
  IMAGE = 'image',
}

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Match, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'match_id' })
  match: Match;

  @Column({ name: 'match_id', type: 'uuid' })
  matchId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'sender_id' })
  sender: User;

  @Column({ name: 'sender_id', type: 'uuid' })
  senderId: string;

  @Column({
    name: 'message_type',
    type: 'enum',
    enum: MessageType,
    enumName: 'message_type',
    default: MessageType.TEXT,
  })
  messageType: MessageType;

  @Column({ type: 'bytea' })
  ciphertext: Buffer;

  @Column({ type: 'bytea' })
  nonce: Buffer;

  @CreateDateColumn({ name: 'sent_at', type: 'timestamptz' })
  sentAt: Date;

  @Column({ name: 'delivered_at', type: 'timestamptz', nullable: true })
  deliveredAt: Date;

  @Column({ name: 'read_at', type: 'timestamptz', nullable: true })
  readAt: Date;

  @Column({ name: 'revoked_at', type: 'timestamptz', nullable: true })
  revokedAt: Date;

  @OneToMany(() => MessageAttachment, (attachment) => attachment.message)
  attachments: MessageAttachment[];
}
