
const tbody = document.getElementById('results');

function r(
  libname,
  test
) {
  // Sanity check: make sure the function implementation actually works:
  console.assert(test({ a: { b: 42, }}) === 42, `Test for ${libname} failed!`)

  const result = test({
    a: null,
  });

  const testScript = test.toString().replace('obj => ', '');
  const html = `<tr>
    <td>${libname}</td>
    <td><code>${result}</code></td>
    <td><code>${testScript}</code></td>  
  </tr>`;

  tbody.innerHTML += html;
}

document.getElementById('loading').remove();

r(
  'underscore',
  obj => underscore.property(['a', 'b'])(obj)
)

r(
  'lodash',
  obj => lodash.get(obj, ['a', 'b'])
)

r(
  'ramda',
  obj => R.path(['a', 'b'])(obj)
)

r(
  'closure',
  obj => goog.object.getValueByKeys(obj, 'a', 'b')
)

r(
  'idx',
  obj => idx(obj, _ => _.a.b)
)
