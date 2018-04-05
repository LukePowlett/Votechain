export FABRIC_VERSION="hlfv11"
startFabric.sh
composer network install --archiveFile votechain-network@0.0.1.bna --card PeerAdmin@hlfv1
composer network start --networkName votechain-network --networkVersion 0.0.1 --card PeerAdmin@hlfv1 --networkAdmin admin --networkAdminEnrollSecret adminpw
composer-rest-server -c admin@votechain-network -n never -w true
