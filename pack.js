const tar = require('tar');
const fecha = require('fecha');
console.log('==============================================');
console.log('Packaging...');
const data = fecha.format(new Date(), 'YYYYMMDDHHmmss');

tar.c({
  gzip: true,
  cwd: './dist/',
  file: 'data-dubhe-web-' + data + '.tar.gz',
}, ['./']).then(res => console.log('Packaging complete!'));
