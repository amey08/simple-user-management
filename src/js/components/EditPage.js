import React, { Component } from 'react';
import PropTypes from 'prop-types';

class EditPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.onSubmit = this.onSubmit.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);
    this.updateDataSet = this.updateDataSet.bind(this);
    this.state = null;
    // this.newData = {
    //     name: '',
    //     email: '',
    //     mobile: ''   
    // }
    this.state = {
        isDisabled : true,
        newData: {
            name: '',
            email: '',
            mobile: ''   
        }
    }    
  }
  componentWillMount(){
      if(this.props.editData)
        this.updateDataSet(this.props.editData);
  }
  componentWillReceiveProps(nextProp){
    if(nextProp && nextProp.editData)
        this.updateDataSet(nextProp.editData);
  }
  updateDataSet(_dataObj){
    this.setState({isDisabled : this.checkButtonState(_dataObj), newData: _dataObj});
  }
  onSubmit(){
      if(this.checkForupdate(this.props.editData, this.state.newData)){
        console.log("inside onSubmit");
        this.props.onSubmitClick(this.state.newData);
      }
  }
  checkForupdate(prevData, newData){
    if(prevData){
        if(prevData.name === newData.name || prevData.email === newData.email || prevData.mobile === newData.mobile)
            return false;
        else
            return true;
    }else{
        return true;
    }
  }
  updateInputValue(evt) {
      let _objData = {
        name: '',
        email: '',
        mobile: ''
      };
        switch(evt.target.name){
            case "name":
            _objData.name = evt.target.value;
            break;
            case "email":
            _objData.email = evt.target.value;
            break;
            case "mobile":
            _objData.mobile =  evt.target.value;
            break;
            default:
            break;     
        }
        this.updateDataSet(_objData);
    } 
    checkButtonState(storageData){
        return !(storageData.name !== "" && storageData.email !== "" && storageData.mobile !== "");        
    }
  render() {
    return (
      <div className="EditPage">
        <form>
            <label> Name </label><input type="text" placeholder="Name" name="name" value={this.state.newData.name} onChange={this.updateInputValue}/>
            <label> Email </label><input type="text" placeholder="Email" name="email" value={this.state.newData.email} onChange={this.updateInputValue}/>
            <label> Mobile </label><input type="text" placeholder="Phone Number" name="mobile" value={this.state.newData.mobile} onChange={this.updateInputValue}/>
            
            <button onClick={this.onSubmit} disabled={this.state.isDisabled}> Submit </button>
        </form>
      </div>
    );
  }
}

EditPage.propTypes  = {
    onSubmitClick: PropTypes.func,
    editData: PropTypes.object
};
export default EditPage;
