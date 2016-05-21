---
layout: post
title:  "Setup a Apache server - Linux"
date:   2016-01-16 18:15:01 +0000
categories: network
tags: apache http
---

A web server processes requests via [HTTP](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol), the basic network protocol used to distribute information on the [World Wide Web](https://en.wikipedia.org/wiki/World_Wide_Web). The primary function of a web server is to store, process and deliver web pages to clients. The communication between client and server takes place using the Hypertext Transfer Protocol ([HTTP](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol)).

### Apache

The [Apache](https://httpd.apache.org/) HTTP Server is the world's most used web server software. Apache played a key role in the initial growth of the [World Wide Web](https://en.wikipedia.org/wiki/World_Wide_Web). In 2009, it became the first web server software to serve more than 100 million [websites](https://en.wikipedia.org/wiki/Website). Lets start installing Apache by opening terminal (console) and type de following commands:

`$ sudo apt-get update` <br>
`$ sudo apt-get install apache2 -y`

Now that is installed you can go to your favorite browser and type `127.0.0.1` or `localhost` on the url text box. It should show something like the image below.

{: .center}
![apache default page](/assets/img/apache-default-page.png)

Next step is editing the html file that are being delivered by apache server:

`$ cd /var/www/html` <br>
`$ sudo cp index.html index2.html` <br>
`$ sudo nano index.html`

Open a text editor of your choice and code some HTML on it like the following:

{% highlight html linenos %}
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Web Server - RSC</title>
</head>
<body>
  <h1>Web Server - RSC</h1>
  <h2>YOUR NAME</h2>
  <h3>Redes e Serviços de Comunicação</h3>
</body>
</html>
{% endhighlight %}

Copy and paste the code to the terminal and them save by doing this keyboard combinations: `CTRL+X`, `Y`, `Return`. Now go to the browser again and refresh the webpage (127.0.0.1 or localhost). Should return something like the image below.

{: .center}
![apache edited page](/assets/img/apache-edited-page.png)

Now if you want to change the port that apache is listening for http requests then follow the commands below:

`$ cd /etc/apache2` <br>
`$ sudo nano ports.conf`

{% highlight applescript linenos %}
# If you just change the port or add more ports here, you will likely also
# have to change the VirtualHost statement in
# /etc/apache2/sites-enabled/000-default.conf

Listen 3355 # change to what you want

<IfModule ssl_module>
        Listen 443
</IfModule>

<IfModule mod_gnutls.c>
        Listen 443
</IfModule>
{% endhighlight %}


Then you need to change one more thing in the `000-default.conf` file in sites-available directory:

`$ sudo nano sites-available/000-default.conf`

{% highlight applescript linenos %}
<VirtualHost *:3355> # change to the same port that you edit on ports.conf

  ServerAdmin webmaster@localhost
  DocumentRoot /var/www/html

  ErrorLog ${APACHE_LOG_DIR}/error.log
  CustomLog ${APACHE_LOG_DIR}/access.log combined

</VirtualHost>
{% endhighlight %}

Just before you test apache on the new port you need to restart apache service with the following command `$ sudo service apache2 restart`.

{: .center}
![apache restart linux](/assets/img/apache-restart-linux.png)

Now on the browser you just add :3355 to the end of url (127.0.0.1 or localhost) and it will present the same web page edited in a few steps before.

{: .center}
![apache edited port](/assets/img/apache-edited-port.png)
