import {  useFrame, useThree } from 'react-three-fiber';
import {  usePlane, useSphere } from '@react-three/cannon';


  const Ball = ({ args=[.2, 32, 32], color="red" , setFrame }) => {
    const { viewport, gl, scene } = useThree()
    const [ref, api] = useSphere(() => ({ mass: 1 }) )

    usePlane(() => (
      {
        rotation: [ -Math.PI/2, 0, 0 ],
        position: [0, -(viewport.height/2 + 20), 0 ],
        onCollide: () => {
          api.position.set((Math.random() - 0.5) * 10, 0, 0)
          api.velocity.set(0,Math.random()*8,0)
          setFrame('never')
          document.getElementsByClassName('score')[0].innerHTML = 0
        }
      }
    ))

    useFrame(() => {
      api.rotation.set( ref.current.rotation.x += .01,  ref.current.rotation.y += .01, 0 )
    })

    return(
      <mesh ref={ref} castShadow >
        <sphereBufferGeometry  args={args}  />
        // <meshPhysicalMaterial  color={color} metalness={.1} roughness={.3} />
        <meshNormalMaterial />
      </mesh>
    )

  }

  export default Ball