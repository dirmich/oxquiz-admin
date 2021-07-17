FROM nginx
MAINTAINER David, Shin <dirmich@gmail.com>

# VOLUME ./default.conf:/etc/nginx/conf.d/default.conf
# COPY default.conf /etc/nginx/conf.d/default.conf 
# COPY dist/* /usr/share/nginx/html
# Expose the ports for nginx
EXPOSE 80 443