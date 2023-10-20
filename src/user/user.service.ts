import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(user: CreateUserDto): Promise<Partial<User>> {
    const { firstName, lastName, email, password } = user;

    const salt = await bcrypt.genSalt();
    const hashedpassword = await bcrypt.hash(password, salt);
    const createdAt = new Date();
    const newUser = this.userRepository.create({
      email,
      firstName,
      lastName,
      password: hashedpassword,
      createdAt: createdAt,
      updatedAt: createdAt,
    });

    try {
      await this.userRepository.save(newUser);
    } catch (e) {
      if (e.code === '23505') {
        throw new ConflictException(
          'User with the provided email already exists.',
        );
      }
      throw new InternalServerErrorException(
        'Internal Server Error occurred on signup process',
      );
    }

    return { firstName, lastName, email, createdAt };
  }
}
