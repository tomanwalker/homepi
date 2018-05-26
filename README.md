
# homepi
Home digital assistant solution

------------------
HW: Raspberry pi, External Hard Drive with power supply   
SW-stack: Samba, Transmission, Kodi, Node-red   
Desktop-apps: DropIt, Putty   
Integrations: Trello, Wunderlist   
Mobile apps: Trello, Wunderlist, Kore (Kodi remote control)  

-----------

### == INSTALLATION ==
```shell
#** update system **
sudo apt update && sudo apt upgrade

#-mount drive-
sudo nano -w /etc/fstab

#-add a line-
/dev/sda1       /mnt/mydrive    ntfs-3g permissions,locale=en_US.utf8   0       2

# reboot and check drive permsissions
sudo reboot now
ls -l /mnt
```

#### smb.conf file=   
```shell
sudo cp smb.conf /etc/samba/smb.conf
```

#### Web server
```shell
sudo apt install lighttpd

sudo cp lighttpd.conf /etc/lighttpd/lighttpd.conf
```

#### Transmission
```shell
sudo apt install transmission-daemon

sudo cp transmission/torrent_notice /home/pi/dev/torrent_notice
sudo cp transmission/settings.json /etc/transmission-daemon/settings.json
```

#### Kodi
https://kodi.wiki/view/HOW-TO:Install_Kodi_for_Linux

#### Node-red Install-
```shell
#preinstalled on Raspi
#for other -> nodejs + npm
sudo npm install -g node-red
```

### == Files and creds ==

#### - Node-red Flow -
```shell
cp nodered_flow.json /home/pi/.node-red/
```

#### -Portal-
```shell
tar -xf portal.tar.gz --directory /var/www/html
```





