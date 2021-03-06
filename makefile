NAME    := pokeql
REMOTE  := 824714483059.dkr.ecr.us-east-1.amazonaws.com
GIT_TAG := $$(git log -1 --pretty=%h)
IMG     := ${NAME}:${GIT_TAG}
LATEST  := ${NAME}:latest

	# @sh $(aws ecr get-login --no-include-email --region us-east-1)
	# @echo ${GIT_TAG}

local: 
	@echo ${LATEST} ${IMG} $(GIT_TAG)
	@docker build --no-cache --build-arg env=local -t ${IMG}-local .
	@docker tag ${LATEST} ${REMOTE}/${IMG}-local
run-prod: 
	@echo ${LATEST} ${IMG} $(GIT_TAG)
	@docker run -it -p 3001:3001 ${IMG}-prod ${CMD}
prod: 
	@echo $(GIT_TAG)
	@docker build --no-cache --build-arg env=production -t ${IMG}-prod .
	@docker tag ${LATEST} ${REMOTE}/${IMG}-prod
push:
	@echo ${REMOTE}/${IMG}-${ENV}
	@docker push ${REMOTE}/${IMG}-${ENV}