# HW3

## [Screencast]()

## Conceptual Questions

### 1. Describe some benefits and issues related to using Feature Flags.

Using feature flags has following benefits:

a) Using feature flags, changes can be released in the production environment. This enables the development team to test their code in the actual environment, without rest of the users knowing the existence of the feature
a) It eliminates the cost of maintaining and supporting branches which have a very long lifespan.

b) It eliminates merge problems.

c) It reduces deployment risk through incremental release strategies. It enables a user to release a new feature to certain users and check/test it before releasing it to the rest of the user base. The new code can be turned off if any problems are faced. All of this enables faster release of new code for testing and feedback.

Some disadvantages of using Feature Flags are as follows:

a) The longer Feature Flags are left in the code, the more they end up costing. The more the number of options added, the harder it gets to test the application and the expenses shoot up.

b) Tracking the Feature Flags through their respective states of production and test can make it harder to understand and duplicate problems.

c) If not implemented properly, releasing code that is not completely implemented poses serious problems. Accidental exposure of this code can lead to unpredictable results at run-time.

### 2. What are some reasons for keeping servers in seperate availability zones?

Some reasons for keeping servers in separate availability zones are as follows:

a) It provides redundancy in case of outage or failure. If the INTERNET is down in a particular zone or there is a power outage in a particular zone, having a redundant server in a separate availability zone ensures that the system is available for users.

b) When a new version is being released/deployed, having isolated production zones enables us to switch requests between the separate availability zones. Volume of such requests during a new release can be very high and isolated production zones enables us to switch requests between the two.

c) If the environment at one of the zones is polluted say due to a corrupt cache, we have a different zone available where the production environment is healthy. This provides resiliency.

d) It also helps to avoid slow spin up during peak hours such as lunch hours when traffic boost can be huge.

### 3. Describe the Circuit Breaker pattern and its relation to operation toggles.

Usually software systems make remote calls to processes running on different machines across a network. Remote calls can fail or wait for a response till timeout is reached. When the system is experiencing peak load, such unresponsive calls from multiple calls can lead to simultaneous failures across the system leading to depletion of critical resources.

A circuit breaker pattern prevents this problem by wrapping such calls in a circuit breaker object. The circuit breaker object monitors for failures and when the failures exceed a certain threshold, all subsequent calls are returned with an error without the actual call being made. The underlying calls can be checked for success and if they succeed, the circuit breaker is reset and resumes it’s normal operation.

Ops Toggles are used to control the operational aspects of a system’s behavior. When a feature has unclear performance implications, operators need the ability to disable or degrade sch features immediately in production. Ops Toggles provide this ability and are used when such features are rolled out.

Ops Toggles are usually have a short lifespan but it is not uncommon for a system to have a few number of Ops Toggles or Kill Switches which provide operators the ability to disable non-vital system functionalities immediately during peak load. These non-vital functionalities can consume a lot of resources and may need to be shut down during peak load. Such Ops Toggles can be related to manually managed Circuit Breakers.
### 4. What are some ways you can help speed up an application that has:

### a) traffic that peaks on Monday evenings

### b) real time and concurrent connections with peers

### c) heavy upload traffic


Some ways we can speed up an application that has

a) traffic that peaks on Monday evenings

b) real time and concurrent connections with peers

c) heavy upload traffic

are as follows:

i) Smart DNS Services and routing can help speed up an application that has real time connections. Latency is an issue with real time connections and if the latency goes beyond a desired value, undesirable packet loss occurs and the transmitted packets are rendered useless. Latency based routing can be done for sensitive applications such as those with real time connections. Geo based routing/DNS can be done for peers in geographically different areas.

ii) Load balancing can help speed up applications that has traffic that peaks on specific hours/days and also applications with heavy upload traffic. Not only can a load balancer route requests to different available servers but it can also request a new auto-scaling instance if required. All the instances are monitored and only the healthy instances receive requests.

iii) Having isolated production environments or Availability zones can speed up applications or ensure the system is available for sensitive applications such as real time connections.

iv) Geographically placed production environments can help speed up applications in peak hours. Requests are served by servers that are geographically closest to the place from which the request originated.

v) Having a Reverse Proxy Server helps speed up applications because the main application server does not connect to the Internet anymore and can focus on delivering content to the Reverse Proxy Server at high speeds. The main application server does not need to interact with clients and wait for their responses before moving on to the next process.
