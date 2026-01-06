## Commands

kubectl apply -f Q2/k8s/namespace.yaml
Creates the namespace 1220-mern-app.

kubectl apply -f Q2/k8s/mongodb.yaml
Creates MongoDB PVC, Deployment, and Service.

kubectl apply -f Q2/k8s/backend.yaml
Deploys backend and exposes backend-service on NodePort 30300.

kubectl apply -f Q2/k8s/frontend.yaml
Deploys frontend and exposes frontend-service on NodePort 30173.

kubectl get pods -n 1220-mern-app -o wide
Shows running pods in the namespace.

kubectl get svc -n 1220-mern-app
Shows services and NodePorts in the namespace.

kubectl get pvc -n 1220-mern-app
Shows PVC status for MongoDB storage.
