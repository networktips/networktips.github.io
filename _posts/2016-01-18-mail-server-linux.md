---
layout: post
title:  "Setup a Email server - Linux"
date:   2016-01-18 15:26:01 +0000
thumbnail:  "squirrelmail-test.png"
categories: network
tags: mail imap pop3 smtp
---

Simple Mail Transfer Protocol ([SMTP](https://en.wikipedia.org/wiki/Simple_Mail_Transfer_Protocol)) is an Internet standard for electronic mail (email) transmission. [SMTP](https://en.wikipedia.org/wiki/Simple_Mail_Transfer_Protocol) by default uses [TCP](https://en.wikipedia.org/wiki/Transmission_Control_Protocol) port 25. The protocol for mail submission is the same, but uses port 587. [Sendmail](http://www.sendmail.com/) was one of the first mail transfer agents to implement [SMTP](https://en.wikipedia.org/wiki/Simple_Mail_Transfer_Protocol).

Over time, as BSD Unix became the most popular operating system on the Internet, sendmail became the most common MTA (mail transfer agent). In 1999 [Postfix](http://www.postfix.org/) (released in December 1998) starts to take a lot of adoption because its performance, easy configuration and most important the security that was one thing that sendmail struggle in some versions. Some other popular [SMTP](https://en.wikipedia.org/wiki/Simple_Mail_Transfer_Protocol) server programs include [qmail](http://www.qmail.org/), [Exim](http://www.exim.org/), etc.


### Postfix

Lets get started by installing postfix on a machine:

`$ sudo apt-get update` <br>
`$ sudo apt-get install postfix -y`

On installation process choose "Internet Site" and them type a mail name of your choice.

{: .center}
![postfix internet site](/assets/img/postfix-internet-site.png)

{: .center}
![postfix mail name](/assets/img/postfix-mail-name.png)

Now you just need to change somethings on postfix configuration file, follow the next steps:

`$ cd /etc/postfix` <br>
`$ sudo nano main.cf`

Go to the end of file and make the necessary changes to look like the next code:

{% highlight applescript linenos %}
smtpd_relay_restrictions = permit_mynetworks permit_sasl_authenticated defer_unauth_destination
myhostname = ubuntu   # your machine hostname
alias_maps = hash:/etc/aliases
alias_database = hash:/etc/aliases
myorigin = /etc/mailname
mydestination = linux.dr.pt, localhost.localdomain, localhost
relayhost =
mynetworks = 127.0.0.0/8 10.0.0.0/24    # your network
mailbox_size_limit = 0
recipient_delimiter = +
inet_interfaces = all
inet_protocols = ipv4     # just use ipv4 protocol

home_mailbox = Maildir/   # define the root of mailbox
{% endhighlight %}

Just save the file (`CTRL+X`,`Y`,`Return`) and restart postfix with this command: `$ sudo service postfix restart`.

### Dovecot

At this point you have postfix configured and running. Now lets add [IMAP](https://en.wikipedia.org/wiki/Internet_Message_Access_Protocol) and [POP3](https://en.wikipedia.org/wiki/Post_Office_Protocol) protocols to our mail server. [Dovecot](http://www.dovecot.org/) is an open-source [IMAP](https://en.wikipedia.org/wiki/Internet_Message_Access_Protocol) and [POP3](https://en.wikipedia.org/wiki/Post_Office_Protocol) server for Linux/UNIX-like systems released in July 2002.

[Dovecot](http://www.dovecot.org/) developers primarily aim to produce a lightweight, fast and easy-to-set-up open-source mail server. According to [Openemailsurvey](http://www.openemailsurvey.org/) [Dovecot](http://www.dovecot.org/) has an installed base of over 2.9 million email servers all over the world and a global market share of 57% of all [IMAP](https://en.wikipedia.org/wiki/Internet_Message_Access_Protocol) servers. Next steps are install dovecot-imap, dovecot-pop3 and configure them.

`$ sudo apt-get install dovecot-imapd dovecot-pop3d -y`

When it prompts to if you want to create a self-signed SSL certificate, choose yes and on next screen type the mail name that you choose a few steps before.

`$ cd /etc/dovecot` <br>
`$ sudo nano dovecot.conf`

Make this changes:

{% highlight applescript linenos %}
# Add this lines
protocols = imap pop3
listen = *

# Uncomment this line
login_greeting = Dovecot ready.
{% endhighlight %}

`$ cd conf.d` <br>
`$ sudo nano 10-auth.conf`

{% highlight applescript linenos %}
# Uncomment this line
disable_plaintext_auth = yes

# Add login on this line
auth_mechanisms = plain login
{% endhighlight %}

`$ sudo nano 10-mail.conf`

{% highlight applescript linenos %}
# Change this line
mail_location = maildir:~/Maildir
{% endhighlight %}

`$ sudo nano 10-master.conf`

{% highlight applescript linenos %}
service imap-login {
  inet_listener imap {
    port = 143    # Uncomment this line
  }
  inet_listener imaps {
    #port = 993
    #ssl = yes
  }
}

service pop3-login {
  inet_listener pop3 {
    port = 110    # Uncomment this line
  }
  inet_listener pop3s {
    #port = 995
    #ssl = yes
  }
}

# Make the necessary changes to the next lines
unix_listener auth-userdb {
	mode = 0600
	user = postfix
	group = postfix
}
{% endhighlight %}

With all this changes saved, you just need to restart dovecot with this command: `$ sudo service dovecot restart`. By executing the command `$ netstat -tnl` you can see all machine ports that are listening:

{: .center}
![dovecot netstat](/assets/img/dovecot-netstat.png)

{: .center}
![dovecot telnet](/assets/img/dovecot-telnet.png)

Now lets test this mail server with a email client. There are a lot of programs available on the internet but the most popular for linux are [Thunderbird](https://www.mozilla.org/en-US/thunderbird/), [Evolution](https://wiki.gnome.org/Apps/Evolution/), [Geary](https://wiki.gnome.org/Apps/Geary/) and [Sylpheed](http://sylpheed.sraoss.jp/en/).

I choose Thunderbird because when you’re dealing with hundreds or thousands of emails every day, speed is a primary concern and this email client delivers. So open Thunderbird and configure your email account:

> Note that server hostname is relative to the machine that is running the mail server. So if you are setting up Thunderbird on the mail server machine, you can use 127.0.0.1. If not you need to input the IP of the mail server machine.

{: .center}
![thunderbird config](/assets/img/thunderbird-config.png)

{: .center}
![thunderbird config](/assets/img/thunderbird-config-exception.png)

### SquirrelMail

[SquirrelMail](http://squirrelmail.org/) is a standards-based webmail package written in [PHP](https://www.php.net/). It includes built-in pure [PHP](https://www.php.net/) support for the [IMAP](https://en.wikipedia.org/wiki/Internet_Message_Access_Protocol) and [SMTP](https://en.wikipedia.org/wiki/Simple_Mail_Transfer_Protocol) protocols, and all pages render in pure HTML 4.0 (with no [JavaScript](https://en.wikipedia.org/wiki/JavaScript) required) for maximum compatibility across browsers.

It has very few requirements and is very easy to configure and install. Next step is to take our mail server to "next level" installing SquirrelMail test on browser:

`$ sudo apt-get install squirrelmail` <br>
`$ sudo cp /etc/squirrelmail/apache.conf /etc/apache2/sites-available/squirrelmail.conf` <br>
`$ sudo nano /etc/apache2/sites-available/squirrelmail.conf`

{% highlight applescript linenos %}
# Uncomment the next lines
<VirtualHost *:80>   # change 1.2.3.4 to *:80
  DocumentRoot /usr/share/squirrelmail
  ServerName mail.linux.dr.pt
</VirtualHost>
{% endhighlight %}

`$ sudo a2ensite squirrelmail` <br>
`$ sudo service apache2 restart`

As we don't have a DNS server on the system yet, just add the following line to your hosts file:

`$ sudo nano /etc/hosts`

{% highlight applescript linenos %}
# Add this line to the file
127.0.0.1   mail.linux.dr.pt
{% endhighlight %}

Now you are good to go test SquirrelMail on a web browser and type this url: `mail.linux.dr.pt`.

{: .center}
![squirrelmail test](/assets/img/squirrelmail-test.png)

One more step to make SquirrelMail page show our mail server name:

`$ sudo squirrelmail-configure`

{: .center}
![squirrelmail organization](/assets/img/squirrelmail-organization-preferences.png)

{: .center}
![squirrelmail server](/assets/img/squirrelmail-server-settings.png)

{: .center}
![squirrelmail server](/assets/img/squirrelmail-test-edited.png)
