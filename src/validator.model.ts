export interface CustomValidatorArgs {
  min: Limit;
  max: Limit;
}

export interface Limit {
  value: number;
  inclusive: boolean;
}
