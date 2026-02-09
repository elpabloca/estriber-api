import { Controller, Get, Post, Delete, Put, Param, Body, ParseUUIDPipe } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import type { UUID } from 'node:crypto';

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
  findUser(@Param('id', ParseUUIDPipe) id: UUID) {
    const user = this.users.find((user) => user.id === id);
    console.log(user, 'user');
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
  deleteUser(@Param('id', ParseUUIDPipe) id: UUID) {
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

  @Put(':id')
  updateUser(@Param('id', ParseUUIDPipe) id: UUID, @Body() body: Omit<User, 'id'>) {
    const position: number = this.users.findIndex((user) => user.id === id);
    console.log(body);
    if (position === -1) {
      return {
        error: 'User not found',
      };
    }
    const currentData = this.users[position];
    console.log(body);
    const updateUser = {
      ...currentData,
      ...body,
    };
    this.users[position] = updateUser;
    return updateUser;
  }
}
