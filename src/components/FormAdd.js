import React from 'react';
import { closeForm, addTask, editTask } from '../actions/index';
import { connect } from 'react-redux';
class FormAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      status: 1 // 0 = an ; 1 = kich hoat
    };
  }
  componentWillMount = () => {
    var { taskEdit } = this.props;
    if (taskEdit) {
      this.setState({
        id: taskEdit.id,
        name: taskEdit.name,
        status: taskEdit.status
      })
    }
  }
  componentWillReceiveProps = (nextProps) => {
    this.setState({
      id: nextProps.taskEdit.id,
      name: nextProps.taskEdit.name,
      status: nextProps.taskEdit.status
    })
  }
  handleChange = (event) => {
    const target = event.target;
    var value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    value = name === 'status' ? value = parseInt(value, 10) : value;
    this.setState({
      [name]: value,
    })
  }
  handleSubmit = (event) => {
    var { taskEdit } = this.props;
    event.preventDefault();
    console.log(taskEdit)
    if (taskEdit) {
      this.props.onEdit(taskEdit.id, this.state);
    } else {
      this.props.onSubmit(this.state);
    }
    this.Oncancel();
  }

  Oncancel = () => {
    this.props.onCancel();
  }
  render() {
    let { taskEdit } = this.props;

    return (
      <div className="panel panel-warning">
        <div className="panel-heading">
          <h3 className="panel-title">{taskEdit ? "Cập nhật công việc" : "Thêm công việc"}
            <span
              className="fa fa-times-circle text-right"
              onClick={this.Oncancel}></span>
          </h3>
        </div>
        <div className="panel-body">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Tên :</label>
              <input required
                type="text"
                className="form-control"
                name="name"
                value={this.state.name}
                onChange={this.handleChange} />
            </div>
            <label>Trạng Thái :</label>
            <select
              className="form-control"
              name="status"
              value={this.state.status}
              onChange={this.handleChange}>
              <option value={1}>Kích Hoạt</option>
              <option value={0}>Ẩn</option>
            </select>
            <br />
            <div className="text-center">
              <button
                type="submit"
                className="btn btn-warning">{taskEdit ? "Cập nhật" : "Thêm"}</button>&nbsp;
            <button type="button" className="btn btn-danger" onClick={this.Oncancel}>Hủy Bỏ</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
const mapStateToProp = state => {
  return {
    taskEdit: state.taskEdit
  }
}
const mapDispatchToProp = dispatch => {
  return {
    onCancel: () => {
      dispatch(closeForm());
    },
    onSubmit: (task) => {
      dispatch(addTask(task))
    },
    onEdit: (id, taskEdit) => {
      dispatch(editTask(id, taskEdit))
    }
  }
}
export default connect(mapStateToProp, mapDispatchToProp)(FormAdd);
