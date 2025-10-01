ARG PYTHON_VERSION=3.13-slim

FROM python:${PYTHON_VERSION}

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Create a non-root user
RUN groupadd -r django && useradd -r -g django django

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /code

WORKDIR /code

# Copy requirements first for better caching
COPY requirements.txt /tmp/requirements.txt
RUN set -ex && \
    pip install --upgrade pip && \
    pip install -r /tmp/requirements.txt && \
    rm -rf /root/.cache/

# Copy the application code
COPY . /code

# Create necessary directories and set permissions
RUN mkdir -p /code/static /code/media && \
    chown -R django:django /code

# Switch to non-root user
USER django

# Run database migrations and start server
EXPOSE 8000

CMD ["sh", "-c", "echo 'Running migrations...' && python manage.py migrate --noinput || echo 'Migrations failed, continuing...' && echo 'Starting Django server on 0.0.0.0:8000...' && python manage.py runserver 0.0.0.0:8000"]
