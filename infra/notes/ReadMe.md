# CREATE
1. Create pod: kubectle apply -f posts.yaml (after creating run kubectl get pods to see status of pod)

# UPDATE - method 1
1. Make a change to your project code
2. Rebuild the image specify a new version number (docker build -t tylerposts:0.0.5)
3. In the deployment config file (posts-depl.yaml) update the version of the image
4. run the command: kubectl apply -f posts-depl.yaml

# UPDATE - method 2
1. make change to code
2. Build the image
    docker build -t tylerg509/tylerposts .  
3. Push image to docker hub
    docker push tylerg509/tylerposts   
4. Run deployment command
    kubectl rollout restart deployment posts-depl

# Notes
1. A deployment manages one or more pods. You can update all pods through the deployment
