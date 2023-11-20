
mvn clean && mvn compile && mvn package -DskipTests=true

scp target/*.gz inageadmin@10.224.147.98:/opt/repositorios/GPJ/WEB