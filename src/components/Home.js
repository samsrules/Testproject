import React,{Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import axios from 'axios';

class Home extends Component{
  constructor(props) {
    super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
    this.state = { //state is by default an object
      employee: [
          { id: 1, name: 'Wasif', age: 21,gender:'male', email: 'wasif@email.com',mobile_no:'9898989898' },
          
       ]
    }
 }

 componentWillMount(){
    axios({
      url: 'http://13.233.70.181/testapi/api/auth/listemployee',
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.api.v1+json'
      }
    })
    .then(response => {
      this.setState({
        employee:response.data.data
      })
    }) 
    .catch(err => {
      console.log(err);
    });
 }

 renderTableHeader() {
  let header = Object.keys(this.state.employee[0])
  return header.map((key, index) => {
     return <th style={{backgroundColor: "rgb(156, 150, 150)"}} key={index}>{key.toUpperCase()}</th>
  })
}
 

 renderTableData() {
  return this.state.employee.map((student, index) => {
     const { id, name, age,gender, email ,mobile_no} = student //destructuring
     return (
        <tr key={id}>
           <td>{id}</td>
           <td>{name}</td>
           <td>{age}</td>
           <td>{gender}</td>
           <td>{email}</td>
           <td>{mobile_no}</td>
        </tr>
     )
  })
}

  render(){

    console.log(this.state.employee);
    return(
      <div>
        <MuiThemeProvider>
          <div>
          <AppBar
             title="Employeee List"
           />
           
           <table style={divStyle}>
               <tbody>
               <tr>{this.renderTableHeader()}</tr>
                  {this.renderTableData()}
               </tbody>
            </table>
             
         </div>
         </MuiThemeProvider>
      </div>
    );
  }

}

const divStyle = {
  width: '90%',
  margin: '40px',
  border: '5px solid #ddd'
};





export default Home;