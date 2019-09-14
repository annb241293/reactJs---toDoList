import React from 'react';
import Item from './Item';
import { connect } from 'react-redux';
class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterName: '',
      filterStatus: -1 //-1 = tat ca, 0 = an, 1 = kich hoat
    }
  }
  handleDelete = (data) => {
    this.props.handleDelete(data);
  }
  handleUpdate = data => {
    this.props.handleUpdate(data);
  }
  handleChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    })
  }
  render() {
    var { task } = this.props;
    if (this.state.filterName) {
      task = task.filter(task => {
        return task.name.toLowerCase().includes(this.state.filterName)
      });
    }
    if (+this.state.filterStatus !== -1) {
      task = task.filter(task => {
        return task.status === +this.state.filterStatus
      });
    }
    var taskElm = task.map((elm, index) => {
      return <Item
        key={index}
        task={elm}
        handleDelete={this.handleDelete}
        handleUpdate={this.handleUpdate} />
    })
    return (
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th className="text-center">STT</th>
            <th className="text-center">Tên</th>
            <th className="text-center">Trạng Thái</th>
            <th className="text-center">Hành Động</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td>
              <input
                type="text"
                className="form-control"
                name="filterName"
                value={this.state.filterName}
                onChange={this.handleChange} />
            </td>
            <td>
              <select
                className="form-control"
                value={this.state.filterStatus}
                name="filterStatus"
                onChange={this.handleChange}>
                <option value={-1}>Tất Cả</option>
                <option value={0}>Ẩn</option>
                <option value={1}>Kích Hoạt</option>
              </select>
            </td>
            <td />
          </tr>
          {taskElm}
        </tbody>
      </table>
    )
  }
}

const mapStateToProps = state => {
  return{
    task : state.task
  }
}

export default connect(mapStateToProps, null)(Table);
