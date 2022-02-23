# Podpisaka server

## Build docker
```bash
docker build -t podpisaka-db-image <server sources directory>
```
## Assign your gallery folder by mount

```bash
docker run  -p 5559:5432 -d --name podpisaka-db-container podpisaka-db-image
```

double-conversion  md4c  postgresql-libs python-alembic  python-bcrypt  python-beaker python-blinker  python-brotli  python-cffi python-click  python-cryptography  python-dateutil python-editor  python-email-validator  python-extras python-fixtures  python-flask  python-flask-babelex python-flask-compress  python-flask-gravatar python-flask-login  python-flask-mail  python-flask-migrate python-flask-paranoid  python-flask-principal python-flask-security-too  python-flask-sqlalchemy python-flask-wtf  python-greenlet  python-gssapi python-itsdangerous  python-ldap3  python-mako python-paramiko  python-passlib  python-pbr python-ply  python-psutil  python-psycopg2 python-pyasn1  python-pycparser  python-pynacl python-speaklater  python-sqlalchemy1.3  python-sqlparse python-sshtunnel  python-testtools  python-webencodings python-werkzeug  python-wtforms  qt5-base qt5-translations  tslib  xcb-util-renderutil xcb-util-wm  pgadmin4