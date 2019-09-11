import { FieldValidationFunctionSync } from '@lemoncode/fonk';

export namespace rangeNumber {
  export const validator: FieldValidationFunctionSync;
  export function setErrorMessage(message: string | string[]): void;
}
