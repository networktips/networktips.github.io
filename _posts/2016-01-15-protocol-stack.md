---
layout: post
title:  "Protocol Stack"
date:   2016-01-15 21:10:01 +0000
categories: network
tags: ping traceroute netstat ip stack
---

The protocol stack is an implementation of a computer networking protocol suite. The suite is the definition of the protocols, and the stack is the software implementation of them. In practical, protocol stacks are divided into three major sections: media, transport, and applications. Lets see an example protocol stack and the corresponding layers:

{: .table-center}
| Protocol     | Layer       |
|------------- |-------------|
| HTTP         | Application |
| TCP          | Transport   |
| IP           | Network     |
| Ethernet     | Data Link   |
| IEEE 802.3u  | Physical    |

### Ping

To check if two computers can communicate with each other, you can execute one simple command on the shell: `$ ping ip.from.computer.two` . It outputs ping requests and at the end print the result of the requests with how much have sent and received, resulting on the percentage of packets received.

{: .center}
![ping command](/assets/img/ping-command.png)

### Wireshark

There is a lot of software available on the web with the purpose of analyzing packets on the network. [Wireshark](https://www.wireshark.org) is a free open-source packet analyzer, originally called **Ethereal** that is used for network troubleshooting, analysis, software and communications protocol development, and education. Its cross-platform and uses [pcap](https://en.wikipedia.org/wiki/Pcap) to capture packets.

Below you can see the [ICMP](https://en.wikipedia.org/wiki/Internet_Control_Message_Protocol) [packets](https://en.wikipedia.org/wiki/Network_packet) transported between the hosts on Wireshark.

{: .center}
![ping wireshark](/assets/img/ping-wireshark.png)

With a web browser ([Chrome](https://www.google.com/chrome/browser/desktop/index.html), [Firefox](https://www.mozilla.org/en-US/firefox/new/), [Opera](http://www.opera.com/), [Safari](http://www.apple.com/safari/), etc) you can access to a tone of web pages available on the internet. The communication between the client (web browser) and the server ([Apache](https://httpd.apache.org/), [Nginx](http://nginx.org/), etc) is done by the [HTTP](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol) (Hypertext Transfer Protocol) protocol. The client send a [HTTP](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol) request to the server and wait for a [HTTP](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol) reply from the server too.

If the destination server isn't listening for [HTTP](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol) requests then all the requests will be dropped by server, the client wont receive any reply and will show on the web browser that the server didn't reply. Let's see [HTTP](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol) [packets](https://en.wikipedia.org/wiki/Network_packet) from a communication between a client and this blog in Wireshark.

{: .center}
![http wireshark](/assets/img/http-wireshark.png)

### Traceroute

There are some [HTTP](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol) status codes that we can identify for example status code 200 - means that request has succeeded, status code 304 - means the file we are requesting for has not changed since last time, so if is in cache than the browser will show the file right away and is not necessary to download the file again.

When a computer send a [HTTP](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol) request for example to www.apple.com, the request goes in a route (path) until it arrive the destination host (www.apple.com). This route (path)  can be different each time the source host communicate with destination host.

So to see this route (path), you can use the diagnostic tool called `traceroute` on Linux or `tracert` on Windows and it will something like the screenshot below.

{: .center}
![traceroute linux](/assets/img/traceroute-linux.png)

### Netstat

When a computer has servers installed like [Apache](https://httpd.apache.org/), [Bind](http://www.bind9.net/), [DNS](https://en.wikipedia.org/wiki/Domain_Name_System) Server, etc, there is a number of ports of the host that will be open and listening from incoming connections from clients.

So on the image below you can see all the ports of all the servers running on the machine by executing the following command on the console `$ netstat -tnl`, this command is more specific to Operative Systems based on Linux. For Windows OS you can execute this command `netstat -a`.

{: .center}
![netstat linux](/assets/img/netstat-linux.png)

From the image you can see a lot of ports listening on the machine like 110 that is the default port for [IMAP](https://en.wikipedia.org/wiki/Internet_Message_Access_Protocol) server, 25 that is the port for [SMTP](https://en.wikipedia.org/wiki/Simple_Mail_Transfer_Protocol) server, 21 for [FTP](https://en.wikipedia.org/wiki/File_Transfer_Protocol) server and other. You can do a search on Google to find the server behind each port and just to be clear all ports are the default for each server that is running.

### Interfaces configurations

All computers that are connected to a network need to have at least two parameters configured on the network interface. These parameters are [IP Address](https://en.wikipedia.org/wiki/IP_address) and [Subnet Mask](https://en.wikipedia.org/wiki/Subnetwork), the IP Address is pretty most self explanatory, its an address to computer like your home address and its unique on the network.

The Subnet Mask tells computer to which network belong. To show the configurations of the network interfaces on console, just execute `$ ifconfig` on Linux and `$ ipconfig` on Windows.

{: .center}
![ifconfig linux](/assets/img/ifconfig-linux.png)

{: .center}
![ipconfig windows](/assets/img/ipconfig-windows-new.png)

### Netsh

Netsh, or network shell, is a command-line utility included in [Microsoft's Windows](https://en.wikipedia.org/wiki/Microsoft_Windows) NT line of operating systems beginning with Windows 2000. It allows local or remote configuration of network devices such as the interface.

A common use of netsh is to reset the [TCP/IP](https://en.wikipedia.org/wiki/Internet_protocol_suite) stack to default. Netsh, among many other things, also allows the user to change / show the IP address on their machine. For example if you run the command `netsh interface ip show config` will show the interfaces configuration like the image below.

{: .center}
![netsh windows](/assets/img/netsh-windows-new.png)

### Route

Every host connected to a network has a [IP routing table](https://en.wikipedia.org/wiki/Routing_table). To show / manipulate the IP routing table you just need to user the `route` command on the console. In Linux you just execute `$ route -n` and it prints out the host routing table like below.

{: .center}
![route linux](/assets/img/route-linux.png)

In Windows is a little bit different but same result, just execute `route print -4` on your [Command Prompt](https://en.wikipedia.org/wiki/Command-line_interface) and will print out something like the image below.

{: .center}
![route windows](/assets/img/route-windows-new.png)
