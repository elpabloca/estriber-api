import { Controller, Get, Post, Delete, Put, Param, Body, ParseUUIDPipe } from '@nestjs/common';
import type { UUID } from 'node:crypto';
import { UsersService } from './users.service';
import type { User } from './user.model';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers(): User[] {
    return this.usersService.findAll();
  }

  @Get(':id')
  findUser(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.usersService.getUserById(id);
  }

  @Post()
  createUser(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.usersService.delete(id);
  }

  @Put(':id')
  updateUser(@Param('id', ParseUUIDPipe) id: UUID, @Body() body: UpdateUserDto) {
    return this.usersService.update(id, body);
  }
}
