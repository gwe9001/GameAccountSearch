git reset --hard
git pull origin HEAD
npm install
pm2 stop search -f
pm2 start npm --name "search" -- start