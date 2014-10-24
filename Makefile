build:
	mkdir -p build
	browserify -t brfs test.js > build/build.js

.PHONY: build
