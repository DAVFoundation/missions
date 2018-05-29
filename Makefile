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

publish: build
	@aws s3 cp --recursive --acl public-read dist/ ${BUCKET}

build-stg: setup
	@npm run build-stg

create-aws-stg-env: FORCE
	@aws s3api create-bucket --bucket missions-stg --region us-east-1

deploy-aws-stg-env: build-stg
	@cp -r ./src/html/. ./dist/html
	@aws s3 cp --recursive --acl public-read dist/ ${STG_BUCKET}
