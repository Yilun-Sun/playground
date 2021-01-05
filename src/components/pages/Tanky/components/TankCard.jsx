import React from 'react';
import TankCardStyle from './TankCardStyle';

const TankCard = ({ image, data }) => {
  const style = TankCardStyle.useStyles();

  return (
    <div className={style.main}>
      <h1 className={style.header}>{data.name}</h1>
      {image}
    </div>
  );
};

export default TankCard;
