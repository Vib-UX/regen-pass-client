import { useFrame, useLoader } from '@react-three/fiber';
import {
    InstantTracker,
    ZapparCamera,
    ZapparCanvas,
} from '@zappar/zappar-react-three-fiber';
import { useRef } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
const Model = ({ onClick }) => {
    const modelRef = useRef();
    const gltf = useLoader(GLTFLoader, '/nft.glb');
    useFrame(() => {
        if (modelRef.current) {
            modelRef.current.rotation.y += 0.01; // Adjust rotation speed
        }
    });
    return (
        <primitive
            ref={modelRef}
            object={gltf.scene}
            scale={[1.0, 1.0, 1.0]}
            onClick={onClick}
        />
    );
};

const Ar = ({ onClose }) => {
    return (
        <div style={{ height: '100vh' }}>
            <ZapparCanvas>
                <ZapparCamera />
                <InstantTracker placementMode>
                    <Model onClick={onClose} />
                </InstantTracker>
                <directionalLight position={[2.5, 8, 5]} intensity={6.5} />
            </ZapparCanvas>
        </div>
    );
};

export default Ar;
