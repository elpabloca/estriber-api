import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';

interface User {
  id: string;
  name: string;
  email: string;
}

@Controller('users')
export class UsersController {
  private users: User[] = [
    {
      id: '1',
      name: 'Juan pa',
      email: 'juanpa@correo.com',
    },
    {
      id: '2',
      name: 'Sofia',
      email: 'sofi@correo.com',
    },
    {
      id: '3',
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
    this.users.push(body);
    return {
      message: 'User created',
      body: {
        ...body,
      },
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
