# Podpisaka server

## Build docker
```bash
docker build -t podpisaka-server <server sources directory>
```
## Assign your image folder by mount

```bash
docker run -p 8000:8000 -d -it --name podpisaka-server --mount type=bind,source="$(pwd)"/gallery,target=/usr/src/podpisaka/gallery podpisaka-server
```