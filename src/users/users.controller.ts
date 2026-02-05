import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

interface User {
  id: string;
  name: string;
  email: string;
}

@Controller('users')
export class UsersController {
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

  @Get()
  getUsers(): User[] {
    return this.users;
  }

  @Get(':id')
  findUser(@Param('id') id: string) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      return {
        error: 'User not found',
      };
    }
    return user;
  }

  @Post()
  createUser(@Body() body: User) {
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

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    const position: number = this.users.findIndex((user) => user.id === id);
    if (position === -1) {
      return {
        error: 'User not found',
      };
    }
    this.users.splice(position, 1);
    return {
      message: 'User deleted',
    };
  }
}
