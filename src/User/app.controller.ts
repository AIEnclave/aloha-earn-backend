import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UseGuards,
    Req
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { AuthGuard } from '../auth.gaurd';
  import { CreateUserDto } from './dto/create.dto';
  import { UpdateUserDto } from './dto/update.dto';
  import { UpdateCategoryDto } from './dto/updateCategory.dto'
  import { UserService } from './app.service';

  interface CustomRequest extends Request {
    user?: any; // Adjust the type according to your user object
  }
  
  @Controller('users')
  export class UserController {
    constructor(
      private readonly service: UserService,
      private readonly jwtService: JwtService
    ) {}
  
    @UseGuards(AuthGuard)
    @Get()
    async index() {
      return await this.service.findAll();
    }
  
    // @Get(':id')
    // async find(@Param('id') id: string) {
    //   return await this.service.findOne(id);
    // }

    @UseGuards(AuthGuard)
    @Get('/categories')
    async findCategories(@Req() request: CustomRequest) {
      console.log("::::request.user::::", request.user)
      let userDetails = await this.service.findByTwitterId(request.user.userDetails);
      console.log("userDetails:::", userDetails)
      return {
        categories: userDetails.categories
      }
    }
  
    @Post('signup')
    async create(@Body() createUserDto: CreateUserDto) {
      console.log({ createUserDto });
      return await this.service.create(createUserDto);
    }

    @Post('signin')
    async signin(@Body() createUserDto: CreateUserDto) {
      console.log("createUserDto:::::", createUserDto);
      let userDetails = await this.service.findByTwitterId(createUserDto);
      console.log("userDetails:::: 11111", userDetails)
      if(userDetails) {

      } else {
        userDetails = await this.service.create(createUserDto);
      }
      console.log("userDetails:::: REACHED 1")
      const alohaAccessToken = await this.jwtService.signAsync({userDetails: createUserDto})
      console.log("userDetails:::: REACHED 2")
      return {
        userDetails,
        alohaAccessToken
      }
    }

    @UseGuards(AuthGuard)
    @Put()
    async update(@Body() updateUserDto: UpdateUserDto, @Req() request: CustomRequest) {
      console.log("request.user::::::", request.user); 
      let userDetails = await this.service.findByTwitterId(request.user.userDetails);
      return await this.service.update(userDetails, updateUserDto);
    }
  
    @Delete(':id')
    async delete(@Param('id') id: string) {
      return await this.service.delete(id);
    }
  }