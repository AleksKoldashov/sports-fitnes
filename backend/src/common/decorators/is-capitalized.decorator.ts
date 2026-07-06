import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsCapitalized(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isCapitalized',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (typeof value !== 'string') return false;
          if (value.length === 0) return true; // Пустую строку не проверяем (для этого есть IsNotEmpty)
          return value[0] === value[0].toUpperCase();
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} должна начинаться с заглавной буквы`;
        },
      },
    });
  };
}
