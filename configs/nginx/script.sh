
ssh pi@192.168.1.2

## install

python --version || python3 --version

sudo apt update
sudo apt install certbot
sudo apt install python3-certbot-nginx

## config
# portfolio
server {
  listen       8082;
  #listen       8083 ssl;
  server_name alexshkunov.com;

  #ssl_certificate  /etc/nginx/ssl/server.crt;
  #ssl_certificate_key /etc/nginx/ssl/server.key;

  location / {
    proxy_pass http://localhost:8080;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}

# symlink
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/

# verify and restart
sudo nginx -t && sudo nginx -s reload

## SSL


## links
https://www.sitepoint.com/configuring-nginx-ssl-node-js/
https://www.nginx.com/blog/using-free-ssltls-certificates-from-lets-encrypt-with-nginx/
Step #3 obtain Cert


