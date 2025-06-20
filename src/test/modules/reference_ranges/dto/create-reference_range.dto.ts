import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  Validate,
  ValidateIf,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { AppBaseEntityIdDataType } from 'src/global/entity/BaseEntity';
import { Gender } from '../entities/reference_range.entity';
import { OmitType } from '@nestjs/mapped-types';

@ValidatorConstraint({ name: 'MaxGreaterThanMin', async: false })
export class MaxGreaterThanMinValidator
  implements ValidatorConstraintInterface
{
  validate(max: string, args: ValidationArguments) {
    const min = args.object[args.constraints[0]];
    if (!min || !max) return true;
    return parseFloat(max) > parseFloat(min);
  }

  defaultMessage(args: ValidationArguments) {
    return 'Maximum range must be greater than minimum range';
  }
}

export class CreateReferenceRangeDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsNotEmpty()
  testId: AppBaseEntityIdDataType;

  @IsNotEmpty()
  @IsNumberString()
  age_min_years: string;

  @IsNotEmpty()
  @IsNumberString()
  age_max_years: string;

  @IsOptional()
  @IsEnum(Gender, { message: 'Gender must be one of: male, female, other' })
  gender: string;

  @IsNumberString()
  @IsNotEmpty()
  normal_min: string;

  @IsNumberString()
  @IsNotEmpty()
  @ValidateIf((o) => o.normal_min !== undefined)
  @Validate(MaxGreaterThanMinValidator, ['normal_min'])
  normal_max: string;

  @IsNumberString()
  @IsNotEmpty()
  critical_min: string;

  @IsNumberString()
  @IsNotEmpty()
  critical_max: string;

  @IsString()
  @IsOptional()
  notes: string;
}

export class CreateReferenceRangeDtoWithoutTestId extends OmitType(
  CreateReferenceRangeDto,
  ['testId'] as const,
) {}
