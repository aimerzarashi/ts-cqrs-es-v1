# service-mesh

## install
```
istioctl install --set profile=demo -y

kubectl create -n istio-system secret tls tls-credential --key=service-mesh\secret.pem --cert=service-mesh\localhost.crt

kubectl apply -n=istio-system -f .\service-mesh\_k8s\_option\dashboard

kubectl apply -f .\service-mesh\_k8s

timeout 10
istioctl dashboard kiali

```

## uninstall
```
kubectl delete -n=istio-system -f .\service-mesh\_k8s\_option\dashboard
kubectl delete -f .\service-mesh\_k8s

kubectl delete -n istio-system secret tls-credential

istioctl uninstall --purge -y
kubectl delete ns istio-system

```