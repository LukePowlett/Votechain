export FABRIC_VERSION="hlfv11"
../fabric-tools/startFabric.sh
composer-rest-server -c admin@votechain-network -n never -w true
