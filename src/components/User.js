import React from 'react';
import axios from 'axios';

class User extends React.Component {

    state = {
        firstName: "",
        lastName: "",
        dateOfBirth: 0,
        gender: "Male",
        weight: 0,
        height: 0,
        indexRange: undefined,
        indexResult: ""
    }

    onChange = (event) => {
       
        const {name, value} = event.target
        this.setState({
            [name]: value
        }, () => {
            console.log(this.state)
            console.log(typeof(this.state.weight))
        })

    }

    onSave = async (event) => {
        console.log("Calculated");
        event.preventDefault();
        const user = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            dateOfBirth: this.state.dateOfBirth,
            gender: this.state.gender,
            weight: this.state.weight,
            height: this.state.height
        };
    
        try {
            const response = await axios.post('http://localhost:8080/user/save', user);
            this.setState({
                indexRange: response.data.indexRange,
                indexResult: response.data.indexResult
            })
        } catch (error) {
            console.log(error);
        }
    }
    
    render() {
        return (
            <form>
            <div className="form-group">
              <label htmlFor="exampleFormControlInput1">First Name:</label>
              <input onChange={this.onChange} type="text" className="form-control" name="firstName"/>
              <br></br>
              <label htmlFor="exampleFormControlInput1">Last Name:</label>
              <input onChange={this.onChange} type="text" className="form-control" name="lastName"/>
              <br></br>
              <label htmlFor="exampleFormControlInput1">Date Of Birth:</label>
              <input onChange={this.onChange} type="text" className="form-control" name="dateOfBirth" placeholder = "YYYY-MM-DD"/>
            </div>
            <div className="form-group">
              <label htmlFor="exampleFormControlSelect1">Gender:</label>
              <select onChange={this.onChange} className="form-control" name="gender">
                <option>Male</option>
                <option>Female</option>
              </select>
              <br></br>
              <label htmlFor="exampleFormControlInput1">Weight (kg):</label>
              <input onChange={this.onChange} type="number" className="form-control" name="weight"/>
              <br></br>
              <label htmlFor="exampleFormControlInput1">Height (m):</label>
              <input onChange={this.onChange} type="number" className="form-control" name="height"/>
              <br></br>
              <label htmlFor="exampleFormControlInput1">Index Range:</label>
              <text className="form-control" name="indexRange" readOnly >{this.state.indexRange}</text>
              <br></br>
              <label htmlFor="exampleFormControlInput1">Index Result:</label>
              <text className="form-control" name="indexResult" readOnly>{this.state.indexResult} </text> 
              <br></br>
              <button onClick={this.onSave} type="button" className="btn btn-success">Calculate</button>
            </div>
          </form>
        )
    }
}

export default User;