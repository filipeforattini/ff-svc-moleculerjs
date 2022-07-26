make: up

up:
	docker-compose \
		--project-name ff-cluster \
		--file ./shared.docker-compose.yml \
		--log-level ERROR \
		up -d \
		&& make logs

down:
	docker-compose \
		--project-name ff-cluster \
		--file ./shared.docker-compose.yml \
		--log-level ERROR \
		down

logs:
	docker-compose \
		--project-name ff-cluster \
		--file ./shared.docker-compose.yml \
		--log-level ERROR \
		logs --tail 100 -f app-moleculer

restart:
	docker-compose \
		--project-name ff-cluster \
		--file ./shared.docker-compose.yml \
		--log-level ERROR \
		restart app-moleculer \
	&& make logs

ps:
	docker-compose \
		--project-name ff-cluster \
		--file ./shared.docker-compose.yml \
		ps
