
ssh pi@192.168.1.2

## install

python --version || python3 --version

sudo apt update
sudo apt install certbot
sudo apt install python3-certbot-nginx

## config
sudo nano /etc/nginx/sites-available/portfolio
# portfolio
### portfolio file

# symlink
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/

# verify and restart
sudo nginx -t && sudo nginx -s reload

## SSL
sudo certbot certonly --webroot -w /var/www/certbot \
-d alexshkunov.com -d www.alexshkunov.com -d home.alexshkunov.com

## links
https://www.sitepoint.com/configuring-nginx-ssl-node-js/
https://www.nginx.com/blog/using-free-ssltls-certificates-from-lets-encrypt-with-nginx/

## Cron
crontab -e

0 12 * * * /usr/bin/certbot renew --quiet


