const { exec } = require('child_process');
const path = require('path');

console.log('Installing dependencies...');
exec('npm install', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error installing dependencies: ${error}`);
    return;
  }
  console.log('Dependencies installed successfully');
  
  console.log('Building CSS...');
  const tailwindCmd = `npx tailwindcss -i ./public/styles/input.css -o ./public/styles/output.css`;
  exec(tailwindCmd, (err, stdout, stderr) => {
    if (err) {
      console.error(`Error building CSS: ${err}`);
      return;
    }
    console.log('CSS built successfully!');
    console.log('You can now start the application with: npm run dev');
  });
});
