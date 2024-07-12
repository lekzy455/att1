import {
  ConflictException,
  HttpException,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { User, UserDocument } from './schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import * as crypto from 'crypto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { StaffDocument } from './schema/staff.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
    @InjectModel('Staff') private readonly adminModel: Model<StaffDocument>,
    private readonly jwtService: JwtService,
  ) {}
  async createUser(payload: CreateUserDto) {
    const { email, password } = payload;

    // Continue with checking for existing users
    if (payload.usertype === 'student') {
      const _user = await this.userModel.find({ email });
      if (_user.length) {
        throw new ConflictException('User with details already exists');
      }
      const hashPassword = this.hashPassword(password);
      const uploadData = {
        ...payload,
        password: hashPassword,
      } as User;

      const user = await this.userModel.create(uploadData);
      return user;
    } else if (payload.usertype === 'staff') {
      const _user = await this.adminModel.find({ email });
      if (_user.length) {
        throw new ConflictException('Staff with details already exists');
      }
      const hashPassword = this.hashPassword(password);
      const uploadData = {
        ...payload,
        password: hashPassword,
      };

      const user = await this.adminModel.create(uploadData);
      return user;
    }
  }

  hashPassword(password: string) {
    const hash = crypto.createHash('sha256').update(password).digest('hex');
    return hash;
  }

  async login(user: any) {
    if (user === null) {
      throw new HttpException('invalid email or password', 404);
    }
    const payload = {
      name: user.username,
      email: user.email,
      sub: user._id,
    };
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '6h' }),
      user,
    };
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.getUserByEmail(email);
    if (!user) return null;
    const passwordValid = await this.comparePassword(password, user.password);
    if (!user) {
      throw new NotAcceptableException('could not find the user');
    }
    if (user && passwordValid) {
      return user;
    }
    return null;
  }

  async adminLogin(admin: any) {
    if (admin === null) {
      throw new HttpException('invalid username or password', 404);
    }
    const payload = {
      email: admin.email,
      name: admin.username,
      username: admin.phoneNumber,
      sub: admin._id,
    };
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '6h' }),
    };
  }

  async validateAdmin(email: string, password: string): Promise<any> {
    const admin = await this.getAdminByEmail(email);
    if (!admin) return null;
    const passwordValid = await this.comparePassword(password, admin.password);
    if (!admin) {
      throw new NotAcceptableException('could not find the admin');
    }
    if (admin && passwordValid) {
      return admin;
    }
    return null;
  }

  async getAdminByEmail(identifier: string) {
    let admin;

    admin = await this.adminModel
      .findOne({ email: identifier })
      .orFail(
        new HttpException(
          { message: `Unable to retrieve Admin with email ${identifier}` },
          400,
        ),
      );

    return admin;
  }

  async getUserByEmail(identifier: string) {
    let user;

    user = await this.userModel
      .findOne({ email: identifier })
      .orFail(
        new HttpException(
          { message: `Unable to retrieve User with email ${identifier}` },
          400,
        ),
      );

    return user;
  }

  comparePassword(password: string, storedPasswordHash: string): boolean {
    const hashedPassword = this.hashPassword(password);
    return hashedPassword === storedPasswordHash;
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
