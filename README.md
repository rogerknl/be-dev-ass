## The idea
Create a Web API with the following services.

1. Login
2. Get user data filtered by user id
3. Get user data filtered by user name
4. Get the list of policies linked to a user name
5. Get the user linked to a policy number

## Getting started
Previous installation of mongoDB is Required
______'

1. Clone the repo

```
$ git clone https://github.com/rogerknl/be-dev-ass.git
$ cd be-dev-ass
```
2. Install dependencies
```
$ npm install
```
3. Set all environment variables in .env ( look .env.example )
4. Generate all content of the DB

```
$ npm run loadDB
```
6. Start backend development server

```
$ npm run dev
```
##### *** This app is only a backEnd  ***

## EndPoints
1. POST /signin

```
  ---> body should contain username and password 
  <--- { token: "eyJhbGciOiJIUzI1..." }
```
##### Next endpoints requires user or admin role

2. GET  /user/byId/:userId

```
  ---> header requires bearer token 
  <--- { id: :userId, name: "...", email: "...", role: "..." }
```
3. GET  /user/byUsername/:username

```
  ---> header requires bearer token 
  <--- { id: "...", name: :username, email: "...", role: "..." }
```
##### Next endpoints requires admin role

4. GET  /policy/:username/

```
  ---> header requires bearer token (admin role)
  <--- { policies: [...] }
```
5. GET  /user/linkedTo/:poicyId

```
  ---> header requires bearer token (admin role)
  <--- { id: : "...", name: "...", email: "...", role: "..." }
```

You can use the following code for postman: [here](https://github.com/rogerknl/be-dev-ass/tree/develop/tests/be-dev-ass.postman_collection.json)
<details><summary>Show/hide</summary>
	
```
{
	"info": {
		"_postman_id": "6f85b76f-9c57-45da-9d77-e798059a270e",
		"name": "be-dev-ass",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
	},
	"item": [
		{
			"name": "Signin",
			"request": {
				"method": "POST",
				"header": [
					{
						"key": "Content-Type",
						"name": "Content-Type",
						"value": "application/json",
						"type": "text"
					}
				],
				"body": {
					"mode": "raw",
					"raw": "{\n\t\"username\": \"Roberts\",\n\t\"password\": \"Roberts\"\n}"
				},
				"url": {
					"raw": "{{url}}/signin",
					"host": [
						"{{url}}"
					],
					"path": [
						"signin"
					]
				}
			},
			"response": []
		},
		{
			"name": "user/byId/",
			"request": {
				"auth": {
					"type": "bearer",
					"bearer": [
						{
							"key": "token",
							"value": "{{token}}",
							"type": "string"
						}
					]
				},
				"method": "GET",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": ""
				},
				"url": {
					"raw": "{{url}}/user/byId/12f34e63-d4f1-4701-bbad-5b4b81a66a38",
					"host": [
						"{{url}}"
					],
					"path": [
						"user",
						"byId",
						"12f34e63-d4f1-4701-bbad-5b4b81a66a38"
					]
				}
			},
			"response": []
		},
		{
			"name": "user/byUsername",
			"request": {
				"auth": {
					"type": "bearer",
					"bearer": [
						{
							"key": "token",
							"value": "{{token}}",
							"type": "string"
						}
					]
				},
				"method": "GET",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": ""
				},
				"url": {
					"raw": "{{url}}/user/byUsername/Roberts",
					"host": [
						"{{url}}"
					],
					"path": [
						"user",
						"byUsername",
						"Roberts"
					]
				}
			},
			"response": []
		},
		{
			"name": "policies by username",
			"request": {
				"auth": {
					"type": "bearer",
					"bearer": [
						{
							"key": "token",
							"value": "{{token}}",
							"type": "string"
						}
					]
				},
				"method": "GET",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": ""
				},
				"url": {
					"raw": "{{url}}/policy/Britney",
					"host": [
						"{{url}}"
					],
					"path": [
						"policy",
						"Britney"
					]
				}
			},
			"response": []
		},
		{
			"name": "user linked To policy id",
			"request": {
				"auth": {
					"type": "bearer",
					"bearer": [
						{
							"key": "token",
							"value": "{{token}}",
							"type": "string"
						}
					]
				},
				"method": "GET",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": ""
				},
				"url": {
					"raw": "{{url}}/user/linkedTo/7b624ed3-00d5-4c1b-9ab8-c265067ef58b",
					"host": [
						"{{url}}"
					],
					"path": [
						"user",
						"linkedTo",
						"7b624ed3-00d5-4c1b-9ab8-c265067ef58b"
					]
				}
			},
			"response": []
		}
	]
}
```
*Remember to set up url and token vars
</details>

## Built with

* [Express ](https://expressjs.com/)- Framework for node js
* [MongoDB](https://www.mongodb.com/) - DataBase
* [Mongoose](https://mongoosejs.com/) - mongodb object modeling for node.js
* [JWT](https://www.npmjs.com/package/jsonwebtoken) - An implementation of JSON Web Tokens
* [Bcrypt](https://www.npmjs.com/package/bcrypt) - Library to help you hash passwords
* [Mocha](https://mochajs.org/) - Feature-rich JavaScript test framework
* [Chai](https://www.chaijs.com/) - A BDD / TDD assertion library
* [Sinon](https://sinonjs.org/) - Standalone test spies, stubs and mocks

## Author

- Roger Canela - [GitHub](https://github.com/rogerknl) [LinkedIn](https://www.linkedin.com/in/roger-canela-2a085826/)
