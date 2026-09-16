import { Transform } from 'class-transformer';
import { IsString, Length, Matches } from 'class-validator';

export class RegisterDto {
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim().toLowerCase() : value,
  )
  @IsString()
  @Length(3, 25)
  @Matches(/^[a-z0-9_]+$/)
  userName!: string;

  @IsString()
  @Length(4, 20)
  password!: string;
}
