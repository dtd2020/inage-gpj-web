#!/bin/bash
APP_ENV="${1}"

re='^[0-12]+$'
re2='^[1-3]+$'
re3='^[0-8]+$'

servidor=`hostname`

manutencao-gpj-web () {

numeroimagensgpjweb=`docker images | grep inage-gpj-web | grep $APP_ENV | wc -l`
if (( $numeroimagensgpjweb > 0 ))
then
echo "Reomvendo a imagem inage-gpj-web:$APP_ENV no servidor $servidor"
docker image rm -f inage-gpj-web:$APP_ENV
else
echo "Nenhuma imagem do microservico inage-gpj-web encontrada no servidor $servidor"
fi
sleep 2
}

manutencao-gpj-nginx () {

numeroimagensgpjweb=`docker images | grep inage-gpj-nginx | grep $APP_ENV | wc -l`
if (( $numeroimagensgpjweb > 0 ))
then
echo "Reomvendo a imagem inage-gpj-nginx:$APP_ENV no servidor $servidor"
docker image rm -f inage-gpj-nginx:$APP_ENV
else
echo "Nenhuma imagem do microservico inage-gpj-nginx encontrada no servidor $servidor"
fi
sleep 2
}



runprogram (){
    manutencao-gpj-web
    manutencao-gpj-nginx
}

runprogram