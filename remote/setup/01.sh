#!/bin/bash
set -eu

# ==================================================================================== #
# VARIABLES
# ==================================================================================== #

# Set the timezone for the server. A full list of available timezones can be found by
# running timedatectl list-timezones.
TIMEZONE=America/New_York

# Set the name of the new user to create.
USERNAME=connected

# Prompt to enter a password for the PostgreSQL user.
read -p "Enter password for connected DB user: " DB_PASSWORD

# Force all output to be presented in en_US for the duration of this script.
export LC_ALL=en_US.UTF-8

# ==================================================================================== #
# SCRIPT LOGIC
# ==================================================================================== #

# Enable the "universe" repository.
add-apt-repository --yes universe

# Update all software packages.
apt update

# Set the system timezone and install all locales.
timedatectl set-timezone ${TIMEZONE}
apt --yes install locales-all

# Add the new user (and give them sudo privileges).
useradd --create-home --shell "/bin/bash" --groups sudo "${USERNAME}"

# Force a password to be set for the new user the first time they log in.
passwd --delete "${USERNAME}"
chage --lastday 0 "${USERNAME}"

# Copy the SSH keys from the root user to the new user.
rsync --archive --chown=${USERNAME}:${USERNAME} /root/.ssh /home/${USERNAME}

# Configure the firewall to allow SSH, HTTP and HTTPS traffic.
ufw allow 22
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable

# Install fail2ban.
apt --yes install fail2ban

# Install PostgreSQL.
apt --yes install postgresql

# Set up the connected DB and create a user account.
sudo -i -u postgres psql -c "CREATE DATABASE connected"
sudo -i -u postgres psql -d connected -c "CREATE ROLE connected WITH LOGIN PASSWORD '${DB_PASSWORD}'"

# Add a DSN for connecting to the greenlight database to the system-wide environment
# variables in the /etc/environment file.
echo "CONNECTED_DB_DSN='postgres://connected:${DB_PASSWORD}@localhost/connected'" >> /etc/environment

# Install Nginx
apt --yes install nginx

# location / {
#          proxy_pass http://localhost:4000;
#          proxy_http_version 1.1;
#          proxy_set_header Upgrade $http_upgrade;
#          proxy_set_header Connection 'upgrade';
#          proxy_set_header Host $host;
#          proxy_cache_bypass $http_upgrade;
# }

# sudo systemctl restart nginx

# Upgrade all packages. Using the --force-confnew flag means that configuration
# files will be replaced if newer ones are available.
apt --yes -o Dpkg::Options::="--force-confnew" upgrade

echo "Script complete! Rebooting..."
reboot
