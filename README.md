
# traefik-swarm

Use traefik reverse proxy with docker swarm for scale application container.


## Tech Stack

**Infrastructure:** Docker, Docker Swarm, Traefik 

**Server:** Node, Express

**Database:** MongoDB

## Features

- Revers proxy
- Auto scale and deploy
- Cross platform
- Visualizer


## Infrastructure

![App Screenshot](https://github.com/sajjadjafaribojd/-traefik-swarm/blob/master/asset/Infrastructure_0.PNG)


## Run Locally

Clone the project

```bash
  https://github.com/sajjadjafaribojd/-traefik-swarm.git
```

Create manager Swarm cluster

```bash
  docker swarm init
```
Create worker Swarm cluster

```bash
  docker swarm join --token "token" master-IP:Port
```

Go to the project directory

```bash
  cd -traefik-swarm.git
```

Create overly network

```bash
  docker ceate network mynet -d overlay 
```

Run docker swarm stack command:

```bash
  docker stack deploy Auth docker-compose.yml
```
Run dev environment:

```bash
  docker stack deploy Auth docker-compose_dev.yml
```
Run docker compose single mode:

```bash
  docker compose -f docker-compose_dev.yml up
```

## Service Access Reference

#### Traefik Dashboard

```http
   https://monitor.domain.com/dashboard/
```

#### visualizer items

```http
   https://visualizer.domain.com/
```
#### Account-manager heartbeat

```http
   https://account-manager.domain.com/accountico/heartbeat
```
#### Auth heartbeat

```http
   https://auth.domain.com/authentiq/v1/heartbeat
```
