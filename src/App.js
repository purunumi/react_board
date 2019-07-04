import React, {Component} from 'react';
// import logo from './logo.svg';
// import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.child = React.createRef();
  }

  state = {
    maxNo: 3,
    boards: [
      {
        brdno: 1,
        brdwriter: 'Bang Daejong',
        brdtitle: 'If you intend to live then you die',
        brddate: new Date()
      },
      {
        brdno: 2,
        brdwriter: 'So Sino',
        brdtitle: 'Founder for two countries',
        brddate: new Date()
      },
    ]
  }

  handleSaveData = (data) => {
    let boards = this.state.boards;
    if(!(data.brdno)){
      this.setState({
        maxNo: this.state.maxNo + 1,
        boards: this.state.boards.concat({
          brdno: this.state.maxNo,
          brddate: new Date(),
          ...data
        })
      })
    }else{
      this.setState({
        boards: boards.map(row => data.brdno === row.brdno ? {...data} : row)
      })
    }
  }

  handleRemove = (brdno) => {
    this.setState({
      boards: this.state.boards.filter(row => row.brdno !== brdno)
    })
  }

  handleSelectRow = (row) => {
    this.child.current.handleSelectRow(row);
  }

  render(){
    const {boards} = this.state;
    // const list = boards.map(function(row){
    //   return row.brdno + row.brdwriter;
    // });

    return (
      <div>
        <BoardForm onSaveData={this.handleSaveData} ref={this.child} />
        <table border="1">
          <tbody>
            <tr align="center">
              <td width="50">No.</td>
              <td width="300">Title</td>
              <td width="100">Name</td>
              <td wdith="100">Date</td>
              <td wdith="50">Delete</td>
            </tr>
            {
              boards.map(row => (
                <BoardItem key={row.brdno} row={row} onRemove={this.handleRemove} onSelectRow={this.handleSelectRow} />
              ))
            }
          </tbody>
        </table>
      </div>
    );
  }
}

class BoardForm extends Component{
  state = {
    brdwriter:'',
    brdtitle: ''
  }

  handleChange = (e) => {
    // console.log(e);
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSaveData(this.state);
    this.setState({
      brdno:'',
      brdwriter:'',
      bordtitle:''
    });
  }
  handleSelectRow = (row) => {
    // row.preventDefault();
    this.setState(row);
  }

  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <input placeholder="title" name="brdtitle" value={this.state.brdtitle} onChange={this.handleChange} />
        <input placeholder="name" name="brdwriter" value={this.state.brdwriter} onChange={this.handleChange} />
        <button type="submit">save</button>
      </form>
    )
  }
}

class BoardItem extends React.Component{
  handleRemove = () => {
    const {row, onRemove} = this.props;
    onRemove(row.brdno);
  }
  handleSelectRow = () => {
    const {row, onSelectRow} = this.props;
    onSelectRow(row)
  }
  render(){
    return(
      <tr>
        <td>{this.props.row.brdno}</td>
        <td>
          <span onClick={this.handleSelectRow}>
            {this.props.row.brdtitle}
          </span>          
        </td>
        <td>{this.props.row.brdwriter}</td>
        <td>{this.props.row.brddate.toLocaleDateString('ko-Kr')}</td>
        <td><button onClick={this.handleRemove}>x</button></td>
      </tr>
    )
  }
}

export default App;
