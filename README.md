# fonk-range-number-validator

[![CircleCI](https://badgen.net/github/status/Lemoncode/fonk-range-number-validator/master?icon=circleci&label=circleci)](https://circleci.com/gh/Lemoncode/fonk-range-number-validator/tree/master)
[![NPM Version](https://badgen.net/npm/v/@lemoncode/fonk-range-number-validator?icon=npm&label=npm)](https://www.npmjs.com/package/@lemoncode/fonk-range-number-validator)
[![bundle-size](https://badgen.net/bundlephobia/min/@lemoncode/fonk-range-number-validator)](https://bundlephobia.com/result?p=@lemoncode/fonk-range-number-validator)

This is a [fonk](https://github.com/Lemoncode/fonk) microlibrary that brings validation capabilities to:

- Validate if a field of a form is in a given range

How to install it:

```bash
npm install @lemoncode/fonk-range-number-validator --save
```

How to add it to an existing form validation schema:

We have the following form model:

```javascript
const myFormValues = {
  product: 'shoes',
  price: 20,
};
```

The validator must be configured with the following required arguments:

```javascript
export interface CustomValidatorArgs {
  strictTypes?: boolean;
  min: Limit;
  max: Limit;
}

export interface Limit {
  value: number;
  inclusive: boolean;
}
```

These are the default arguments:

```javascript
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
```

You can specify the custom arguments in two ways:

- Locally just customize the arguments for this validationSchema:

```javascript
import { rangeNumber } from '@lemoncode/fonk-range-number-validator';

const validationSchema = {
  field: {
    price: [
      {
        validator: rangeNumber.validator,
        customArgs: {
          strictTypes: true,
          min: {
            value: 10,
            inclusive: false,
          },
          max: {
            value: 20,
            inclusive: false,
          },
        },
      },
    ],
  },
};
```

- Globally, replace the default custom arguments in all validationSchemas (e.g. enable strict types):

```javascript
import { rangeNumber } from '@lemoncode/fonk-range-number-validator';

rangeNumber.setCustomArgs({ strictTypes: true });
```

You can customize the error message displayed in two ways:

- Globally, replace the default error message in all validationSchemas (e.g. porting to spanish):

```javascript
import { rangeNumber } from '@lemoncode/fonk-range-number-validator';

rangeNumber.setErrorMessage(
  'El campo debe de ser un valor mayor que {{min.value}} y menor que {{max.value}}'
);
```

- Locally just override the error message for this validationSchema:

```javascript
import { rangeNumber } from '@lemoncode/fonk-range-number-validator';

const validationSchema = {
  field: {
    price: [
      {
        validator: rangeNumber.validator,
        message: 'Error message only updated for the validation schema',
      },
    ],
  },
};
```

Please, refer to [fonk](https://github.com/Lemoncode/fonk) to know more.

## License

[MIT](./LICENSE)

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
