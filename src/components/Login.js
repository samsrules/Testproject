import React,{Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import {NotificationContainer, NotificationManager} from 'react-notifications';
//import 'react-notifications/lib/notifications.css';

class Login extends Component{

  constructor(props){
    super(props);
    this.state={
      email:'',
      password:''
    }
  }


  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleClick(event){
    var payload={
      "email_id":this.state.email,
      "password":this.state.password
    }

    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.api.v1+json'
    }
    axios.post(`http://13.233.70.181/testapi/api/auth/login`, payload, {
      headers: headers
    })
    .then(function (response) {
      console.log(response);
      if(response.data.status == 200){
        NotificationManager.success('Login successfull');
        //this.props.history.push('/about')
        window.location.href="/Home"

      }
      else if(response.data.status == 201){
        NotificationManager.warning('Useremail password do not match', 3000);
      }
      else{
        NotificationManager.error('Username does not exists', 3000);
      }
   
    })
    .catch(function (error) {
      console.log(error);
    });
    
  }

  render(){
    return (
      <div>
        <MuiThemeProvider>
          <div>
          <AppBar
             title="Login"
           />
           <NotificationContainer/>
           <TextField
             hintText="Enter your Email"
             floatingLabelText="Email"
             onChange = {(event,newValue) => this.setState({email:newValue})}
             />
           <br/>
             <TextField
               type="password"
               hintText="Enter your Password"
               floatingLabelText="Password"
               onChange = {(event,newValue) => this.setState({password:newValue})}
               />
             <br/>
             <RaisedButton disabled={!this.validateForm()} label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>

             
         </div>
         </MuiThemeProvider>
      </div>
  );
  }
}
  
const style = {
  margin: 15,
 };

export default Login;