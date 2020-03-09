import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  on: {
    color: 'black',
    backgroundColor: '#ffc324',
    padding: '0.75em',
    width: '6em',
    float: 'right'
  },
  off: {
    color: 'red',
    backgroundColor: 'black',
    padding: '0.75em',
    width: '6em',
    float: 'right'
  },
  showSVG:{
    position: 'absolute', 
    right: 60,
    display: 'block',
  },
  noSVG:{
    // position: 'absolute', 
    // right: 60,
    display: 'none',
  }

});

const App = () => {
  const classes = useStyles();
  const [first, setFirst] = useState();
  const [pair, setPair] = useState([]);
  let dataInit = [
    {
      name: "one",
      activated: false
    },
    {
      name: "two",
      activated: false
    },
    {
      name: "three",
      activated: false
    },
    {
      name: "four",
      activated: false
    },
    {
      name: "five",
      activated: false
    },
    {
      name: "six",
      activated: false
    },
  ];
  let svgList = document.querySelectorAll("svg[id^=svg]")
  
  const [data, setData] = useState(dataInit)
  const handleDragStart = (e) => {
    e.persist()
    // if (pair.length >= 2){
    //   setPair([])
    // }
    // if (pair.indexOf(e.target.id) === -1){
    //   console.log('setting val')
    //   setPair([...pair, e.target.id])
    // }
    // console.log(e.target.id)

    // setPair([...pair, e.target.id])
    // if (data[e.target.id].activated === false){
    setFirst(e.target.id)
    // }
    // for( let i = 0; i < pair.length; i++){
      // if (pair[i].indexOf(e.target.id) === -1){
      //   console.log('setting val')
      //   setPair([[...pair, e.target.id]])
      // }
      // setPair([[...pair, e.target.id]])
    // }
  }

  const handleDrop = (e) => {
    // if (pair.indexOf(e.target.id) === -1){
    //   console.log('setting val')
    //   setPair([...pair, e.target.id])
    //   let temp = [...data];
    //   temp[pair[0]].activated = true
    //   temp[e.target.id].activated = true
    //   setData(temp)
    // }
    // console.log(first)
    // console.log(e.target.id)
    if (e.target.id !== first){
      let inputPair = [first, e.target.id].sort()
      setPair([...pair, inputPair])
      // console.log(data[inputPair[0]].activated)
      // console.log(data[inputPair[1]].activated)
      let temp = [...data]
      temp[inputPair[0]].activated = true;
      temp[inputPair[1]].activated = true;
      // console.log(temp)
      setData(temp)
    }
    
    // for (let i= 0; i < pair.length; i++){
    //   if (pair[i].indexOf(e.target.id) === -1){
    //     console.log('setting val')
    //     setPair([...pair, e.target.id])
    //     let temp = [...data];
    //     temp[pair[0]].activated = true
    //     temp[e.target.id].activated = true
    //     setData(temp)
    //   }
    // }
  }
  const handleClick = (e) => {
      let tempData = [...data]
      let tempPair = [...pair]
      let remove= [];
      for(let i = 0; i < tempPair.length; i++){
        if(tempPair[i].indexOf(e.target.id) !== -1){
          console.log(`removing index ${i} from arr which contains ${e.target.id}`)
          remove = tempPair.splice(i, 1)
        }
      }
      setPair(tempPair)
      console.log('indexs to remove from pair and turn false: ',remove)
      remove[0].forEach(item => tempData[item].activated = false)
      remove[0].forEach(item => svgList[item].classList = 'makeStyles-noSVG-4')
      setData(tempData)
  }

  useEffect(() => {
    console.log('pair',pair)
    console.log('svglist',svgList)
    
    for (let i = 0; i < svgList.length; i++){
      for (let j = 0; j < pair.length; j++){
        // console.log(svgList[j].id.substring(svgList[j].id.length - 1))
        if(pair[j][0] === svgList[i].id.substring(svgList[i].id.length - 1)){
          console.log('match, turning display on')
          // console.log(svgList[j].classList);
          svgList[i].classList = 'makeStyles-showSVG-3'
        // } else {
        //   console.log('turning display off')
        //   // console.log(svgList[j].classList);
        //   svgList[i].classList = 'makeStyles-noSVG-4'
        }
      }
    }
    //--------------------------
    // if (pair.length !== 0){
    //   for (let j = 0; j < svgList.length; j++){
    //     // console.log(svgList[j].id.substring(svgList[j].id.length - 1))
    //     if(pair[j][0] === svgList[j].id.substring(svgList[j].id.length - 1)){
    //       console.log('match, turning display on')
    //       // console.log(svgList[j].classList);
    //       svgList[j].classList = 'makeStyles-showSVG-3'
    //     } else {
    //       console.log('turning display off')
    //       // console.log(svgList[j].classList);
    //       svgList[j].classList = 'makeStyles-noSVG-4'
    //     }
    //   }
    // }
    //--------------------------
    // for (let i = 0; i < pair.length; i++){
    //   for (let j = 0; j < svgList.length; j++){
    //     // console.log(svgList[j].id.substring(svgList[j].id.length - 1))
    //     if(pair[i][0] === svgList[j].id.substring(svgList[j].id.length - 1)){
    //       console.log('match, turning display on')
    //       // console.log(svgList[j].classList);
    //       svgList[j].classList = 'makeStyles-showSVG-3'
    //     } else {
    //       console.log('turning display off')
    //       // console.log(svgList[j].classList);
    //       svgList[j].classList = 'makeStyles-noSVG-4'
    //     }
    //   }
    // }
  }, [pair, svgList])
  return (
    <div>
      {data.map((_itm, index) => (
        <div style={{backgroundColor: '#d3d3d3', border: '1px solid black', padding: '1.5em'}}>
        <div 
          key={index} 
          style={{display: 'inline'}}
          >
          {_itm.name}
        </div>
        <div 
          name='drag'
          draggable={!_itm.activated}
          // {_itm.activated ? draggable : null}
          // onDrag= {handleDrag}
          onDragStart= {handleDragStart}
          onDragOver= {(e) => e.preventDefault()}
          onDrop= {handleDrop}
          onClick={_itm.activated ? handleClick : null}
          id={index.toString()} 
          className={_itm.activated ? classes.on : classes.off}
          key={index+'bool'}>
          {_itm.activated.toString()}
        </div>
        {/* key={index+'svg'} */}
        {/* className={classes.showSVG} */}
        <svg className={classes.noSVG} id={'svg'+index} width="30" height="70"><line style={{strokeWidth:30}} x1="1" y1="1" x2="1" y2="70" stroke="blue"/></svg>
        </div>
      ))}
      <div style={{backgroundColor: 'red', fontSize:'2em'}}>{pair}</div>
    </div>
  );
};


export default App;
