"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsCapitalized = IsCapitalized;
const class_validator_1 = require("class-validator");
function IsCapitalized(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'isCapitalized',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value) {
                    if (typeof value !== 'string')
                        return false;
                    if (value.length === 0)
                        return true;
                    return value[0] === value[0].toUpperCase();
                },
                defaultMessage(args) {
                    return `${args.property} должна начинаться с заглавной буквы`;
                },
            },
        });
    };
}
//# sourceMappingURL=is-capitalized.decorator.js.map