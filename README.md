# ts-cqrs-es-v1

## install
```
istioctl install --set profile=demo -y

kubectl apply -f .\_kubernetes\_tools\service-mesh\
kubectl create -n istio-system secret tls tls-credential --key=service-mesh\certificator\etc\pki\dev.localhost\privkey_localhost.pem --cert=service-mesh\certificator\etc\pki\dev.localhost\server_localhost.crt

kubectl create namespace sandbox
kubectl label namespace sandbox istio-injection=enabled --overwrite
kubectl apply -n=sandbox -f .\_kubernetes
kubectl apply -n=sandbox -f .\_kubernetes\_tools\test-runner\

timeout 10
istioctl dashboard kiali

```

## uninstall
```
kubectl delete -n=sandbox -f .\_kubernetes\_tools\test-runner\
kubectl delete -n=sandbox -f .\_kubernetes
kubectl delete namespace sandbox

kubectl delete -f .\_kubernetes\_tools\service-mesh\
kubectl delete -n istio-system secret tls-credential

istioctl uninstall --purge -y
kubectl delete ns istio-system

```