

function write(mode) {
  const el = document.getElementById(
    mode === 'html' ? 'results' : 'markdown-output'
  );

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

    const link = mode === 'html' 
      ? `<a href="${docsUrl}">${libname}</a>`
      : `[${libname}](${docsUrl})`;
    
    const code = _ => mode === 'html'
      ? `<code>${_}</code>`
      : ('```' + _ + '```');

    const testScript = test.toString().replace('obj => ', '');
    const html = `<tr>
      <td>${link}</td>
      <td>${code(testScript)}</td>  
      <td>${code(result)}</td>
    </tr>`;

    el.innerHTML += html;
  }

  r(
    'Underscore',
    obj => underscore.property(['a', 'b'])(obj),
    'https://underscorejs.org/#property'
  )

  r(
    'Lodash',
    obj => lodash.get(obj, 'a.b'),
    'https://lodash.com/docs/4.17.10#get'
  )

  r(
    'Ramda',
    obj => R.path(['a', 'b'])(obj),
    'https://ramdajs.com/docs/#path'
  )

  r(
    'Closure library',
    obj => goog.object.getValueByKeys(obj, 'a', 'b'),
    'https://google.github.io/closure-library/api/goog.object.html#getValueByKeys'
  )

  r(
    'Idx',
    obj => idx(obj, _ => _.a.b),
    'https://github.com/facebookincubator/idx'
  )

  r(
    'Ember',
    obj => Ember.get(obj, 'a.b'),
    'https://www.emberjs.com/api/ember/3.3/functions/@ember%2Fobject/get'
  )

  r(
    'Immutable',
    obj => Immutable.getIn(obj, ['a', 'b']),
    'https://facebook.github.io/immutable-js/docs/#/getIn'
  )

}

const thead = `
      <thead><tr>
        <th>
          Library
        </th>
        <th>
          Test
        </th>
        <th>
          Result
        </th>
      </tr></thead>
`

document.getElementById('loading').remove();

[...document.getElementsByTagName('table')].forEach(el => {
  el.innerHTML = thead + el.innerHTML;
});

write('html');
write('markdown');