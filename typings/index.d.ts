import { FieldValidationFunctionSync } from '@lemoncode/fonk';

export namespace rangeNumber {
  export interface CustomValidatorArgs {
    strictTypes?: boolean;
    min: Limit;
    max: Limit;
  }
  export interface Limit {
    value: number;
    inclusive: boolean;
  }
  export const validator: FieldValidationFunctionSync;
  export function setErrorMessage(message: string | string[]): void;
}
