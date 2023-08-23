![build](https://github.com/ConnectedPerformance/shiny-octo-palm-tree/actions/workflows/build.yml/badge.svg)

1. clone and `npm i`
2. cp example.env .env
3. docker compose up -d
4. npm run dev

# For Deployment on an existing (or new) server instance
1. Get these files on the server under /home/connected/$APPLICATION_NAME/:
    1. Build
    2. Config
    3. Package.json
    4. Setup.sh
2. Set up a new Postgres DB with the remote setup script
3. Write to new .env file w/ Postgres credentials
4. Make sure .env has NODE_ENV set to development so the seedDB script is run
5. Make sure the PORT variable is set to a port that is not being used by another application
6. Run npm i in the parent file to make node_modules available
7. Create new nginx config file at /etc/nginx/sites-available/$APPLICATION_NAME.conf with this setup:

server {

  listen 80;

  listen [::]:80;



  server_name $DOMAIN_NAME;



  location / {

        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-NginX-Proxy true;
        proxy_pass http://localhost:$APPLICATION_PORT_NAME/;
        proxy_ssl_session_reuse off;
        proxy_set_header Host $http_host;
        proxy_cache_bypass $http_upgrade;
        proxy_redirect off;

  }

}

6. Run certbot nginx & install ssl cert for the sites necessary
7. Run systemctl restart nginx
8. Cd into /home/connected/$APPLICATION_NAME
9. Run pm2 start build/src/index.js —name $APPLICATION_NAME
10. Run pm2 restart all
11. Change the .env file NODE_ENV variable to “production” to make sure the seedDB script won’t run again

