
const tbody = document.getElementById('results');

function r(
  libname,
  test,
  docsUrl,
) {
  // Sanity check: make sure the function implementation actually works:
  console.assert(test({ a: { b: 42, }}) === 42, `Test for ${libname} failed!`)

  const result = test({
    a: null,
  });

  const testScript = test.toString().replace('obj => ', '');
  const html = `<tr>
    <td><a href="${docsUrl}">${libname}</a></td>
    <td><code>${result}</code></td>
    <td><code>${testScript}</code></td>  
  </tr>`;

  tbody.innerHTML += html;
}

document.getElementById('loading').remove();

r(
  'underscore',
  obj => underscore.property(['a', 'b'])(obj),
  'https://underscorejs.org/#property'
)

r(
  'lodash',
  obj => lodash.get(obj, 'a.b'),
  'https://lodash.com/docs/4.17.10#get'
)

r(
  'ramda',
  obj => R.path(['a', 'b'])(obj),
  'https://ramdajs.com/docs/#path'
)

r(
  'closure',
  obj => goog.object.getValueByKeys(obj, 'a', 'b'),
  'https://google.github.io/closure-library/api/goog.object.html#getValueByKeys'
)

r(
  'idx',
  obj => idx(obj, _ => _.a.b),
  'https://github.com/facebookincubator/idx'
)

r(
  'Ember',
  obj => Ember.get(obj, 'a.b'),
  'https://www.emberjs.com/api/ember/3.3/functions/@ember%2Fobject/get'
)