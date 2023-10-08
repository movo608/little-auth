import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';

export class CreateUserDTO {
  @IsEmail({}, { message: 'Email must be a valid address.' })
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @MinLength(8)
  @Matches(/[a-zA-Z]/, { message: 'Password must contain at least a letter.' })
  @Matches(/\d/, { message: 'Password must contain at least a number.' })
  @Matches(/.*[!@#$%^&*]/, {
    message: 'Password must contain at least one special character.',
  })
  password: string;
}
