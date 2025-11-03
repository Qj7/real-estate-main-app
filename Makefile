.PHONY: help install dev build up down clean logs

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  %-15s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

install: ## Install all dependencies
	npm install
	cd apps/miniapp-front && npm install
	cd apps/admin-front && npm install
	cd apps/api && npm install
	cd apps/events-api && npm install

dev: ## Start development servers
	npm run dev

build: ## Build all applications
	npm run build

up: ## Start Docker containers
	docker-compose up -d

down: ## Stop Docker containers
	docker-compose down

clean: ## Clean all build artifacts and node_modules
	npm run clean
	rm -rf node_modules
	cd apps/miniapp-front && rm -rf node_modules .next
	cd apps/admin-front && rm -rf node_modules .next
	cd apps/api && rm -rf node_modules dist
	cd apps/events-api && rm -rf node_modules dist

logs: ## Show Docker logs
	docker-compose logs -f

db-reset: ## Reset database (WARNING: deletes all data)
	docker-compose down -v
	docker-compose up -d postgres
	sleep 5
	docker-compose exec postgres psql -U postgres -d real_estate -f /docker-entrypoint-initdb.d/init.sql

