# syntax=docker/dockerfile:1
FROM python:3.11
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /code
COPY requirements.txt /code/
RUN pip install -r requirements.txt
COPY ./core /code/
RUN python -m manage collectstatic --no-input

ENTRYPOINT ["run-program", "gunicorn", "--bind", "0.0.0.0:8630", "--worker-class=gevent", "--worker-connections=1000", "--workers=4", "core.wsgi:application"]