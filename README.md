
# homepi
Home digital assistant solution

------------------
HW: 
- Raspberry pi (2)
- Sense HAT
- USB Stick (for backup)
- (Optional) External Hard Drive with power supply (Pi does not dive enough power)
   
SW-stack: 
- Samba
- Transmission
- Kodi
- Node-red
   
Desktop-apps: DropIt, Putty   
Integrations: Trello, Dropbox, Discord   
Mobile apps: Trello, Discord, Kore (Kodi remote control)   

-----------

## == INSTALLATION ==
### general
```shell
sudo apt update && sudo apt -y upgrade

# Raspi - turn off swap
# Raspi - video memory ~ 128 MB
# Raspi - turn ON - ssh / vnc
# Preferably - on Router [DHCP] set Static IP, so that RPi always has the same local IP

```

### usb (kodi)
```
## check connected
df

## automaount under media

```

### drive (kodi)
```
#-mount drive-
sudo nano -w /etc/fstab

#-add a line-
/dev/sda1       /mnt/mydrive    ntfs-3g permissions,locale=en_US.utf8   0       2

# reboot and check drive permsissions
sudo reboot now
ls -l /mnt
```

### samba (kodi)
```shell
sudo cp smb.conf /etc/samba/smb.conf
```

### Transmission (kodi)
```shell
sudo apt install transmission-daemon

sudo cp transmission/torrent_notice /home/pi/dev/torrent_notice
sudo cp transmission/settings.json /etc/transmission-daemon/settings.json
```

### Kodi
https://kodi.wiki/view/HOW-TO:Install_Kodi_for_Linux

### Node-red Install-
```shell
#preinstalled on Raspi
#for other -> nodejs + npm
sudo npm install -g node-red
```

### Web server (Portal)
```shell
sudo apt install lighttpd

sudo cp lighttpd.conf /etc/lighttpd/lighttpd.conf
```
## == Files and creds ==

### - Node-red Flow -
```shell
cp nodered_flow.json /home/pi/.node-red/
```

### -Portal-
```shell
tar -xf portal.tar.gz --directory /var/www/html
```





