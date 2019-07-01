import React from 'react';
// import logo from './logo.svg';
// import './App.css';

class App extends Component {
  state = {
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

  render(){
    const {boards} = this.state;
    const list = boards.map(function(row){
      return row.brdno + row.brdwriter;
    });

    return (
      <div>
        {list}
      </div>
    );
  }
}

export default App;
