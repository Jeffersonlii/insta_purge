# Insty - Currently in Development
This react app automates common instagram management tasks
 - supports multiple instagram accounts
 - REST apis written in Flask backend
 - token based authentication 
 - instagram control done using [instaPy](https://github.com/timgrossmann/InstaPy)
## GET STARTED
 - frontend
   1. `npm i`
   2. `npm run start`
 - backend
   1. create your python virtual enviroment
   2. run 'pip install flask' in created enviroment
   3. run 'set FLASK_APP=app.py' 
   4. `py __init__.py` to run server 
## TODO - Flutter Frontend
 - [x] implement user login
   - [x jwt based authentication
 - [ ] implement multiple instagram accounts
   - [ ] add an account
     - [x] adding 
     - [ ] check if account is valid before insertion
   - [x] deleting
   - [ ] modifying
   - [ ] switching between accounts
 - [ ] caching
   - [x] cached token
   - [ ] cached login
 - [ ] set up dashboard views
 - [ ] deploy to heroku

## TODO - Flask backend
 - [x] set up base models and serializers
    - [x] auth apis
      - [x] login
    - [ ] dashboard apis
      - [ ] scheduler to schedule automated tasks
      
 - [ ] restrict usage
## Known Issues
 - [ ]

## Potential Future Features
 - [ ] dark theme
## Credits
| Role          | Individual  |
| ------------- | -----:      |
| Programmer    | [Jefferson Li](https://www.linkedin.com/in/jeffersonlii/)|
| UI UX Designer| [Jefferson Li](https://www.linkedin.com/in/jeffersonlii/)|

![image](https://user-images.githubusercontent.com/32963293/90210529-2efacd00-ddbc-11ea-99e7-13a19ed61b5b.png)
