#!/bin/sh
export FLASK_APP=./api/app.py
pipenv run flask --debug run -h 0.0.0.0