import * as React from "react";
import * as ReactDOM from "react-dom";

// Can't use this, since ts will complain that module is not found, but since this is css
//   and since we already added the boostrap dependency, we will know this will exist, so use "require" instead
// import * as Bootstrap from "bootstrap/dist/css/bootstrap.css";

const Bootstrap = require('bootstrap/dist/css/bootstrap.css');

import { Table, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, ModalFooter, Alert } from "reactstrap";
import { IEmployee } from "../../../typings/employee";

interface IIndexViewState {
    employees: IEmployee[];
    isDialogOpen: boolean;
    error: string;
}

export class IndexView extends React.Component<{}, IIndexViewState> {
    private _newEmployee: IEmployee = { role: "CEO" } as IEmployee;
    constructor(props: {}) {
        super(props);
        this.state = {
            employees: [],
            isDialogOpen: false,
            error: ""
        };
    }

    public componentDidMount() {
        this._refresh();
    }

    public render() {
        return <div>
            <EmployeeList employees={this.state.employees} />
            <Button color="primary" onClick={this._toggle} >{"Create Employee"}</Button>
            {/* Auto focus is false because of https://github.com/reactstrap/reactstrap/issues/659 */}
            {/* Fade is false because https://stackoverflow.com/questions/41795987/react-bootstrap-modal-not-showing */}
            <Modal
                isOpen={this.state.isDialogOpen}
                toggle={this._toggle}
                autoFocus={false}
                fade={false}>
                <ModalHeader toggle={this._toggle}>Create Employee</ModalHeader>
                <ModalBody>
                    {this.state.error && (
                        <div className="alert alert-danger">
                            {this.state.error}
                        </div>
                    )}
                    <Form onSubmit={this._onSubmit}>
                        <FormGroup>
                            <Label for="firstName">First name</Label>
                            <Input onChange={this._onFirstNameChange} required type="text" name="firstName" id="firstName" placeholder="Enter first name" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="lastName">Last name</Label>
                            <Input onChange={this._onLastNameChange} required type="text" name="lastName" id="lastName" placeholder="Enter last name" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="date">Hire date</Label>
                            <Input
                                onChange={this._onHireDateChange}
                                required
                                type="date"
                                name="date"
                                id="date"
                                placeholder="select hire date"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="role">Select role</Label>
                            <Input onChange={this._onRoleChange} type="select" name="select" id="role">
                                <option>CEO</option>
                                <option>VP</option>
                                <option>MANAGER</option>
                                <option>LACKEY</option>
                            </Input>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this._onSubmit}>Create</Button>&nbsp;
                    <Button color="secondary" onClick={this._toggle} >Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>;
    }

    private _toggle = () => {
        this.setState({ isDialogOpen: !this.state.isDialogOpen, error: "" });
    }

    private async _refresh() {
        const data = await fetch("api/employees");
        const result: { [id: string]: IEmployee } = await data.json();
        this.setState({
            employees: Object.values(result)
        });
    }

    private _onSubmit = async () => {
        fetch("api/employees", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this._newEmployee)
        }).then(async x => {
            if (x.status == 200) {
                // done!
                // reset data
                this._newEmployee = {} as IEmployee;
                this._refresh();
                this._toggle();
            }
            else if (x.status == 400) {
                // input validation failed!
                const error = await x.text();
                this.setState({
                    error: error
                });
            }
            else {
                console.log(x.status);
            }
        }).catch(x => {
            console.log(x);
        })
    }

    private _onFirstNameChange = (change: React.ChangeEvent<HTMLInputElement>) => {
        this._newEmployee.firstName = change.target.value;
    }

    private _onLastNameChange = (change: React.ChangeEvent<HTMLInputElement>) => {
        this._newEmployee.lastName = change.target.value;
    }

    private _onHireDateChange = (change: React.ChangeEvent<HTMLInputElement>) => {
        this._newEmployee.hireDate = change.target.value.replace("/", "-");
    }

    private _onRoleChange = (change: React.ChangeEvent<HTMLInputElement>) => {
        this._newEmployee.role = change.target.value;
    }
}

interface IEmployeeListProps {
    employees: IEmployee[];
}

// This is a stateless component
class EmployeeList extends React.PureComponent<IEmployeeListProps, {}> {
    public render() {
        return <Table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>Hire date</th>
                    <th>Role</th>
                    <th>Favourite joke</th>
                    <th>Favourite quote</th>
                </tr>
            </thead>
            <tbody>
                {this.props.employees.map(x => {
                    return <tr>
                        <td>{x._id}</td>
                        <td>{x.firstName}</td>
                        <td>{x.lastName}</td>
                        <td>{x.hireDate}</td>
                        <td>{x.role}</td>
                        <td>{x.favouriteJoke}</td>
                        <td>{x.favouriteQuote}</td>
                    </tr>
                })}
            </tbody>
        </Table>;
    }
}

ReactDOM.render(
    <IndexView />,
    document.getElementById("index")
);
