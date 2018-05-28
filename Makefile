BUCKET=s3://missions.io/
STG_BUCKET=s3://missions-stg/

FORCE:

setup: FORCE
	@npm i

start: setup
	@rsync -a ../dav-js/build src
	@npm start

stop: FORCE
	@npm run stop

build: setup
	@rsync -a ../dav-js/build src
	@npm run build

build-docker: FORCE
	docker-compose build --no-cache

up: build-docker
	docker-compose up

down: FORCE
	docker-compose down

publish: build
	@aws s3 cp --recursive --acl public-read dist/ ${BUCKET}

build-stg: setup
	@npm run build-stg

create-aws-stg-docker-env: FORCE
	@eb init missions
	@eb create missions-stg --cname missions-stg -k missions-stg-key

deploy-aws-stg-docker-env: FORCE
	@eb deploy --profile eb-cli-dav --staged

create-aws-stg-env: FORCE
	@aws s3api create-bucket --bucket missions-stg --region us-east-1

deploy-aws-stg-env: build-stg
	@cp -r ./src/html/. ./dist/html
	@aws s3 cp --recursive --acl public-read dist/ ${STG_BUCKET}
