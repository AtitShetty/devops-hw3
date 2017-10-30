# HW3

## [Screencast]()

## Conceptual Questions

### 1. Describe some benefits and issues related to using Feature Flags.

Using feature flags has following benefits:

a) Using feature flags, changes can be released in the production environment. This enables the development team to test their code in the actual environment, without rest of the users knowing the existence of the feature.

b) The features can be deployed in incremental stages. Thus, if there was any issue with a stage, it can be rolled back easily or the feature flag can be turned off.

c) It eliminates the cost of maintaining and supporting multiple branches, and eventually eliminates merge problems.

Some disadvantages of feature flags are:

a) By its very definition, features are code that is not completely tested. If feature flags are not properly implemented, there could be accidental exposure to this untested code, leading to a lot of complications.

b) When multiple features are deployed that are maintained by different feature flags, keeping a track of all combination of flags is not easy. If there is some issue, then tracking the source of issue can be a challenge.

c) When feature flags are left in the code for a long time, it becomes very difficult to remove them and they end up costing more.

### 2. What are some reasons for keeping servers in separate availability zones?

a) Having multiple servers in different availability zones will provide protection from natural calamities or power outages in specific regions. Thus, the application need not go down due to failure in a specific region.

b) Such a setup can help with slow traffic due to high volume in specific regions, where some traffic can be redirected to servers in regions with low traffic.

c) Contents can be provided to users much faster when the server is located closer to them. Different contents can be served to different users depending on their geography using this setup.

### 3. Describe the Circuit Breaker pattern and its relation to operation toggles.

a) Software systems usually makes remote calls to applications or procedures running on remote processes. The problem with these calls is that they can fail or hang till a timeout has reached.

b) This problem exacerbates during peak hour, when multiple in system processes are trying to call these remote processes and most of the calls fail. This introduces a lot of performance issues.

c) One way to address this issue is by a using circuit breaker pattern. In this pattern, we wrap the remote calls in a circuit breaker object. This object will monitor for failures when making remote calls. If the number of failures reach a certain threshold, the circuit breaker object will block the calls and return an error to the sender. We can also program such breakers for auto-recovery, where after some time the breaker will check if the remote call is working and then unblock these calls.

d) Ops toggle essentially employ circuit breaker pattern to manage features in a production environment. 

e) If there is some issue with a feature that is affecting other areas, like performance issues due to high load, non-responsiveness, etc. or it is deemed that a feature is no longer necessary, the ops toggle can be used to kill such features without affecting other areas of application.

f) Ops toggle are usually triggered manually as opposed to circuit breakers for RPCs.

### 4. What are some ways you can help speed up an application that has:

### a) traffic that peaks on Monday evenings

Having multiple servers in different availability zones can help redirect traffic to servers that have less load. We can use load balancing for this, where the load balancer will redirect traffic to other servers or start new instances to serve this traffic.

### b) real time and concurrent connections with peers

The problem with real time and concurrent connections is the introduction of latency. Using latency based routing and smart DNS servers, we can resolve the requests so that only servers that have low latency with respect to the requester will server these requests. Amazon uses goelocation routing, where a server is chosen that is geographically closer after resolving the DNS. 

### c) heavy upload traffic

We can use reverse proxy servers like nginx to interact with the internet traffic at high speeds. This frees the application server from serving the traffic directly and can continue with main application. Using reverse proxy we can employ load balancing, so that if traffic is high, more instances can be spawned to meet the demands. We can use also cache servers to meet these demands.
