import React, { Component } from 'react';
import StyledComponent from '../../core/StyledComponent';
import paper from 'paper';
import TankyStyle from './TankyStyle';
import TankCard from './components/TankCard';

let axios = require('axios');
const loading = <div>I'm Loading</div>;
let content = [];

export default class Tanky extends Component {
  constructor() {
    super();
    this.state = { tankImageUrls: [], tankImages: [] };
    // this.content = '';
    // this.tankImages = [];
  }

  componentDidMount() {}

  requestData = () => {
    const baseUrl = 'https://us-central1-dodo-list-yilun.cloudfunctions.net/api/signup';
    const newUserData = {
      firstName: 'this.state.firstName',
      lastName: 'this.state.lastName',
      phoneNumber: '123321123',
      country: 'CA',
      username: 'this.state.username',
      email: '123321123321@gmail.com',
      password: '123123123',
      confirmPassword: '123123123',
    };
    axios.post(baseUrl, newUserData).then(
      (response) => {
        if (response.status === 200) {
          console.log(response);
        }
      },
      (error) => (this.content = error)
    );

    const url =
      'https://api.worldoftanks.com/wot/encyclopedia/vehicles/?application_id=9ac9f425f534dca03b4ab84d40bb7310&tier=10&type=mediumTank';
    axios.get(url).then(
      (response) => {
        if (response.status === 200) {
          const tankDatas = Object.values(response.data.data);
          // console.log(tankDatas);
          tankDatas.forEach((tankData) => {
            console.log(tankData.tank_id);

            const getTankByIdUrl = `https://api.worldoftanks.com/wot/encyclopedia/vehicles/?application_id=9ac9f425f534dca03b4ab84d40bb7310&tank_id=${tankData.tank_id}`;
            axios.get(getTankByIdUrl).then(
              (response) => {
                if (response.status === 200) {
                  const tankIconUrl = response.data.data[tankData.tank_id].images.big_icon;
                  console.log(response.data.data[tankData.tank_id]);
                  this.setState({
                    tankImages: this.state.tankImages.concat([
                      <TankCard
                        image={<img src={tankIconUrl} draggable="false" alt={tankData.tank_id} />}
                        data={tankData}
                        key={tankData.tank_id}
                      />,
                    ]),
                  });
                }
              },
              (error) => (this.content = error)
            );
            // .then(setTimeout(this.renderImages, 2000));
          });
        }
      },
      (error) => (this.content = error)
    );
  };

  renderImages = () => {
    // console.log(this.state);
    this.setState({
      tankImages: this.state.tankImageUrls.map((url) => (
        <TankCard image={<img src={url} draggable="false" />} data={''} />
      )),
    });
    // this.setState({ tankImages: this.state.tankImageUrls.map((url) => <img src={url} draggable="false"></img>) });
  };

  render() {
    return (
      <StyledComponent styleMap={TankyStyle}>
        {(useStyles) => {
          const classes = useStyles(this.props);
          return (
            <div className={classes.main}>
              <h1 className={classes.header}>Tanky</h1>
              <span id="account-id"></span>
              <button onClick={this.requestData}>Request Data</button>
              <button onClick={this.renderImages}>state</button>
              <div className={classes.tank_card_container}>{this.state.tankImages}</div>
              <TankCard image={<img src={''} draggable="false" />} data={''} />
            </div>
          );
        }}
      </StyledComponent>
    );
  }
}
