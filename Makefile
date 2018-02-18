all:

setup:
	@npm i

start: setup
	@npm start

build: setup
	@npm run build

publish: build
  @aws s3 cp dist/ s3://missions.io/ --recursive --acl public-read
