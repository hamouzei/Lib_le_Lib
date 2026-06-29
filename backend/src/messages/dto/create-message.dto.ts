import { IsEnum, IsNotEmpty, IsString, IsBase64 } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { MessageType } from '../entities/message.entity';

export class CreateMessageDto {
  @ApiProperty({ enum: MessageType, default: MessageType.TEXT })
  @IsEnum(MessageType)
  messageType: MessageType;

  @ApiProperty({ description: 'Base64 encoded ciphertext' })
  @IsString()
  @IsNotEmpty()
  @IsBase64()
  ciphertext: string;

  @ApiProperty({ description: 'Base64 encoded nonce' })
  @IsString()
  @IsNotEmpty()
  @IsBase64()
  nonce: string;
}
