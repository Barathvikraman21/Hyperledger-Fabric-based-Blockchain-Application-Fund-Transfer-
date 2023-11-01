echo "==================="
echo "Teardown everything"
echo "==================="
echo "                   "
echo "                   "
echo "======================="
echo "Removing hfc-key-store"
echo "======================="
rm -R hfc-key-store
sleep 5
cd ./banks-network
docker-compose -f docker-compose.yaml down
sleep 10
docker rm $(docker ps -aq)
sleep 10
docker rmi $(docker images dev-* -q)
sleep 10
echo
echo "========================="
echo "Docker Containers status"
echo "========================="
docker ps -a
sleep 5
echo
echo "================="
echo "Teardown complete"
echo "================="

