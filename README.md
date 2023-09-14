# ts-cqrs-es-v1

## install
```
istioctl install --set profile=demo -y
kubectl create -n istio-system secret tls tls-credential --key=service-mesh\credential\secret.pem --cert=service-mesh\credential\localhost.crt
kubectl apply -n=istio-system -f .\service-mesh\_k8s\_option\dashboard

kubectl create namespace services
kubectl label namespace services istio-injection=enabled --overwrite

kubectl apply -n=services -f .\database\_k8s
kubectl apply -n=services -f .\website\_k8s
kubectl apply -n=services -f .\service-mesh\_k8s

kubectl apply -n=services -f .\database\_k8s\_option\tools
kubectl apply -n=services -f .\website\_k8s\_option\tests

timeout 10
istioctl dashboard kiali

```

## uninstall
```
kubectl delete -n=services -f .\database\_k8s\_option\tools
kubectl delete -n=services -f .\website\_k8s\_option\tests

kubectl delete -n=services -f .\service-mesh\_k8s
kubectl delete -n=services -f .\website\_k8s
kubectl delete -n=services -f .\database\_k8s

kubectl delete namespace services

kubectl delete -n=istio-system -f .\service-mesh\_k8s\_option\dashboard
kubectl delete -n istio-system secret tls-credential

istioctl uninstall --purge -y
kubectl delete ns istio-system

```