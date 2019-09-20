import { FieldValidationFunctionSync } from '@lemoncode/fonk';
import { CustomValidatorArgs, Limit } from './validator.model';
import { isDefined, buildCustomMessage } from './validator.business';

const VALIDATOR_TYPE = 'RANGE_NUMBER';

let defaultMessage =
  'The value must be between {{min.value}} and {{max.value}}';
export const setErrorMessage = message => (defaultMessage = message);

const validateType = value => typeof value === 'number';

const validate = (value, min: Limit, max: Limit) =>
  (min.inclusive ? value >= min.value : value > min.value) &&
  (max.inclusive ? value <= max.value : value < max.value);

export const validator: FieldValidationFunctionSync<
  CustomValidatorArgs
> = fieldValidatorArgs => {
  const { value, message = defaultMessage, customArgs } = fieldValidatorArgs;

  const succeeded =
    !isDefined(value) ||
    (validateType(value) && validate(value, customArgs.min, customArgs.max));

  return {
    succeeded,
    message: succeeded
      ? ''
      : buildCustomMessage((message as string) || defaultMessage, customArgs),
    type: VALIDATOR_TYPE,
  };
};
