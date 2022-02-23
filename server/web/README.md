# Podpisaka server

## Build docker
```bash
docker build -t podpisaka-server-image <server sources directory>
```
## Assign your gallery folder by mount

```bash
docker run -p 8000:8000 -d -it --name podpisaka-server-container --mount type=bind,source=<local gallery path>,target=/usr/src/podpisaka/gallery podpisaka-server-image
```