npm i

criar uma rede Docker para que os dois containers se comuniquem:
docker network create network-shop


Agora vamos criar um container Docker com o SGBD MySQL:
docker run -d --name mysql-shop --network network-shop --restart always -p 3307:3306 -e MYSQL_ROOT_PASSWORD=senhasegura -e MYSQL_DATABASE=shop -v mysql-volume-shop:/var/lib/mysql mysql:latest

Para acesar o banco de dados criados, vamos criar um
container contendo uma instância do PhpMyAdmin:
docker run -d --name phpmyadmin-shop --network network-shop --restart always -e PMA_HOST=mysql-shop -e PMA_PORT=3306 -e PMA_USER=root -e PMA_PASSWORD=senhasegura -p 8080:80 phpmyadmin/phpmyadmin

Para fazer migração:
npx prisma migrate dev --name

para aplicar a migração:
npx prisma migrate dev


Script para o prisma client criar as classes e tipos usados para acessar o banco:
npx prisma generate