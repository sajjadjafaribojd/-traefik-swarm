
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

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)


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

Run docker swarm stack command:

```bash
  docker stack deploy Install Auth with docker command
```


