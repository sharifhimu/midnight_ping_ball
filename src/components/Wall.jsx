
import {  useThree } from 'react-three-fiber';
import {  useBox } from '@react-three/cannon';

const Wall = () => {

    const { viewport } = useThree()
    const [ref1] = useBox(() => ( { args: [.5, viewport.height, .5 ], position: [ viewport.width/2, 0, 0] } ))
    const [ref2] = useBox(() => ( { args: [.5, viewport.height, 5. ], position: [ -viewport.width/2, 0, 0] } ))
    const [ref3] = useBox(() => ( { args: [ viewport.width, 1, 1 ], position: [ 0, viewport.height/2, 0] } ))

    return(
      <>
        <mesh ref={ref1}  position={[ viewport.width/2, 0, 0]}  receiveShadow >
          <boxGeometry args={[.5, viewport.height+50, .3 ]}  />
          <meshPhysicalMaterial  color="white" metalness={.1} roughness={.2} />
        </mesh>
        <mesh ref={ref2}  position={[ -viewport.width/2, 0, 0]}  receiveShadow >
          <boxGeometry args={[.5, viewport.height+50, .3 ]}  />
          <meshPhysicalMaterial  color="white" metalness={.1} roughness={.2} />
        </mesh>
        <mesh ref={ref3}  position={[ 0, viewport.height/2, 0]}  receiveShadow >
          <boxGeometry args={[ viewport.width, .5, .5 ]}  />
          <meshPhysicalMaterial  color="white" metalness={.1} roughness={.2} />
        </mesh>
      </>
    )
}

export default Wall 