Setup
=============================

Install nodejs and npm (https://nodejs.org/en/download/)

`git clone https://github.com/quizkidz-hub/quizkidz.git`

`cd quizkidz`

`npm install`

For local testing
=============================

`npm run start`

This will open the application in localhost:3000
  
For deploying to remote server
==============================
`npm run build`
`cd build`

`scp -i instance.key -r * opc@129.146.125.189:~/build`

ssh to remote server

`ssh -i instance.key opc@129.146.125.189`

`cd ~/build`
`sudo cp -r * /usr/share/nginx/html`

Viewing the website
==============================
Open https://dhanya.co on you web browser
