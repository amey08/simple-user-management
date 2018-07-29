import React, { Component } from 'react';
import PropTypes from 'prop-types';

class EditPage extends Component {
    constructor(props, context) {
        super(props, context);
        this.onSubmit = this.onSubmit.bind(this);
        this.updateInputValue = this.updateInputValue.bind(this);
        this.updateDataSet = this.updateDataSet.bind(this);
        this.state = null;
        this.state = {
            isDisabled: true,
            newData: {
                name: '',
                email: '',
                mobile: ''
            },
            prevData: {}
        }
    }
    componentWillMount() {
        this.updateDataSet(Object.assign({}, this.props.editData));
    }
    componentWillReceiveProps(nextProp) {
        this.updateDataSet(Object.assign({}, nextProp.editData));
    }
    updateDataSet(_dataObj) {
        this.setState({ isDisabled: this.checkButtonState(_dataObj), newData: Object.assign({}, _dataObj) });
    }
    onSubmit() {
        if (this.checkForupdate(this.props.editData, this.state.newData)) {
            this.props.onSubmitClick(this.state.newData, this.props.fromEditButton);
        } else {
            this.props.onSubmitClick();
        }
    }
    checkForupdate(prevData, newData) {
        if (prevData) {
            if (prevData.name !== newData.name)
                return true;
            else if (prevData.email !== newData.email)
                return true;
            else if (prevData.mobile !== newData.mobile)
                return true
            else
                return false;
        } else {
            return true;
        }
    }
    updateInputValue(evt) {
        let _objData = this.state.newData;
        switch (evt.target.name) {
            case "name":
                _objData.name = evt.target.value;
                break;
            case "email":
                _objData.email = evt.target.value;
                break;
            case "mobile":
                _objData.mobile = evt.target.value;
                break;
            default:
                break;
        }
        this.updateDataSet(_objData);
    }
    checkButtonState(storageData) {
        return !(storageData.name !== "" && storageData.email !== "" && storageData.mobile !== "");
    }
    render() {
        return (
            <div className="EditPage">
                <form>
                    <label> Name </label><input type="text" placeholder="Name" name="name" value={this.state.newData.name} onChange={this.updateInputValue} />
                    <label> Email </label><input type="text" placeholder="Email" name="email" value={this.state.newData.email} onChange={this.updateInputValue} />
                    <label> Mobile </label><input type="text" placeholder="Phone Number" name="mobile" value={this.state.newData.mobile} onChange={this.updateInputValue} />

                    <button onClick={this.onSubmit} disabled={this.state.isDisabled}> Submit </button>
                </form>
            </div>
        );
    }
}
EditPage.defaultProps = {
    editData: { name: '', email: '', mobile: '' }
};
EditPage.propTypes = {
    onSubmitClick: PropTypes.func,
    editData: PropTypes.object,
    fromEditButton: PropTypes.bool
};
export default EditPage;
