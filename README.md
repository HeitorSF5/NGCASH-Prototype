To run this for the first time, run these scripts from the ROOT directory in ORDER:

    docker compose up
    npm i
    npm run install:all


More scripts:
	on root
	docker compose up	-	sets up Docker v4 environment with Postgres v 15
	docker compose down	-	undoes Docker environment
	npm run install:all	-	installs dependencies on root, front and back (note: it installs Dev dependencies as well)
	npm run start:all	-	starts frontend, backend and runs the migration
	npm run start		-	starts frontend and backend
	npm run migrate		-	runs migration

	on frontend
npm start		-	starts react app in new browser
	npm run dev		-	starts react app in new browser with nodemon (requires Dev dependencies)
	npm i			-	installs standard dependencies
	npm i -D		-	installs development dependencies

	on backend
    	npm start		-	starts server
	npm run dev		-	starts server with nodemon (requires Dev dependencies)
	npm i			-	installs standard dependencies
	npm i -D		-	installs development dependencies
