import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  checkValidationEmail({ email }) {
    return email.includes('@') && email.includes('.');
  }

  getToken(mycount) {
    return String(Math.floor(Math.random() * 10 ** mycount)).padStart(mycount, '0');
  }

  getTemplateToken({ mytoken }) {
    return `
      <html>
        <body>
          <h3>팀플 회원가입 인증번호는 ${mytoken}입니다.</h3>
        </body>
      </html>
    `;
  }

  // async sendEmail({ email, template }) {
  //   const appKey = process.env.EMAIL_APP_KEY;
  //   const XSecretKey = process.env.EMAIL_X_SECRET_KEY;
  //   const sender = process.env.EMAIL_SENDER;

  //   await axios.post(
  //     `https://api-mail.cloud.toast.com/email/v2.0/appKeys/${appKey}/sender/mail`,
  //     {
  //       senderAddress: sender,
  //       title: `팀플 이메일 인증번호입니다.`,
  //       body: template,
  //       receiverList: [
  //         {
  //           receiveMailAddr: email,
  //           receiveType: 'MRT0',
  //         },
  //       ],
  //     },
  //     {
  //       headers: {
  //         'X-Secret-Key': XSecretKey,
  //         'Content-Type': 'application/json;charset=UTF-8',
  //       },
  //     },
  //   );
  // }

  async checkUser(email) {
    const users = await this.userRepository.findOne({
      email,
    });
    if (users) throw new ConflictException('중복된 이메일 입니다.');
  }

  async create({ createUserInput }) {
    return await this.userRepository.save(createUserInput);
  }

  async findOne({ email }) {
    return await this.userRepository.findOne({ email });
  }
}
