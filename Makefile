BUCKET=s3://missions.io/

all:

setup:
	@ npm i

start: setup
	@ npm start

build: setup
	@ npm run build

publish: build
	@ aws s3 cp --recursive --acl public-read dist/ ${BUCKET}
