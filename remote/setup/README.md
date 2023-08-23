## Onboarding a new Organization

1. The first thing that we need to do is commission a Droplet on Digital Ocean to host our application.
2. Add you SSH key to Digital Ocean or you can use the Droplet "Access" option in the browser.
3. Create a new Regular Intel With SSD ($63) a month option.
4. Set the Droplet "Hostname" to the Org name and make sure to enable "Automated backups" before creating the Droplet.
5. Now we need to copy the `01.sh` script to the server to install the necessary packages.
- Run `rsync -rP --delete ./remote/setup root@<server ip>:/root` (this will copy the setup script to the root user's home folder).
- Execute the script like so: `ssh -t root@<server ip> "bash /root/setup/01.sh"`
  - The script will ask for a password and then proceed to install the necessary packages and setup a new user `connected` with the password entered.
6. Connect to the Droplet and create a new `api` folder in the `connected` user's $HOME directory.
7. Copy the repo to the server `rsync -rP --delete ./dashboard-api root@45.55.49.87:/connected/api`
8. Install `nvm` on the server (you can run the installer on the server) and then install Node Hydrogen (`nvm install hydrogren`)
9. To make life easier, create a `.bashrc` file in the $HOME dir and paste the following:

```sh
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
```

**Note: `source .bashrc` or log back in for the `.bashrc` to take effect**

10. Install pm2 with `npm i -g pm2` or you can use `npx` to run it.
11. Copy `env.example` to `.env`.
12. Get the AWS bucket creds from the initial server. They aren't keep in the repo for security. 
13. Make sure the project is built and start the server with `npx pm2 start build/src/index.js`
