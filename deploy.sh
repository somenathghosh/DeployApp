#!/bin/bash

dateTime=`date "+DATE_%m_%d_%y_TIME_%H_%M_%S"`
#!/bin/bash -e
commit_message=$dateTime
cd /srv/www/somenath-ghosh
git add . -A
git commit -m "$commit_message" 
git push heroku master 
