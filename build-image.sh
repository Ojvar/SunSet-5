# Comment this lien In case of using docker
alias docker=podman

docker build -f docker/Dockerfile -t sunset5:latest .
# docker build -f docker/Dockerfile -t sunset5:latest . --build-arg HTTPS=1