ENV_FILE = $(shell [ -e ".env" ] && echo ".env" || echo ".env.public")

include $(ENV_FILE)

.PHONY: up db iterm-split launch setup stop

# start up local development
up: setup db iterm-split

db:
	docker-compose up -d --build database

iterm-split:
	echo "starting everything"
	./make-start-script.sh $$(pwd)

launch:
	docker-compose --env-file=$(ENV_FILE) -f docker-compose.yml up --build

setup:
	echo "checking if web config files are config folder"
	test -s ./config/backend.env || { echo "Missing backend config file"; exit 1; }
	test -s ./config/database.env || { echo "Missing database config file"; exit 1; }
	test -s ./config/frontend.env || { echo "Missing frontend config file"; exit 1; }
	cp ./config/backend.env ./backend/.env
	cp ./config/database.env ./database/.env
	cp ./config/frontend.env ./frontend/.env

stop: 
	docker-compose --env-file=$(ENV_FILE) -f docker-compose.yml down