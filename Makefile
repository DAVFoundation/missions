BUCKET=s3://missions.io/
## deploy to staging
STG_BUCKET=s3://missions-stg/
all:

setup:
	@ npm i

start: setup
	@ npm start

build: setup
	@ npm run build

publish: build
	@ aws s3 cp --recursive --acl public-read dist/ ${BUCKET}

build-stg: setup
	@ npm run build-stg

create-aws-stg-env:
	## create s3 bucket for missions
	@aws s3api create-bucket --bucket missions-stg --region us-east-1

deploy-aws-stg-env: build-stg
	@aws s3 cp --recursive --acl public-read dist/ ${STG_BUCKET}
