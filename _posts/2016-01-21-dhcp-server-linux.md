---
layout: post
title:  "Setup a DHCP server - Linux"
date:   2016-01-21 21:46:01 +0000
thumbnail: "dhcp-server-thumbnail.jpg"
categories: network
tags: dhcp ip subnet netmask
---

The [Dynamic Host Configuration Protocol](//en.wikipedia.org/wiki/Dynamic_Host_Configuration_Protocol) (DHCP) is a standardized network protocol used on [Internet Protocol](//en.wikipedia.org/wiki/Internet_Protocol) (IP) networks for dynamically distributing network configuration parameters, such as [IP addresses](//en.wikipedia.org/wiki/IP_address) for interfaces and services. With [DHCP](//en.wikipedia.org/wiki/Dynamic_Host_Configuration_Protocol), computers request [IP addresses](//en.wikipedia.org/wiki/IP_address) and networking parameters automatically from a [DHCP](//en.wikipedia.org/wiki/Dynamic_Host_Configuration_Protocol) server, reducing the need for a network administrator or a user to configure these settings manually.

### ISC DHCP

All IP devices need addresses, and [ISC DHCP](//www.isc.org/downloads/dhcp/) is the easiest and most efficient way to provide them. [ISC DHCP](//www.isc.org/downloads/dhcp/) is open source software that implements the [Dynamic Host Configuration Protocol](//en.wikipedia.org/wiki/Dynamic_Host_Configuration_Protocol) for connection to an [IP](//en.wikipedia.org/wiki/Internet_Protocol) network. It is production-grade software that offers a complete solution for implementing [DHCP](//en.wikipedia.org/wiki/Dynamic_Host_Configuration_Protocol) servers, relay agents, and clients from small local networks to large enterprises. [ISC DHCP](//www.isc.org/downloads/dhcp/) solution supports both [IPv4](//en.wikipedia.org/wiki/IPv4) and [IPv6](//en.wikipedia.org/wiki/IPv6), and is suitable for use in high-volume and high-reliability applications.

Lets start installing ISC DHCP on our linux machine:

`$ sudo apt-get install isc-dhcp-server -y` <br>
`$ cd /etc/dhcp` <br>
`$ sudo nano dhcpd.conf`

Copy the code below and make changes to your needs and network:

{% highlight applescript linenos %}
# Change this line
option domain-name "linux.dr.pt";
option domain-name-servers 10.0.0.101;

# Add this to the end of file
subnet 10.0.0.0 netmask 255.255.255.0 {
  range 10.0.0.150 10.0.0.160;
  option routers 10.0.0.254;
  option broadcast-address 10.0.0.255;
}
{% endhighlight %}

Then just start ISC DHCP with this command: `$ sudo service isc-dhcp-server start`. It could take a while until the hosts do a dhcp renew but in the end should look something like the image below:

{: .center}
![dhcp test](/assets/img/dhcp-test-linux.png)
***Figure 1:** New DHCP information.*
