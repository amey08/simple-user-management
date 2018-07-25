import React, { Component } from 'react';
import PropTypes from 'prop-types';

class EditPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.onSubmit = this.onSubmit.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);
    this.state = null;
    this.newData = {
        name: '',
        email: '',
        mobile: ''   
    }
    this.state = {
        isDisabled : true,
    }    
  }
  onSubmit(){
    this.props.onSubmitClick(this.newData);
  }
  updateInputValue(evt) {
        switch(evt.target.name){
            case "name":
                this.newData.name = evt.target.value;
            break;
            case "email":
                this.newData.email = evt.target.value;
            break;
            case "mobile":
                this.newData.mobile =  evt.target.value;
            break;
            default:
            break;     
        }
        this.setState({isDisabled : this.checkButtonState()});
    } 
    checkButtonState(){
        return !(this.newData.name !== "" && this.newData.email !== "" && this.newData.mobile !== "");        
    }
  render() {
    return (
      <div className="EditPage">
        <form>
            <label> Name </label><input type="text" placeholder="Name" name="name" onChange={this.updateInputValue}/>
            <label> Email </label><input type="text" placeholder="Email" name="email" onChange={this.updateInputValue}/>
            <label> Mobile </label><input type="text" placeholder="Phone Number" name="mobile" onChange={this.updateInputValue}/>
            
            <button onClick={this.onSubmit} disabled={this.state.isDisabled}> Submit </button>
        </form>
      </div>
    );
  }
}

EditPage.propTypes  = {
    onSubmitClick: PropTypes.func
};
export default EditPage;
