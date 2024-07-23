docker build . -t django-project-core --no-cache
docker run -d --name django-project-core -p 8000:8630 django-project-core