import https from 'node:https';

https.get('https://raw.githubusercontent.com/alexmeub/win98-icons/master/png/computer_explorer-4.png', (res) => {
  console.log('Status:', res.statusCode);
});
