# Install

`apt update && apt install docker.io`

`docker swarm init`

`docker stack deploy -c monitoring/docker-compose.yml monitoring`

# Add Grafana to Prometheus

go to
`yourMachineAddres:3000`

`login: admin
password: admin`

Settings -> Data Sources -> Add data source -> Prometheus ->

`http://prometheus:9090`

# Set up node exporter

in Grafana
`Dashboard -> import -> Paste node.exporter.yml to 'Import via panel json'`

# Add node exporter to prometheus config

Go to

`vim /var/lib/docker/volumes/monitoring_prom-configs/_data/prometheus.yml`

Add to bottom

- job_name: 'node-exporter'

  static_configs:

  - targets: ['node-exporter:9100']

run in cmd

`docker ps | grep prometheus | awk '{print $1}' | xargs docker kill -s SIGHUP`

Go to

`yourMachineAddres:9090`

Status -> targets -> node-exporter
