---
layout: post
title:  "Setup a FTP server - Linux"
date:   2016-01-17 22:36:01 +0000
categories: network
tags: ftp netstat
---

The File Transfer Protocol ([FTP](https://filezilla-project.org/)) is a standard network protocol used to transfer computer files between a client and server on a computer network. [FTP](https://filezilla-project.org/) is built on a client-server model architecture and uses separate control and data connections between the client and the server. [FTP](https://filezilla-project.org/) users may authenticate themselves with a clear-text sign-in protocol, normally in the form of a username and password, but can connect anonymously if the server is configured to allow it.

### VSFTPD

[Vsftpd](https://security.appspot.com/vsftpd.html) is probably the most secure and fastest [FTP](https://filezilla-project.org/) server for UNIX-like systems. [Vsftpd](https://security.appspot.com/vsftpd.html) is a GPL licensed [FTP](https://filezilla-project.org/) server for UNIX systems, including Linux. It is secure and extremely fast. If your requirements from an [FTP](https://filezilla-project.org/) server are security, performance and stability, vsftpd is probably the [FTP](https://filezilla-project.org/) server you are looking for! So Lets get started with the installation:

`$ sudo apt-get update` <br>
`$ sudo apt-get install vsftpd`

Now that vsftpd is installed you just need to do a few changes on the vsftpd configuration file with this command: `$ sudo nano /etc/vsftpd.conf`

{% highlight applescript linenos %}
# Uncomment this to enable any form of FTP write command.
write_enable=YES

# Uncomment this to restrict local users to their home directory.
chroot_local_user=YES

# Add this next line to allow local users writes on their home directory.
allow_writeable_chroot=YES
{% endhighlight %}

With this changes saved, restart vsftpd server with the folowing command to changes take effect on server: `$ sudo service vsftpd restart`.

### FileZilla

[FileZilla](https://filezilla-project.org/) is a free [FTP](https://en.wikipedia.org/wiki/File_Transfer_Protocol) solution. Both a client and a server are available. [FileZilla](https://filezilla-project.org/) is open source software distributed free of charge under the terms of the GNU General Public License. [FileZilla](https://filezilla-project.org/) Client is a fast and reliable cross-platform [FTP](https://en.wikipedia.org/wiki/File_Transfer_Protocol), [FTPS](https://en.wikipedia.org/wiki/FTPS) and [SFTP](https://en.wikipedia.org/wiki/SSH_File_Transfer_Protocol) client with lots of useful features and an intuitive graphical user interface. Just download and install on your system to proceed. Once you open [Filezilla](https://filezilla-project.org/) Client, just type the host that as vsftpd running, your ftp username and password and press return key to make a connection to vsftpd server. Below is an example:

{: .center}
![filezilla connection](/assets/img/filezilla-connection.png)

Most of FTP servers available are configured by default to use passive FTP. If you dont know about active and passive FTP, you must read this web page [Active FTP vs. Passive FTP, a Definitive Explanation](http://slacksite.com/other/ftp.html), all you need to know is explained there.
So passive mode on vsftpd is enabled by default, but you can manually configure the interval of ports that server will use. You just need to add a couple lines into vsftpd configuration file.

{% highlight applescript linenos %}
# Add this lines to manually configure the interval of ports.
pasv_min_port=40000
pasv_max_port=40100
{% endhighlight %}

Now just reconnect to vsftpd server with filezilla and check the connections on your machine with netstat.

`$ netstat -ant | grep 127.0.0.1`

{: .center}
![filezilla netstat linux](/assets/img/filezilla-netstat-linux.png)

The `netstat -ant | grep 127.0.0.1` command output show us the client connected to from port 34374 to port 21 of vsftpd server. This connection is for commands purpose only. For transfer data from server to client and vice-versa there is another connection between port 54531 and 40028. You can see port 40028 is contained in passive mode port interval configured on last step.
