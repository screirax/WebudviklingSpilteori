# Brug en officiel PHP Docker image med Apache
FROM php:8.3-apache

# Installer nødvendige PHP-udvidelser
RUN docker-php-ext-install mysqli pdo pdo_mysql

# Aktiver mod_rewrite for Apache
RUN a2enmod rewrite

# Skift til projektets mappe
WORKDIR /var/www/html

# Kopier alle projektfiler til containeren
COPY . /var/www/html/

# Eksponer port 80
EXPOSE 80