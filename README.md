# ts-cqrs-es-v1

## install
```
istioctl install --set profile=demo -y
kubectl create -n istio-system secret tls tls-credential --key=service-mesh\credential\secret.pem --cert=service-mesh\credential\localhost.crt
kubectl apply -f .\service-mesh\_k8s
kubectl apply -n=istio-system -f .\service-mesh\_k8s\_option\dashboard
timeout 10
istioctl dashboard kiali

kubectl create namespace services
kubectl label namespace services istio-injection=enabled --overwrite
kubectl create namespace tools
kubectl label namespace tools istio-injection=enabled --overwrite
kubectl create namespace tests
kubectl label namespace tests istio-injection=enabled --overwrite

kubectl apply -n=services -f .\database\_k8s
kubectl apply -n=services -f .\website\_k8s

kubectl apply -n=tools -f .\database\_k8s\_option\tools
kubectl apply -n=tests -f .\website\_k8s\_option\tests

```

## uninstall
```
kubectl delete -n=tests -f .\website\_k8s\_option\tests
kubectl delete -n=tools -f .\database\_k8s\_option\tools
kubectl delete -n=services -f .\website\_k8s
kubectl delete -n=services -f .\database\_k8s

kubectl delete namespace tests
kubectl delete namespace tools
kubectl delete namespace services

kubectl delete -n=istio-system -f .\service-mesh\_k8s\_option\dashboard
kubectl delete -f .\service-mesh\_k8s

kubectl delete -n istio-system secret tls-credential

istioctl uninstall --purge -y
kubectl delete ns istio-system

```