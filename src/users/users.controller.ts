import { Controller, Get, Param } from '@nestjs/common';

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
      name: 'Marcela Garcia',
      email: 'marcela@correo.com',
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
}
