import React from 'react'
import '../App.css';
import { Canvas } from 'react-three-fiber';
import {  useState } from 'react';
import { Physics } from '@react-three/cannon';
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { Cloud } from '@react-three/drei'

import Wall from './Wall';
import Ball from './Ball'
import Bar from './Bar'
import Enemys from './Enemys';

function GameScene() {
    const [ frame, setFrame ] = useState('never')

    window.addEventListener('resize', e => {
        window.location.reload()
    })

    return (
        <div 
        style={{ width: '100vw', height: '100vh', position: 'relative' }} 
        className="canvas" 
        >

        {
            frame == 'never' ?
            <div style={{ position: 'absolute', top: '20%', left: '45%', zIndex: '10', color: 'white', fontSize: '50px' }} >
            <h1 onClick={() => setFrame('always')}  className='play-btn' > Play </h1> 
            </div>
            : 
            null
        }

        <div style={{ position: 'absolute', top: '0', left: '0', color: 'white', fontSize: '30px' }} >
            <h3  style={{ textShadow: '1px 1px 15px white', margin: '10px 20px'  }} > score : <span className='score' > 0 </span> </h3>
        </div>

        <Canvas style={{  width: '100%' }}
        camera={{ position: [0, 0, 20], fov: 50 }}
        frameloop={frame}
        shadows={true}
        >
        {/* lights */}
        <ambientLight />
        <directionalLight intensity={.2} position={[-2, 5, 3]} />
        <pointLight color='white' intensity={.5} position={[5,5,2]} />

        <Physics 
        gravity={[0, -20, 0]} 
        defaultContactMaterial={{ restitution: 1.1 }}
        >
            <Ball setFrame={setFrame} />
            <Bar />
            <Wall />
            <Enemys />
        </Physics>

        <EffectComposer>
            <Bloom luminanceThreshold={.6} luminanceSmoothing={0.9} height={300} blurPass />
        </EffectComposer>
        <Cloud 
        position={[0, 0, 0]}
        args={[5, 3]}
        opacity={0.02}
        speed={0.9} // Rotation speed
        width={1} // Width of the full cloud
        depth={5} // Z-dir depth
        segments={10} // Number of particles 
        />
        </Canvas>
        </div>
    )
}

export default GameScene