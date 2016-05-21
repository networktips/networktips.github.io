---
layout: post
title:  "TCP/UDP Sockets - Linux"
date:   2016-01-20 16:16:01 +0000
thumbnail: "tcp-udp-socket-thumbnail.jpg"
categories: network
tags: socket udp tcp
---

A [network socket](https://en.wikipedia.org/wiki/Network_socket) is an endpoint of an inter-process communication across a computer network. Today, most communication between computers is based on the [Internet Protocol](https://en.wikipedia.org/wiki/Internet_Protocol), therefore most network sockets are Internet sockets. A socket address is the combination of an [IP](https://en.wikipedia.org/wiki/Internet_Protocol) address and a [port](https://en.wikipedia.org/wiki/Port_(computer_networking)) number. Based on this address, internet sockets deliver incoming data [packets](https://en.wikipedia.org/wiki/Network_packet) to the appropriate application [process](https://en.wikipedia.org/wiki/Process_(computing)) or [thread](https://en.wikipedia.org/wiki/Thread_(computing)).

If you want generic sockets written in Python, Perl, C and Java [click here](//www.prasannatech.net/2008/07/socket-programming-tutorial.html).

### UDP

[UDP](https://en.wikipedia.org/wiki/User_Datagram_Protocol) is a simple transport-layer protocol. The application writes a message to a [UDP](https://en.wikipedia.org/wiki/User_Datagram_Protocol) socket, which is then encapsulated in a [UDP](https://en.wikipedia.org/wiki/User_Datagram_Protocol) datagram, which is further encapsulated in an IP datagram, which is sent to the destination.
There is no guarantee that a [UDP](https://en.wikipedia.org/wiki/User_Datagram_Protocol) will reach the destination, that the order of the datagrams will be preserved across the network or that datagrams arrive only once.

### UDP Socket API

As shown in the Figure 1, the steps of establishing a UDP socket communication on the client side are as follows:

- Create a socket using the socket() function;
- Send and receive data by means of the recvfrom() and sendto() functions.

{: .center}
![tcp server](//www.cs.dartmouth.edu/~campbell/cs60/UDPsockets.jpg)
***Figure 1:** UDP client-server.*

### TCP

[TCP](https://en.wikipedia.org/wiki/Transmission_Control_Protocol) provides a connection oriented service, since it is based on connections between clients and servers.
[TCP](https://en.wikipedia.org/wiki/Transmission_Control_Protocol) provides reliability. When a [TCP](https://en.wikipedia.org/wiki/Transmission_Control_Protocol) client send data to the server, it requires an acknowledgement in return. If an acknowledgement is not received, [TCP](https://en.wikipedia.org/wiki/Transmission_Control_Protocol) automatically retransmit the data and waits for a longer period of time.

### TCP Socket API

The sequence of function calls for the client and a server participating in a TCP connection is presented in Figure 2.

{: .center}
![tcp server](//www.cs.dartmouth.edu/~campbell/cs60/TCPsockets.jpg)
***Figure 2:** TCP client-server.*

As shown in the figure, the steps for establishing a TCP socket on the client side are the following:

- Create a socket using the socket() function;
- Connect the socket to the address of the server using the connect() function;
- Send and receive data by means of the read() and write() functions.
- Close the connection by means of the close() function.

The steps involved in establishing a TCP socket on the server side are as follows:

- Create a socket with the socket() function;
- Bind the socket to an address using the bind() function;
- Listen for connections with the listen() function;
- Accept a connection with the accept() function. This call typically blocks until a client connects with the server.
- Send and receive data by means of write() and read().
- Close the connection by means of the close() function.
