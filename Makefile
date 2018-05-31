BUCKET=s3://missions.io/
STG_BUCKET=s3://stg.missions.io/

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
	@rsync -a ../dav-js/build src
	@npm run build-stg

deploy-aws-stg-env: build-stg
	@cp -r ./src/html/. ./dist/html
	@aws s3 cp --recursive --acl public-read dist/ ${STG_BUCKET}
