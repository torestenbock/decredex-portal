
# Default print the help
.DEFAULT_GOAL := help


# Self-documentation trick (https://marmelab.com/blog/2016/02/29/auto-documented-makefile.html)
help: ## This help (default)
	@echo
	@echo "Decredex Next.js Application"
	@echo
	@echo "Options:"
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z0-9_-]+:.*?## / {printf "\033[36m%-24s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)
	@echo


#############################
###    BUILD COMMANDS     ###
#############################

build: ## Rebuild all images
	-docker build -f Dockerfile -t decredex-portal .
	@echo "=== Build finished ===\n"

build-fresh: build-clean build ## Clean and build fresh all images

build-clean: ## Clean up all the images
	@echo "Removing existing containers..."
	-docker rm -vlf decredex-portal
	@echo "Removing base and main images..."
	-docker rmi -f decredex-portal
	@echo "=== Clean finished ===\n"


#############################
###     RUN COMMANDS      ###
#############################

dev: ## Run local dev instance
	@echo "=== Running local dev instance ===\n"
	-npm install
	-npm run dev

prod: build ## Run docker prod instance
	@echo "=== Running docker prod instance ===\n"
	-docker run --rm -p 3000:3000 decredex-portal npm run production

tests: build ## Run test suite
	@echo "=== Running local prod instance ===\n"
	-docker run --rm decredex-portal npm run test

coverage: build ## Run coverage suite
	@echo "=== Running local prod instance ===\n"
	-docker run --rm decredex-portal npm run coverage
