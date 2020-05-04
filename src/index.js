import React from 'react';
import ReactDOM from 'react-dom';
import AddEmployeeComponent from './AddEmployeeComponent';

class EmployeeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
    };

    //this.refreshList = this.refreshList.bind(this);
  }


  componentDidMount() {
    this.refreshList();
  }

  refreshList=()=>{
    fetch("https://localhost:44314/api/Employee").then(res => res.json()).then(

      result => {

        this.setState({ employees: result, errorMessage: "" });
      }
    ).catch((error) => {
      this.setState({ employees: [], errorMessage: "Problem fetching data" });
    });
  }


  render() {

    return (
      <div>
        <div>
          <h2>Employee Details...</h2>
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Location</th>
                <th>Salary</th>
              </tr>
            </thead>
            <tbody>
              {this.state.employees.map(emp => (
                <tr key={emp.Id}>
                  <td>{emp.Id}</td>
                  <td>{emp.Name}</td>
                  <td>{emp.Location}</td>
                  <td>{emp.Salary}</td>
                </tr>

              ))}
            </tbody>
          </table>
          <p><b style={{ color: "red" }}>{this.state.errorMessage}</b></p>
        </div>

        <AddEmployeeComponent refreshList={this.refreshList} ></AddEmployeeComponent>
      </div>
    )
  }
}

// class HomeComponent extends React.Component {
//   render() {

//     return (
//       <div>
//         <EmployeeComponent></EmployeeComponent><AddEmployeeComponent ></AddEmployeeComponent>

//       </div>
//     )
//   }
// }

const element = <EmployeeComponent></EmployeeComponent>
ReactDOM.render(element, document.getElementById("root"));
