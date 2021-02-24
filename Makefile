# ARGS:
# V: version - ex: v1.0.0

.DEFAULT_GOAL=docker_build

docker_build:
	docker build -t gcr.io/rowan-senior-project/tensorbeat-scraper:$(V) .

docker_push: docker_build
	docker push gcr.io/rowan-senior-project/tensorbeat-scraper:$(V)
