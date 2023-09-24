# ts-cqrs-es-v1

## install
```
istioctl install --set profile=demo -y

kubectl create -n istio-system secret tls tls-credential-aimerzarashi.com --key=service-mesh\certbot\archive\aimerzarashi.com\privkey1.pem --cert=service-mesh\certbot\archive\aimerzarashi.com\fullchain1.pem

kubectl apply -n=istio-system -f .\service-mesh\_k8s\_option\dashboard

kubectl create namespace services
kubectl label namespace services istio-injection=enabled --overwrite

kubectl apply -n=services -f .\database\_k8s
kubectl apply -n=services -f .\authz\_k8s
kubectl apply -n=services -f .\service-mesh\_k8s

timeout 20
istioctl dashboard kiali

```

## uninstall
```
kubectl delete -n=services -f .\service-mesh\_k8s
kubectl delete -n=services -f .\authz\_k8s
kubectl delete -n=services -f .\database\_k8s

kubectl delete namespace services

kubectl delete -n=istio-system -f .\service-mesh\_k8s\_option\dashboard
kubectl delete -n istio-system secret tls-credential-aimerzarashi.com

istioctl uninstall --purge -y
kubectl delete ns istio-system

```