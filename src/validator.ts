import {
  FieldValidationFunctionSync,
  parseMessageWithCustomArgs,
} from '@lemoncode/fonk';

const VALIDATOR_TYPE = 'RANGE_NUMBER';

let defaultMessage =
  'The value must be between {{min.value}} and {{max.value}}';
export const setErrorMessage = message => (defaultMessage = message);

const isDefined = value => value !== void 0 && value !== null && value !== '';

const validateType = value => typeof value === 'number';

const validate = (value, min: Limit, max: Limit) =>
  (min.inclusive ? value >= min.value : value > min.value) &&
  (max.inclusive ? value <= max.value : value < max.value);

interface CustomValidatorArgs {
  min: Limit;
  max: Limit;
}

interface Limit {
  value: number;
  inclusive: boolean;
}

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
      : parseMessageWithCustomArgs(
          (message as string) || defaultMessage,
          customArgs
        ),
    type: VALIDATOR_TYPE,
  };
};
