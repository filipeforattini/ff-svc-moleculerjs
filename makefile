all: up

up:
	docker-compose up -d

down:
	docker-compose down

logs:
	docker-compose logs --tail 100 -f app
