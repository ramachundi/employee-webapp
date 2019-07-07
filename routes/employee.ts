'use strict';

import { Request, Response, Router, response } from "express";
import { getRandomId, getFavoriteJoke, getFavouriteQuote } from "../utils/common";
import { IEmployee } from "../typings/employee";
const router = Router();

const hireDateRegx = /^\d{4}\-\d{1,2}\-\d{1,2}$/;


const DATABASE: { [id: string]: IEmployee; } = {};


/* GET employees listing. */
router.get('', function (req: Request, res: Response) {
  return res.send(DATABASE);
});

/* GET an employee. */
router.get('/:id', function (req: Request, res: Response) {
  const employee = DATABASE[req.params.id];
  if (employee) {
    return res.send(employee);
  }
  return res.status(404).send("Details are not found");

});

/* POST employee data. */
router.post('', async function (req, res) {
  let employee = req.body as IEmployee;
  if (!employee.firstName) {
    return res.status(400).send("firstName is required");
  }
  if (!employee.lastName) {
    return res.status(400).send("lastName is required");
  }
  if (!employee.hireDate) {
    return res.status(400).send("hireDate is required");
  }
  if (!hireDateRegx.test(employee.hireDate.toString())) {
    return res.status(400).send("hireDate should be in the format of YYYY-MM-DD");
  }

  const validRoles = ["CEO", "VP", "MANAGER", "LACKEY"];
  const isValidRole = (validRoles.indexOf(employee.role.toUpperCase()) > -1);

  if (!isValidRole) {
    return res.status(400).send("'role' should exist and should be one of - " + validRoles.join(","));
  }

  let result: IEmployee = { ...employee };
  result._id = getRandomId();
  result.favouriteJoke = await getFavoriteJoke();
  result.favouriteQuote = await getFavouriteQuote();

  DATABASE[result._id] = result;
  return res.send(result);
});


/* PUT update employee data. */
router.put('/:id', function (req, res) {
  let employee = DATABASE[req.params.id];
  if (!employee) {
    return res.status(404).send("Employee not found");
  }
  let employeeFromRequest = req.body as IEmployee;
  employee.firstName = employeeFromRequest.firstName || employee.firstName;
  employee.lastName = employeeFromRequest.lastName || employee.lastName;

  if (employeeFromRequest.hireDate && !hireDateRegx.test(employeeFromRequest.hireDate.toString())) {
    return res.status(400).send("hireDate should be in the format of YYYY-MM-DD");
  }
  employee.hireDate = employeeFromRequest.hireDate || employee.hireDate;
  employee.role = employeeFromRequest.role || employee.role;
  employee.favouriteJoke = employeeFromRequest.favouriteJoke || employee.favouriteJoke;
  employee.favouriteQuote = employeeFromRequest.favouriteQuote || employee.favouriteQuote;
  return res.send(employee);
});

/* DELETE employee. */
router.delete('/:id', function (req, res) {

  delete DATABASE[req.params.id];
  return res.send();
});

export = router;
