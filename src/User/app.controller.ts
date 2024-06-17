import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UseGuards
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { AuthGuard } from '../auth.gaurd';
  import { CreateUserDto } from './dto/create.dto';
  import { UpdateUserDto } from './dto/update.dto';
  import { UserService } from './app.service';
  import { Public } from '../app.decorator';
  
  @Controller('users')
  export class UserController {
    constructor(
      private readonly service: UserService,
      private readonly jwtService: JwtService
    ) {}
  
    @Public()
    @Get()
    async index() {
      return await this.service.findAll();
    }
  
    @Get(':id')
    async find(@Param('id') id: string) {
      return await this.service.findOne(id);
    }
  
    @Post('signup')
    async create(@Body() createUserDto: CreateUserDto) {
      console.log({ createUserDto });
      return await this.service.create(createUserDto);
    }

    @Post('signin')
    async signin(@Body() createUserDto: CreateUserDto) {
      console.log({ createUserDto });
      let userDetails = await this.service.findByTwitterToken(createUserDto);
      if(userDetails) {

      } else {
        userDetails = await this.service.create(createUserDto);
      }
      const alohaAccessToken = await this.jwtService.signAsync({userName: createUserDto.userName})
      return {
        userDetails,
        alohaAccessToken
      }
    }
  
    @Put(':id')
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
      return await this.service.update(id, updateUserDto);
    }
  
    @Delete(':id')
    async delete(@Param('id') id: string) {
      return await this.service.delete(id);
    }
  }