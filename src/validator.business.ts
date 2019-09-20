import { CustomValidatorArgs } from './validator.model';

const calculatePath = (path: string) => (path ? `${path}.` : '');

export const buildCustomMessage = (
  message: string,
  args: CustomValidatorArgs,
  path?: string
) =>
  message &&
  Object.keys(args).reduce(
    (accum, current) =>
      replaceArg(accum, args[current], `${calculatePath(path)}${current}`),
    message
  );

const replaceArg = (message: string, arg: CustomValidatorArgs, path: string) =>
  typeof arg === 'object'
    ? buildCustomMessage(message, arg, path)
    : message.replace(new RegExp(`{{${path}}}`, 'gi'), arg);

export const isDefined = value =>
  value !== void 0 && value !== null && value !== '';
