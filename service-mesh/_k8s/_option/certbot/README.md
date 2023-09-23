## install
```
kubectl apply -f .\service-mesh\_k8s\_option\certbot
```

## uninstall
```
kubectl delete -f .\service-mesh\_k8s\_option\certbot

```

## dns create
```
certbot certonly --manual --preferred-challenges dns-01 --server https://acme-v02.api.letsencrypt.org/directory -m aimerzarashi@gmail.com -d *.aimerzarashi.com

certbot certonly --manual --preferred-challenges dns-01 --server https://acme-v02.api.letsencrypt.org/directory -m aimerzarashi@gmail.com -d *.aimerzarashi.online
```
