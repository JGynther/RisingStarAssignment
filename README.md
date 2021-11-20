# RisingStarAssignment

Pre-assignment for _Vincit Rising Star 2021_ -program.


## The assignment
> Scrooge McDuck is once again requesting consultation from fellow ducks at Vincit.
> This time Scrooge has his eyes on cryptocurrency — bitcoin to be exact — and he needs a tool to
> analyze its market value for a given date range.

My mission — since I chose to accept it — was to create an application to meet Scrooge McDuck's needs. Using CoinGecko's public cryptocurrency API to provide different metrics for a given date range of data on Bitcoin. 

Scrooge was interested in 3 metrics specifically:

  1) Longest downtrend in Bitcoins price given a date range
 
  2) Date with the highest trading volume given a date range
 
  3) Given Scrooge's time machine, best time to buy and sell Bitcoin given a date range for maximum profit
      - Side note: effects of time travel were to not be considered sadly


## My solution

I decided that the simplest way to provide Scrooge with the required metrics was a simple backend API. Created with Nodejs using the simple Expressjs framework for a light but extensible result. 

> **_Note:_** The solution is quite a naive proof-of-concept type of solution and is not (nor is it ment to be) a production ready API. It ommits many important features like cors and security.

#### A little about the architecture
The app consists of the main index.js file and 2 subfolders: api and lib. The main index file handles the actual API part of the application: handling GET requests. The api folder contains 3 apis to calculate the desired metrics for Scrooge. The lib folder contains some self-made utilities to make (my) life easier.

## Get started
### Installation
You will need Nodejs and a package manager like npm or yarn installed on your local machine to run the application.
````console
$ node -v # Check for Nodejs version
````
````console
$ npm -v # Check for npm version or
$ yarn -v # yarn version
````

### Cloning the repo
There are multiple ways to clone a repo from Github but the easiest one is using the Github cli tool.
````console
$ gh repo clone JGynther/RisingStarAssignment
````

### Starting the app
````console
$ cd RisingStarAssignment
$ npm install # or yarn install
$ npm start # or yarn start
````
Running the above should print the following:
````console
# Example with yarn 
yarn run v1.22.10
$ node index.js
Listening on port 8000
````
If you then open http://localhost:8000/ on your browser, you should see a simple hello world message.
#### Done! The app is now running on your local machine.

## Using the API
The API contains 3 main endpoints **/downtrend**, **/maxvolume** and **/timemachine**.
All GET requests follow the same generic structure:
````rest
GET /endpoint/:startDate:-:endDate:
````
Where the parameters _:startDate:_ and _:endDate:_ are dates with _YYYYMMDD_ -format. The parameters are separated by a "-".

#### Example query
With the app running on your local machine you can make a test query using cURL:
````console
$ curl http://localhost:8000/downtrend/20200101-20200201
````

> **_Note:_** here we are querying the longest downtrend in days from 2020-01-01 to 2020-02-01

The above cURL request should return:
````json
{ "startDate": "2020-01-01", "endDate": "2020-02-01", "downtrend": 2 }
````

### GET /downtrend
#### Query format:
````rest
GET /downtrend/:startDate:-:endDate:
````
> Parameters: :startDate: and :endDate: are dates formatted as _YYYYMMDD_

#### Result:
````json
{
  "startDate": "YYYY-MM-DD",
  "endDate": "YYYY-MM-DD",
  "downtrend": int
}
````
>  - startDate (string): parameter :startDate: (formatted _YYYY-MM-DD_)
>  - endDate (string): parameter :endDate: (formatted _YYYY-MM-DD_)
>  - downtrend (int): longest downtrend as a number of days

### GET /maxvolume
#### Query format:
````rest
GET /maxvolume/:startDate:-:endDate:
````
> Parameters: :startDate: and :endDate: are dates formatted as _YYYYMMDD_

#### Result:
````json
{
  "startDate": "YYYY-MM-DD",
  "endDate": "YYYY-MM-DD",
  "maxVolume": float,
  "date": "YYYY-MM-DD"
}
````
>  - startDate (string): parameter :startDate: (formatted _YYYY-MM-DD_)
>  - endDate (string): parameter :endDate: (formatted _YYYY-MM-DD_)
>  - maxVolume (float): maximum volume in euros
>  - date (string): date when maximum volume occured (formatted _YYYY-MM-DD_)

### GET /timemachine
#### Query format:
````rest
GET /timemachine/:startDate:-:endDate:
````
> Parameters: :startDate: and :endDate: are dates formatted as _YYYYMMDD_

#### Result:
````json
{
  "startDate": "YYYY-MM-DD",
  "endDate": "YYYY-MM-DD",
  "buyDate": "YYYY-MM-DD",
  "sellDate": "YYYY-MM-DD"
}
````
>  - startDate (string): parameter :startDate: (formatted _YYYY-MM-DD_)
>  - endDate (string): parameter :endDate: (formatted _YYYY-MM-DD_)
>  - buyDate (string): date to buy Bitcoin for maximum profit (formatted _YYYY-MM-DD)
>  - sellDate (string): date to sell Bitcoin for maximum profit (formatted _YYYY-MM-DD)

> **_Note:_** buyDate and sellDate return as NaN if price of Bitcoin only decreased in the date range.

## Author
(c) Joona Gynther
