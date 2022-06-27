import {  useBox } from '@react-three/cannon';
import { RoundedBox, MeshDistortMaterial } from '@react-three/drei'
import {  useThree } from 'react-three-fiber';



  const Enemy = ({ position=[7, 4, 0], args=[1.5, .3, 0], color='white', rotation= [0,0,0] }) => {

    const { viewport, camera } = useThree()

    const [ref, api] = 
    useBox(() => 
          ({ 
            position: position, 
            args: [1, 0, 0],
            rotation: rotation,
            onCollide: () => {
              // setScore(score+1)
              let score = document.getElementsByClassName('score')[0].innerHTML
              document.getElementsByClassName('score')[0].innerHTML = parseInt(score)+1
              // console.log('score ', score[0].innerHTML );
            }
          }))

    return(
      <RoundedBox args={args} radius={.1} smoothness={4} ref={ref} position={position} castShadow receiveShadow >
         <MeshDistortMaterial distort={.5} speed={3} />
      </RoundedBox>
    )
  }


  const Enemys = () => {
    // take a random variable
    // loop through it
    // while looping make position 3 index array , give condition is smaller then viewport width/2
    // return to enemey function

    const { viewport } = useThree()
    // console.log('voiew ', viewport );
    let obstacleNum
    const checkNum = (obsNum) => {
      if( obsNum <= 5 && obsNum > 2 ) obstacleNum = obsNum
      else{
        checkNum(  parseInt((Math.abs(Math.random()*10)+1).toFixed()) )
      } 
    }
    checkNum(  parseInt((Math.abs(Math.random()*10)+1).toFixed()) )
    let obsArr = []
    for( let i=0; i<obstacleNum; i++ ){
      let posX = parseFloat((Math.abs(Math.random()*10+1)).toFixed(2))
      let posY = parseFloat((Math.random()*10).toFixed(1))
        if( i%2 === 0 ) obsArr.push(
          { pos: [ posX < viewport.width/2 ?
                   posX -1 :
                   viewport.width/2 -1 , 
                  -posY > -viewport.height/2 ? 
                  -posY+1 : 
                    0 , 
                    0 ], 
            rot: [0,0, parseFloat((Math.random()*10).toFixed(1)) ] 
          })
        else obsArr.push( 
          { pos: [-posX > -viewport.width/2 ?
                  -posX :
                  -viewport.width/2+1  , 
                  posY < viewport.height/2 ?
                  posY :
                  viewport.height/2-2, 
                  0 ], 
            rot: [0,0, parseFloat((Math.random()*10).toFixed(1)) ] 
          })
    }

    // console.log('obsArr ', obsArr );

    return(
        obsArr.map((x,i ) => {
          return(
            <Enemy key={i}  position={x.pos} rotation={x.rot}  />
          )
        })
    )
    
  }

  export default Enemys