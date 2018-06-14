BUCKET=s3://missions.io/
STG_BUCKET=s3://stg.missions.io/
WEBPACK=./node_modules/webpack/bin/webpack.js
WEBPACK_DEV=./node_modules/webpack-dev-server/bin/webpack-dev-server.js

FORCE:

setup: FORCE
	@npm i
	@rsync -a ../dav-js/build src

start-sim: setup
	@export APP=drone_simulation && export DOMAIN=mooving && ${WEBPACK_DEV} --config webpack.dev.js

start-sky: setup
	@export APP=drone_charging && ${WEBPACK_DEV} --config webpack.dev.js

start-gradd: setup
	@export APP=route_plans && ${WEBPACK_DEV} --config webpack.dev.js

stop: FORCE
	@npm run stop

build: setup
	@rsync -a ../dav-js/build src
	@npm run build

publish: build
	@aws s3 cp --recursive --acl public-read dist/ ${BUCKET}

build-stg: setup
	@rsync -a ../dav-js/build src
	@export APP=drone_simulation && export DOMAIN=mooving && ${WEBPACK} --config webpack.stg.js
	@export APP=route_plan && export DOMAIN=mooving && ${WEBPACK} --config webpack.stg.js
	@export APP=drone_charging && export DOMAIN=mooving && ${WEBPACK} --config webpack.stg.js
	@cp -r ./src/html/. ./dist/route_plan/html

deploy-aws-stg-env: build-stg
	@aws s3 cp --recursive --acl public-read dist/drone_simulation s3://mooving.io/
	@aws s3 cp --recursive --acl public-read dist/route_plan s3://route-plan.mooving.io/
	@aws s3 cp --recursive --acl public-read dist/drone_charging s3://drone-charging.mooving.io/
	# @aws s3 cp --recursive --acl public-read dist/ ${STG_BUCKET}
