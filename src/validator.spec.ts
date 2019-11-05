import { validator, setErrorMessage, setCustomArgs } from './validator';

const VALIDATOR_TYPE = 'RANGE_NUMBER';
const TEST_MESSAGE = 'Custom message for tests';

describe('fonk-range-number-validator specs', () => {
  it('should return succeeded validation when it feeds value equals undefined', () => {
    // Arrange
    const value = void 0;

    // Act
    const result = validator({
      value,
      customArgs: {
        min: {
          value: 0,
          inclusive: false,
        },
        max: {
          value: 100,
          inclusive: false,
        },
      },
    });

    // Assert
    expect(result).toEqual({
      succeeded: true,
      message: '',
      type: VALIDATOR_TYPE,
    });
  });

  it('should return succeeded validation when it feeds value equals null', () => {
    // Arrange
    const value = null;

    // Act
    const result = validator({
      value,
      customArgs: {
        min: {
          value: 0,
          inclusive: false,
        },
        max: {
          value: 100,
          inclusive: false,
        },
      },
    });

    // Assert
    expect(result).toEqual({
      succeeded: true,
      message: '',
      type: VALIDATOR_TYPE,
    });
  });

  it('should return succeeded validation when it feeds value equals empty string', () => {
    // Arrange
    const value = '';

    // Act
    const result = validator({
      value,
      customArgs: {
        min: {
          value: 0,
          inclusive: false,
        },
        max: {
          value: 100,
          inclusive: false,
        },
      },
    });

    // Assert
    expect(result).toEqual({
      succeeded: true,
      message: '',
      type: VALIDATOR_TYPE,
    });
  });

  it('should overwrite default message when it feeds value and message', () => {
    // Arrange
    const value = 'test';
    const message = 'other message';

    // Act
    const result = validator({
      value,
      message,
      customArgs: {
        min: {
          value: 0,
          inclusive: false,
        },
        max: {
          value: 100,
          inclusive: false,
        },
      },
    });

    // Assert
    expect(result).toEqual({
      succeeded: false,
      message: 'other message',
      type: VALIDATOR_TYPE,
    });
  });

  it('should return failed validation when type of feeds value is string', () => {
    // Arrange
    const value = 'a';

    // Act
    const result = validator({
      value,
      customArgs: {
        min: {
          value: 0,
          inclusive: false,
        },
        max: {
          value: 100,
          inclusive: false,
        },
      },
    });

    // Assert
    expect(result).toEqual({
      succeeded: false,
      message: 'The value must be between 0 and 100',
      type: VALIDATOR_TYPE,
    });
  });

  it('should return failed validation when it feeds value is true', () => {
    // Arrange
    const value = true;

    // Act
    const result = validator({
      value,
      customArgs: {
        strictTypes: true,
        min: {
          value: 0,
          inclusive: false,
        },
        max: {
          value: 100,
          inclusive: false,
        },
      },
    });

    // Assert
    expect(result).toEqual({
      succeeded: false,
      message: 'The value must be between 0 and 100',
      type: VALIDATOR_TYPE,
    });
  });

  it('should return failed validation when it feeds value is false', () => {
    // Arrange
    const value = false;

    // Act
    const result = validator({
      value,
      customArgs: {
        min: {
          value: 0,
          inclusive: false,
        },
        max: {
          value: 100,
          inclusive: false,
        },
      },
    });

    // Assert
    expect(result).toEqual({
      succeeded: false,
      message: 'The value must be between 0 and 100',
      type: VALIDATOR_TYPE,
    });
  });

  it('should return failed validation when it feeds value is an object', () => {
    // Arrange
    const value = {};

    // Act
    const result = validator({
      value,
      customArgs: {
        min: {
          value: 0,
          inclusive: false,
        },
        max: {
          value: 100,
          inclusive: false,
        },
      },
    });

    // Assert
    expect(result).toEqual({
      succeeded: false,
      message: 'The value must be between 0 and 100',
      type: VALIDATOR_TYPE,
    });
  });

  it('should return failed validation when it feeds value is an array', () => {
    // Arrange
    const value = [];

    // Act
    const result = validator({
      value,
      customArgs: {
        min: {
          value: 0,
          inclusive: false,
        },
        max: {
          value: 100,
          inclusive: false,
        },
      },
    });

    // Assert
    expect(result).toEqual({
      succeeded: false,
      message: 'The value must be between 0 and 100',
      type: VALIDATOR_TYPE,
    });
  });

  it('should return failed validation when it feeds value is a function', () => {
    // Arrange
    const value = () => null;

    // Act
    const result = validator({
      value,
      customArgs: {
        min: {
          value: 0,
          inclusive: false,
        },
        max: {
          value: 100,
          inclusive: false,
        },
      },
    });

    // Assert
    expect(result).toEqual({
      succeeded: false,
      message: 'The value must be between 0 and 100',
      type: VALIDATOR_TYPE,
    });
  });

  it('should return failed validation with interpolated message', () => {
    // Arrange
    const value = 0;

    // Act
    const result = validator({
      value,
      message: 'The value must be between {{min.value}} and {{max.value}}!',
      customArgs: {
        min: {
          value: 10,
          inclusive: true,
        },
        max: {
          value: 20,
          inclusive: true,
        },
      },
    });

    // Assert
    expect(result).toEqual({
      succeeded: false,
      message: 'The value must be between 10 and 20!',
      type: VALIDATOR_TYPE,
    });
  });

  it('should return succeeded validation when it feeds value is between minimum and maximum limits', () => {
    // Arrange
    const value = 15;

    // Act
    const result = validator({
      value,
      customArgs: {
        min: {
          value: 10,
          inclusive: true,
        },
        max: {
          value: 20,
          inclusive: true,
        },
      },
    });

    // Assert
    expect(result).toEqual({
      succeeded: true,
      message: '',
      type: VALIDATOR_TYPE,
    });
  });

  it('should return succeeded validation when it feeds value is equal to minimum limit and it is inclusive', () => {
    // Arrange
    const value = 10;

    // Act
    const result = validator({
      value,
      customArgs: {
        min: {
          value: 10,
          inclusive: true,
        },
        max: {
          value: 20,
          inclusive: true,
        },
      },
    });

    // Assert
    expect(result).toEqual({
      succeeded: true,
      message: '',
      type: VALIDATOR_TYPE,
    });
  });

  it('should return succeeded validation when it feeds value is equal to maximum limit and it is inclusive', () => {
    // Arrange
    const value = 20;

    // Act
    const result = validator({
      value,
      customArgs: {
        min: {
          value: 10,
          inclusive: true,
        },
        max: {
          value: 20,
          inclusive: true,
        },
      },
    });

    // Assert
    expect(result).toEqual({
      succeeded: true,
      message: '',
      type: VALIDATOR_TYPE,
    });
  });

  it('should return failed validation when it feeds value is equal to minimum limit and it is not inclusive', () => {
    // Arrange
    const value = 10;

    // Act
    const result = validator({
      value,
      message:
        'The value must be greater than {{min.value}} and lower than {{max.value}}',
      customArgs: {
        min: {
          value: 10,
          inclusive: false,
        },
        max: {
          value: 20,
          inclusive: false,
        },
      },
    });

    // Assert
    expect(result).toEqual({
      succeeded: false,
      message: 'The value must be greater than 10 and lower than 20',
      type: VALIDATOR_TYPE,
    });
  });

  it('should return failed validation when it feeds value is equal to maximum limit and it is not inclusive', () => {
    // Arrange
    const value = 20;

    // Act
    const result = validator({
      value,
      message:
        'The value must be greater than {{min.value}} and lower than {{max.value}}',
      customArgs: {
        min: {
          value: 10,
          inclusive: false,
        },
        max: {
          value: 20,
          inclusive: false,
        },
      },
    });

    // Assert
    expect(result).toEqual({
      succeeded: false,
      message: 'The value must be greater than 10 and lower than 20',
      type: VALIDATOR_TYPE,
    });
  });

  it('should return failed validation when it feeds value is out of range', () => {
    // Arrange
    const value = 0;

    // Act
    const result = validator({
      value,
      message:
        'The value must be greater than {{min.value}} and lower than {{max.value}}',
      customArgs: {
        min: {
          value: 10,
          inclusive: true,
        },
        max: {
          value: 20,
          inclusive: true,
        },
      },
    });

    // Assert
    expect(result).toEqual({
      succeeded: false,
      message: 'The value must be greater than 10 and lower than 20',
      type: VALIDATOR_TYPE,
    });
  });

  it('should overwrite default message when it feeds value and calls to setErrorMessage', () => {
    // Arrange
    const value = -1;

    setErrorMessage(
      'The value must be greater than {{min.value}} and lower than {{max.value}}'
    );

    // Act
    const result = validator({
      value,
      customArgs: {
        min: {
          value: 0,
          inclusive: false,
        },
        max: {
          value: 100,
          inclusive: false,
        },
      },
    });

    // Assert
    expect(result).toEqual({
      succeeded: false,
      message: 'The value must be greater than 0 and lower than 100',
      type: VALIDATOR_TYPE,
    });
  });

  it('should overwrite default customArgs when it feeds value is valid and calls to setCustomArgs', () => {
    // Arrange
    const value = '-1';

    setCustomArgs({ strictTypes: false });

    // Act
    const result = validator({
      value,
      customArgs: {
        min: { value: -5, inclusive: false },
        max: { value: 5, inclusive: false },
      },
    });

    // Assert
    expect(result).toEqual({
      succeeded: true,
      message: '',
      type: VALIDATOR_TYPE,
    });
  });
});
