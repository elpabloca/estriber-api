import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.model';
import { randomUUID } from 'node:crypto';
import type { UUID } from 'node:crypto';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: randomUUID(),
      name: 'Juan pa',
      email: 'juanpa@correo.com',
    },
    {
      id: randomUUID(),
      name: 'Sofia',
      email: 'sofi@correo.com',
    },
    {
      id: randomUUID(),
      name: 'Shalom',
      email: 'shaloma@correo.com',
    },
  ];

  findAll(): User[] {
    return this.users;
  }

  getUserById(id: string) {
    const position = this.findOne(id);
    return this.users[position];
  }

  create(body: CreateUserDto) {
    const newUser = {
      ...body,
      id: randomUUID(),
    };
    this.users.push(newUser);
    return {
      message: 'User created',
      body: newUser,
    };
  }

  update(id: UUID, changes: UpdateUserDto) {
    const position: number = this.users.findIndex((user) => user.id === id);
    if (position === -1) {
      return {
        error: 'User not found',
      };
    }
    const currentData = this.users[position];
    const updateUser = {
      ...currentData,
      ...changes,
    };
    this.users[position] = updateUser;
    return updateUser;
  }

  delete(id: string) {
    const position: number = this.findOne(id);
    this.users.splice(position, 1);
    return {
      message: 'User deleted',
    };
  }

  private findOne(id: string) {
    const position = this.users.findIndex((user) => user.id === id);
    if (position === -1) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return position;
  }
}
