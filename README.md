**App**

- A node app that implements a set of REST APIs allowing CRUD functionality for an employee resource.
- A front end component using React. The front end component:
  - Shows a list of the existing employees
  - Includes a way to create a new employee using the POST API

**Running the app**
- `npm run watch`

**Limitations**

Persistent storage is not used.
Client side validation isn't done.

**Endpoints**

POST http://localhost:3000/api/employees

- Create a new record using a randomly generated value as the unique identifier (i.e. _id field).  Validate that the following fields are included in the POST body and have the right type/format as posted below:
    - firstName (String)
    - lastName (String)
    - hireDate (YYYY-MM-DD format must be in the past)
    - role (String) - must be one of the following (case-insensitive):
        - CEO (can only be one of these)
        - VP
        - MANAGER
        - LACKEY

    - In addition to the fields included in the POST body, two fields in each new record are populated by different external APIs.  For example, a favorite joke and a favorite quote.
        - using API endpoints:

            https://ron-swanson-quotes.herokuapp.com/v2/quotes

            https://icanhazdadjoke.com

PUT http://localhost:3000/api/employees/:id

- Replace the record corresponding to :id with the contents of the PUT body


GET http://localhost:3000/api/employees/:id

- Return the record corresponding to the id parameter


GET http://localhost:3000/api/employees

- Return all current records


DELETE http://localhost:3000/api/employees/:id

- delete the record corresponding to the id parameter


**References**

- https://www.typescriptlang.org/docs/handbook/react-&-webpack.html
- https://reactstrap.github.io/
- http://expressjs.com/en/guide/routing.html
- https://www.npmjs.com/package/tsc-watch
- https://www.npmjs.com/package/node-fetch
- https://medium.com/@victorleungtw/how-to-use-webpack-with-react-and-bootstrap-b94d33765970