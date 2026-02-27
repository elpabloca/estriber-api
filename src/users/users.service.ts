import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll() {
    const users = this.usersRepository.find();
    return users;
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.findOne(id);
    if (user.id === 1) {
      throw new ForbiddenException('You are not allowed to access this user');
    }
    return user;
  }

  async create(body: CreateUserDto) {
    try {
      const newUser = await this.usersRepository.save(body);
      return {
        message: 'User created',
        body: newUser,
      };
    } catch {
      throw new ForbiddenException('Error creating user');
    }
  }

  async update(id: number, changes: UpdateUserDto) {
    const user = await this.findOne(id);
    const updatedUser = this.usersRepository.merge(user, changes);
    return this.usersRepository.save(updatedUser);
  }

  async delete(id: number) {
    const user = await this.findOne(id);
    await this.usersRepository.delete(user.id);
    return {
      message: 'User deleted',
    };
  }

  private async findOne(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }
}
