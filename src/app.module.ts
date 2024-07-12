import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AttendaceModule } from './attendace/attendace.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://olami:DAye3jNHHjQDSH8J@cluster0.sjysbag.mongodb.net/attendance',
    ),
    AuthModule,
    AttendaceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
