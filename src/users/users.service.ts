import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { ResponseDto } from 'src/response.dto';
import { plainToClass } from 'class-transformer';
import { UserDto } from './dtos/user.dto';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
const scrypt = promisify(_scrypt);

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async findOne(id: any) {
    console.log('id in service', id);
    const user = await this.repo.findOneBy({ id });
    // console.log(user);
    if (!user) {
      return new ResponseDto().sendNotFound('user not found!');
    }
    return await this.repo.findOneBy({ id });
  }

  async find(email: string) {
    // return await this.convertDto(
    //   await this.repo.find({ where: { email } }),
    //   UserDto,
    // );
    return await this.repo.find({ where: { email } });
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new Error('user not found');
    }
    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(id: number) {
    console.log('id in remove:', id);
    const user = await this.findOne(id);
    if (!user) {
      throw new Error('user not found');
    }
    return this.repo.remove(user);
  }

  async convertDto(users: any, dto: any) {
    console.log('called here');
    console.log(users);

    let userArr = [];
    for (let user of users) {
      console.log('called here!!');
      user = plainToClass(dto, user, {
        excludeExtraneousValues: true,
      });

      userArr.push(user);
    }

    return userArr;
  }

  // async signup(email: string, password: string) {
  //   // 1) See if email is in use
  //   const users = await this.find(email);
  //   if (users.length) {
  //     throw new BadRequestException('email in use');
  //   }
  //   // 2) Hash the users password
  //   // ==>Generate a salt
  //   const salt = randomBytes(8).toString('hex');

  //   // ==>Hash the salt and the password together
  //   const hash = (await scrypt(password, salt, 32)) as Buffer;

  //   // ==>Join the hashed result and the salt together
  //   const result = salt + '.' + hash.toString('hex');

  //   // 3) Create new user and save it
  //   const user = await this.create(email, result);

  //   // 4)return user
  //   console.log('at the end of singup');
  //   return user;
  // }
}
