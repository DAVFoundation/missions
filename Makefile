BUCKET=s3://missions.io/
## deploy to staging
STG_BUCKET=s3://missions-stg/
all:

setup:
	@npm i

start: setup
	@rsync -a ../dav-js/build src
	@npm start

stop:
	@npm run stop

build: setup
	@rsync -a ../dav-js/build src
	@npm run build

build-docker:
	docker-compose build

up: build-docker
	docker-compose up

down:
	docker-compose down

publish: build
	@aws s3 cp --recursive --acl public-read dist/ ${BUCKET}

build-stg: setup
	@npm run build-stg

create-aws-stg-docker-env:
	@eb init missions
	@eb create missions-stg --cname missions-stg -k missions-stg-key

deploy-aws-stg-docker-env:
	@eb deploy --profile eb-cli-dav --staged

create-aws-stg-env:
	## create s3 bucket for missions
	@aws s3api create-bucket --bucket missions-stg --region us-east-1

deploy-aws-stg-env: build-stg
	@cp -r ./src/html/. ./dist/html
	@aws s3 cp --recursive --acl public-read dist/ ${STG_BUCKET}

link-contracts:
	-rm -rf ./src/build
	-ln -s ../../contracts/build ./src
