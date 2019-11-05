import {
  FieldValidationFunctionSync,
  parseMessageWithCustomArgs,
} from '@lemoncode/fonk';

const VALIDATOR_TYPE = 'RANGE_NUMBER';

let defaultMessage =
  'The value must be between {{min.value}} and {{max.value}}';
export const setErrorMessage = message => (defaultMessage = message);

interface CustomValidatorArgs {
  strictTypes?: boolean;
  min: Limit;
  max: Limit;
}

interface Limit {
  value: number;
  inclusive: boolean;
}

let defaultCustomArgs: CustomValidatorArgs = {
  strictTypes: false,
  min: {
    value: 0,
    inclusive: true,
  },
  max: {
    value: 100,
    inclusive: true,
  },
};
export const setCustomArgs = (customArgs: Partial<CustomValidatorArgs>) =>
  (defaultCustomArgs = { ...defaultCustomArgs, ...customArgs });

const validateType = (value, args: CustomValidatorArgs) =>
  !args.strictTypes || typeof value === 'number';

const validate = (value, min: Limit, max: Limit) =>
  !isNaN(Number(value))
    ? (min.inclusive ? value >= min.value : value > min.value) &&
      (max.inclusive ? value <= max.value : value < max.value)
    : false;

const isDefined = value => value !== void 0 && value !== null && value !== '';

export const validator: FieldValidationFunctionSync<
  CustomValidatorArgs
> = fieldValidatorArgs => {
  const {
    value,
    message = defaultMessage,
    customArgs = defaultCustomArgs,
  } = fieldValidatorArgs;

  const args: CustomValidatorArgs = {
    ...defaultCustomArgs,
    ...customArgs,
  };

  const succeeded =
    !isDefined(value) ||
    (validateType(value, args) && validate(value, args.min, args.max));

  return {
    succeeded,
    message: succeeded
      ? ''
      : parseMessageWithCustomArgs(message as string, args),
    type: VALIDATOR_TYPE,
  };
};
