import React, { Component } from 'react';
import ReactDataGrid from './../../../node_modules/react-data-grid';
import EditPage from './EditPage';

class HomePage extends Component {
  constructor(props, context) {
    super(props, context);

    this.rowFormatter = this.rowFormatter.bind(this);
    this.tableData = [{
      'name': "Abc",
      'email': 'am@g.co',
      'mobile': "0123456789",
    }, {
      'name': "Def",
      'email': 'df@e.co',
      'mobile': "2132134455",
    }, {
      'name': "Ghi",
      'email': 'gh@h.co',
      'mobile': "8899988900",
    }, {
      'name': "Jkl",
      'email': 'am@i.co',
      'mobile': "7768877688",
    }, {
      'name': "Mno",
      'email': 'mo@k.co',
      'mobile': "5169189422",
    }, {
      'name': "Pqrs",
      'email': 'psq@r.co',
      'mobile': "8897781445",
    }];
    this._columns = [
      {
        key: 'name',
        name: 'Name',
        width: 80
      },
      {
        key: 'email',
        name: 'Email'
      },
      {
        key: 'mobile',
        name: 'Mobile'
      },
      {
        key: 'age',
        name: 'Age'
      },
      {
        key: 'dateOfBirth',
        name: 'Date of Birth',
      },
      {
        key: 'location',
        name: 'Location'
      },
      {
        key: 'action',
        name: 'Action',
        formatter: this.rowFormatter,
        getRowMetaData: (row) => row
      }];

    this.createRows();
    this.state = null;
    this.handleClick = this.handleClick.bind(this);
    this.addNewUser = this.addNewUser.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.setLocalStorageData = this.setLocalStorageData.bind(this);
    this.updateLocalStorageData = this.updateLocalStorageData.bind(this);
    this.editData = {};
    this.state = {
      openEdit: false,
      listScreen: true
    };
  }

  setLocalStorageData(_obj) {
    localStorage.setItem("tableData", JSON.stringify(_obj));
  }
  updateLocalStorageData(dataKey, _obj, _boolFlag) {
    let tableData = JSON.parse(localStorage.getItem(dataKey));
    if (!_obj) {
      return tableData;
    }
    else {
      if (_boolFlag) {
        let temp = tableData.map((data) => {
          if (data.name === _obj.name || data.email === _obj.email || data.mobile === _obj.mobile) {
            return (Object.assign({}, data, _obj));
          }
          return data;
        });
        this.createRows(temp);
      } else {
        tableData.push(_obj);
        this.createRows(tableData);
      }

    }
  }

  createRows(_data) {
    let rows = this.tableData;
    if (_data) {
      rows = _data;
    }
    let updatedRow = [];
    if (rows) {
      for (let i = 0; i < rows.length; i++) {
        updatedRow.push({
          name: rows[i].name,
          email: rows[i].email,
          mobile: rows[i].mobile,
          age: ['18', '19', '20', '21', '22', '23', '24'][Math.floor((Math.random() * 6) + 1)],
          dateOfBirth: "new Date(2015, 3, 1)",
          location: ['Mumbai', 'Pune', 'Banglore', 'Delhi'][Math.floor((Math.random() * 3) + 1)],
          action: this.rowFormatter(this)
        });
      }
    }
    this.setLocalStorageData(updatedRow);
    rows = this.updateLocalStorageData("tableData");
    this._rows = updatedRow;
  };

  rowFormatter = (a) => {
    return <button onClick={(e) => this.handleClick(a, e)} >Edit</button>
  }

  handleClick = (rowData) => {
    this.editData = rowData.dependentValues;
    this.setState({
      openEdit: true,
      listScreen: false,
      rowEdit: true
    });
  }
  rowGetter = (i) => {
    return this._rows[i];
  };

  addNewUser() {
    this.setState({
      openEdit: true,
      listScreen: false,
      rowEdit: false
    });
  }
  onSubmit(_obj, rowUpdate) {
    if (_obj)
      this.updateLocalStorageData("tableData", Object.assign({}, _obj), rowUpdate);

    this.setState({
      openEdit: false,
      listScreen: true,
      rowEdit: false
    });
  }

  render() {
    let pageComponent = this.state.openEdit ? (<EditPage onSubmitClick={this.onSubmit} fromEditButton={this.state.rowEdit} editData={this.state.rowEdit ? this.editData : undefined} />) : (
      <ReactDataGrid
        columns={this._columns}
        rowGetter={this.rowGetter}
        rowsCount={this._rows.length}
        minHeight={500}
      />
    );
    return (
      <div>
        <p className="App-intro">
          {
            this.state.listScreen &&
            <button onClick={(e) => this.addNewUser()} >Add New User </button>
          }
        </p>
        {pageComponent}
      </div>
    );
  }
}

export default HomePage;