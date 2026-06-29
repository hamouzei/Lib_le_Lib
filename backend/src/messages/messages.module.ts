import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { MessagesGateway } from './messages.gateway';
import { Message } from './entities/message.entity';
import { MessageAttachment } from './entities/message-attachment.entity';
import { Match } from '../matches/entities/match.entity';
import { Device } from '../users/entities/device.entity';
import { Profile } from '../profiles/entities/profile.entity';
import { PhotosModule } from '../photos/photos.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Message,
      MessageAttachment,
      Match,
      Device,
      Profile,
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '15m' },
      }),
      inject: [ConfigService],
    }),
    PhotosModule, // For StorageService
  ],
  controllers: [MessagesController],
  providers: [MessagesService, MessagesGateway]
})
export class MessagesModule {}

