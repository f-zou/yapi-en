const shell = require ('shelljs');
const packageJson = require ('./package.json');

const version = "v" + packageJson.version;

if(!version){
  console.error('version can not be empty')
  process.exit(1)
}

shell.exec ('npm install --https://registry.npmjs.org');
shell.exec ('npm run build-client');
shell.exec ('git add .');
shell.exec ('git commit -a -m "chore: update static file"');

console.log ('exec: git pull origin master');
shell.exec ('git pull origin master');
let a = shell.exec (`git tag |grep ${version} |wc -l`);
if (a && parseInt (a) > 0) {
  shell.exec ('git tag -d ' + version);
  shell.exec ('git push origin :' + version);
}
shell.exec ('git tag ' + version);
shell.exec ('git push origin ' + version);

console.log('git push success', version)

console.log('npm publishing')
shell.exec('npm publish')
