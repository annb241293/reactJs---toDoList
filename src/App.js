import React from 'react';
import './App.css';
import FormAdd from './components/FormAdd';
import Control from './components/Control';
import Table from './components/Table';
import { toggleForm } from './actions/index';
import { connect } from 'react-redux';
class App extends React.Component {
  componentWillMount() {
    if (localStorage.getItem('task')) {
      var task = JSON.parse(localStorage.getItem('task'));
      this.setState({
        task: task
      })
    }
  }
  generateData = () => {
    var task = [
      {
        id: this.generateID(),
        name: 'NodeJS',
        status: 1
      },
      {
        id: this.generateID(),
        name: 'ReactJS',
        status: 0
      },
      {
        id: this.generateID(),
        name: 'PHP',
        status: 1
      }
    ];
    this.setState({
      task: task
    })
    localStorage.setItem('task', JSON.stringify(task));
  }

  s4 = () => {
    return Math.floor(Math.random() * 10).toString(16);
  }
  generateID = () => {
    return this.s4() + this.s4() + this.s4() + this.s4() + this.s4() + this.s4() + this.s4() + this.s4() + this.s4() + this.s4();
  }
  displayFormAdd = () => {
    this.props.onToggleForm();
  }

  // onSubmit = (data) => {
  //   data.status = +data.status;
  //   var { task } = this.state;
  //   if (this.state.isEdit) {
  //     task = task.map((task, index) => {
  //       if (task.id === data.id) {
  //         task = data;
  //       }
  //       return task;
  //     })
  //   } else {
  //     data.id = this.generateID();
  //     task.push(data);
  //   }
  //   this.setState({
  //     task
  //   })
  //   localStorage.setItem('task', JSON.stringify(task));
  // }

  handleDelete = data => {
    var { task } = this.state;
    task = task.filter((task, index) => {
      return task.id !== data
    })
    localStorage.setItem('task', JSON.stringify(task));
    this.setState((preState, props) => ({
      task: task
    }))
  }
  // handleUpdate = data => {
  //   var task = this.state.task;
  //   task = task.filter((task, index) => {
  //     return task.id === data
  //   })
  //   this.setState((preState, props) => ({
  //     isDisplayFormAdd: true,
  //     taskEdit: task[0],
  //     isEdit: true
  //   }))
  // }
  render() {
    var { isDisplayFormAdd } = this.props;
    var elmFormAdd = isDisplayFormAdd ? <FormAdd /> : '';
    return (
      <div className="container">
        <div className="text-center">
          <h1>Quản Lý Công Việc</h1>
          <hr />
        </div>
        <div className="row">
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            {elmFormAdd}
          </div>
          <div className={isDisplayFormAdd ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.displayFormAdd}>
              <span className="fa fa-plus mr-5" />Thêm Công Việc
          </button>&nbsp;
          <button
              type="button"
              className="btn btn-primary"
              onClick={this.generateData} >
              generate ID
          </button>
            <Control />
            <div className="row mt-15">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <Table handleDelete={this.handleDelete} handleUpdate={this.handleUpdate} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isDisplayFormAdd: state.isDisplayFormAdd
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onToggleForm: () => {
      dispatch(toggleForm());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
