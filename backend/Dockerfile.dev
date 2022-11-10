# Using lightweight alpine image
FROM python:3.8-alpine

# Install packages
RUN apk update
RUN pip install --no-cache-dir pipenv

# Define working directory and copy source code
WORKDIR /usr/src/app
COPY Pipfile Pipfile.lock bootstrap.sh ./
COPY api ./api

# Install API dependencies
RUN pipenv install --system --deploy

# Start app
EXPOSE 5000
ENTRYPOINT [ "/usr/src/app/bootstrap.sh" ]