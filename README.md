Requirements- .net 6,node js

1. download node modules inside client directory - npm install
2. run api -cd api
           - dotnet run watch
3. run client- cd client
             -ng serve
4. For Redis-server which is used to store cart download docker desktop for windows.
   run command in CarRentalApplication Directory: docker-compose up --detach

   or if you have ubuntu installed in your system then 
   run these commands to install redis:
   curl -fsSL https://packages.redis.io/gpg | sudo gpg --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg

   echo "deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb $(lsb_release -cs) main" | sudo tee       /etc/apt/sources.list.d/redis.list

   sudo apt-get update

   sudo apt-get install redis

   now run redis server - sudo service redis-server start
   you can check the connection by using : redis-cli
   and then write: ping
   if it returns pong it means that the connection is established.

LOGIN DETAILS:

1. To login as admin: username- admin@gmail.com
                      password- admin@2000

2.To login as regular user:
                           a) username- test@gmail.com
                              password- test@2000                    

