const fs = require('fs');

const replaceInFile = (file) => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/src="\/([^\"]+)"/g, 'src={import.meta.env.BASE_URL + "$1"}');
  fs.writeFileSync(file, content);
  console.log(`Updated ${file}`);
};

replaceInFile('src/AppDesktop.tsx');
replaceInFile('src/AppMobile.tsx');
