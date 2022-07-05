
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
dphys-swapfile swapoff
dphys-swapfile uninstall

## increase swap
sudo dphys-swapfile swapoff
sudo nano /etc/dphys-swapfile
sudo dphys-swapfile setup
sudo dphys-swapfile swapon

# Raspi - video memory ~ 128 MB
# Raspi - turn ON - ssh / vnc
# Preferably - on Router [DHCP] set Static IP, so that RPi always has the same local IP

# K8S / docker change
cgroup_memory=1 cgroup_enable=memory 


```

### usb (kodi)
```
## check connected
df

## automaount under /media

```

### drive (kodi)
```
sudo blkid
sudo mkdir -p /mnt/usb
sudo chown -R pi:pi /mnt/usb

sudo nano /etc/fstab
## FAT
/dev/sda5       /mnt/usb vfat uid=pi,gid=pi 0 0

#-NTFS-
/dev/sda5       /mnt/mydrive    ntfs-3g permissions,locale=en_US.utf8   0       2

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

### NFS
Need to share "/media" Folder

```
## Server

## Client
mount -t nfs -o proto=tcp,port=2049 192.168.1.3:/ /mnt

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





