.PHONY: up db iterm-split

# start up local development
up: db iterm-split

db:
	docker-compose up -d --build database 

iterm-split:
	echo "starting everything"
	./make-start-script.sh $$(pwd)