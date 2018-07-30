// Copy-pasted from https://github.com/facebookincubator/idx/blob/9609fe1a728caaea8f621c44e2e7190a1c5689f6/packages/idx/src/idx.js
// And Flow types commented away manually because I'm too lazy to setup Babel and whatnot.

function idx/*<Ti, Tv>*/(input/*: Ti*/, accessor/*: (input: Ti) => Tv*/)/*: ?Tv */{
  try {
    return accessor(input);
  } catch (error) {
    if (error instanceof TypeError) {
      if (nullPattern.test(error)) {
        return null;
      } else if (undefinedPattern.test(error)) {
        return undefined;
      }
    }
    throw error;
  }
}

/**
 * Some actual error messages for null:
 *
 * TypeError: Cannot read property 'bar' of null
 * TypeError: Cannot convert null value to object
 * TypeError: foo is null
 * TypeError: null has no properties
 * TypeError: null is not an object (evaluating 'foo.bar')
 * TypeError: null is not an object (evaluating '(" undefined ", null).bar')
 */
const nullPattern = /^null | null$|^[^(]* null /i;
const undefinedPattern = /^undefined | undefined$|^[^(]* undefined /i;