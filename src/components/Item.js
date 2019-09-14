import React from 'react';
import { getEditTask, openForm, delTask } from '../actions/index';
import { connect } from 'react-redux';
class Item extends React.Component {
  delete = (id) => {
    this.props.handleDelete(id);
  }
  update = data => {
    this.props.handleUpdate(data);
  }
  render() {
    var { task } = this.props;
    return (
      <tr>
        <td>{task.id}</td>
        <td>{task.name}</td>
        <td className="text-center">
          <span className={task.status === 1 ? "label label-success" : "label label-danger"}>
            {task.status === 1 ? "Kích hoạt" : "Ẩn"}
          </span>
        </td>
        <td className="text-center">
          <button type="button" className="btn btn-warning" onClick={() => this.update(task)} >
            <span className="fa fa-pencil mr-5" />Sửa
          </button>
          &nbsp;
          <button type="button" className="btn btn-danger" onClick={() => this.delete(task.id)}>
            <span className="fa fa-trash mr-5" />Xóa
          </button>
        </td>
      </tr>
    )
  }
}
const mapDispatchToProps = dispatch => {
  return {
    handleUpdate: (task) => {
      dispatch(openForm());
      dispatch(getEditTask(task));
    },
    handleDelete: (id) => {
      dispatch(delTask(id))
    }
  }
}

export default connect(null, mapDispatchToProps)(Item);
