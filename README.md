# CompassEdu Starter Project
A starter project for the NPM package [CompassEdu](https://github.com/Maytha8/CompassEdu).

## Usage
```sh
git clone https://github.com/Maytha8/CompassEdu-Getting-Started.git getting-started
cd getting-started
```
Copy `config-example.json` to `config.json` and edit it, adding your base URL, username, and password. Then you can run:
```sh
npm install
npm start
```
Now go to [https://localhost:3000](https://localhost:3000) and see for yourself!

## Troubleshooting
```
Error: Cannot find module './config.json'
```
There's no `config.json` file! Copy `config-example.json` to `config.json` and edit it, adding your base URL, username, and password.

```
Error: The username and/or password provided are incorrect.
```
Check your config.json credentials.
