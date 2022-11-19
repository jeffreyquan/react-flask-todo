# Using lightweight alpine image
FROM python:3.8.3-slim

# Install packages
RUN apt-get update \
    && apt-get -y install libpq-dev gcc \
    && pip install psycopg2
RUN pip install --no-cache-dir pipenv

# Define working directory and copy source code
WORKDIR /usr/src/app
COPY Pipfile Pipfile.lock ./
COPY app ./app
COPY run.py ./app

# Install API dependencies
RUN pipenv install --system --deploy

# Install gunicorn
RUN pip install gunicorn

# Start app
EXPOSE 5000
CMD ["gunicorn","-b","0.0.0.0:5000", "app.main:app"]