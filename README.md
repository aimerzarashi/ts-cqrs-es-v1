# ts-cqrs-es-v1

## install

### istio install

```
istioctl install --set profile=demo -y

kubectl create -n istio-system secret tls tls-credential-aimerzarashi.com --key=service-mesh/certbot/archive/aimerzarashi.com/privkey1.pem --cert=service-mesh/certbot/archive/aimerzarashi.com/fullchain1.pem

kubectl apply -n=istio-system -f service-mesh/_k8s/_option/dashboard
echo "Waiting for the kiali to become accessible..."
until kubectl get pods -n=istio-system | grep -q "kiali.*Running" && kubectl logs -n=istio-system $(kubectl get pods -n=istio-system | grep "kiali" | awk '{print $1}') | grep -q "Server endpoint will start at \[:20001/kiali\]"; do
  sleep 1
done
istioctl dashboard kiali

```

### services install

```
kubectl create namespace services
kubectl label namespace services istio-injection=enabled --overwrite
kubectl apply -n=services -f database/_k8s
kubectl apply -n=services -f iam/_k8s
kubectl apply -n=services -f command/_k8s
kubectl apply -n=services -f website/_k8s
kubectl apply -n=services -f database/_k8s/_option/tool

echo "Waiting for the iam-provider to become accessible..."
until kubectl get pods -n=services | grep -q "iam-provider.*Running" && kubectl logs -n=services $(kubectl get pods -n=services | grep "iam-provider" | awk '{print $1}') | grep -q "Listening on: http://0.0.0.0:8080"; do
  sleep 1
done

echo "Waiting for the website-ui to become accessible..."
until kubectl get pods -n=services | grep -q "website-ui.*Running" && kubectl logs -n=services $(kubectl get pods -n=services | grep "website-ui" | awk '{print $1}') | grep -q "Ready in"; do
  sleep 1
done

kubectl apply -n=services -f service-mesh/_k8s
start https://website-ui.aimerzarashi.com

```

## uninstall

```
kubectl delete -n=services -f service-mesh/_k8s
kubectl delete -n=services -f database/_k8s/_option/tool
kubectl delete -n=services -f command/_k8s
kubectl delete -n=services -f website/_k8s
kubectl delete -n=services -f iam/_k8s
kubectl delete -n=services -f database/_k8s
kubectl delete namespace services

kubectl delete -n=istio-system -f service-mesh/_k8s/_option/dashboard
kubectl delete -n istio-system secret tls-credential-aimerzarashi.com
istioctl uninstall --purge -y
kubectl delete namespace istio-system

```
