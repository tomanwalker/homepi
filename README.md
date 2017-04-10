# homepi
Home digital assistant solution

------------------
HW: Raspberry pi, External Hard Drive with power supply   
SW-stack: Samba, Transmission, Kodi, Node-red   
Desktop-apps: DropIt, Putty   
Integrations: Trello, Wunderlist   
Mobile apps: Trello, Wunderlist, Kore (Kodi remote control)  

-----------

== INSTALLATION ==   
-update system-   
sudo apt update && sudo apt upgrade

-mount drive-
$ nano -w /etc/fstab

# add a line
/dev/sda1       /mnt/mydrive    ntfs-3g permissions,locale=en_US.utf8   0       2

-samba config-



