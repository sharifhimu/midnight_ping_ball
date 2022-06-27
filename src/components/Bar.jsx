import {  useThree, useFrame } from 'react-three-fiber';
import { useBox  } from '@react-three/cannon';


const Bar = ({ position=[0, -20, 0], args=[2, .5, 1], color='white' }) => {

    const { viewport } = useThree()
    const [ref, api] = 
    useBox(() => 
          ({ 
            position: position, 
            args: [2.2, .8, 2.2] ,

          }))


    useFrame((state, delta) => {
      let barPos = state.mouse.x * state.viewport.width/2; 
      if( Math.abs(barPos) >  viewport.width/2 - 1.7 ){
        return ;
      }
      else{
        api.position.set( state.mouse.x * state.viewport.width/2, -state.viewport.height/2+1, 0 )
        api.rotation.set( 0, 0, state.mouse.x * Math.PI / 5 )  
      }
    })

    // window.addEventListener('keydown', e => {
    //   // console.log('key press ', e.code );
      
    //     if( e.code == 'ArrowRight' ){
    //       // console.log('api ', api.position );
    //       if( ref.current.position.x <= viewport.width/2 - 1.7 ){
    //         api.position.set( ref.current.position.x += 1, -viewport.height/2, 0 )
    //         api.rotation.set( 0,0, ref.current.position.x * Math.PI / 70 )  
    //       }
    //     }
    //     else if( e.code == 'ArrowLeft' ){
    //       if( ref.current.position.x >=  -(viewport.width/2 - 1.7) ){
    //         api.position.set( ref.current.position.x -= 1, -viewport.height/2, 0 )
    //         api.rotation.set( 0,0, ref.current.position.x * Math.PI / 70 )  
    //       }
    //     }
    // })

    return(
      <mesh position={position} ref={ref} receiveShadow >
        <boxGeometry args={args} />
        {/* <meshPhysicalMaterial  color={color} metalness={.1} roughness={.3}  /> */}

        <meshNormalMaterial 
        transparent
        transmission={.7}
        clearcoat={1}
        />
      </mesh>
    )
  }

  export default Bar