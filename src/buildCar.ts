import {
  Vector3,
  Mesh,
  MeshBuilder,
  Vector4,
  StandardMaterial,
  Scene,
  Texture,
  Animation
} from 'babylonjs'
import * as earcut from 'earcut'
(window as any).earcut = earcut

function createAnimation(): Animation {
  const animWheel = new Animation("wheelAnimation", "rotation.y", 30, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CYCLE)
  const wheelKeys: {
    frame: number,
    value: number
  }[] = []; 

  wheelKeys.push({
    frame: 0,
    value: 0
  });
  wheelKeys.push({
    frame: 30,
    value: 2 * Math.PI
  });
  animWheel.setKeys(wheelKeys);

  return animWheel
}

const outline = [
  new Vector3(-0.3, 0, -0.1),
  new Vector3(0.2, 0, -0.1)
]
export async function buildCar(scene: Scene): Promise<Mesh> {
  for (let i = 0; i < 20; i++) {
    outline.push(new Vector3(0.2 * Math.cos(i * Math.PI / 40), 0, 0.2 * Math.sin(i * Math.PI / 40) - 0.1))
  }
  outline.push(new Vector3(0, 0, 0.1))
  outline.push(new Vector3(-0.3, 0, 0.1))

  const faceUV: Vector4[] = []
  faceUV[0] = new Vector4(0, 0.5, 0.38, 1)
  faceUV[1] = new Vector4(0, 0, 1, 0.5)
  faceUV[2] = new Vector4(0.38, 1, 0, 0.5)

  const wheelUV: Vector4[] = []
  wheelUV[0] = new Vector4(0, 0, 1, 1)
  wheelUV[1] = new Vector4(0, 0.5, 0, 0.5)
  wheelUV[2] = new Vector4(0, 0, 1, 1)

  const wheelMat = new StandardMaterial("wheelMat", scene)
  wheelMat.diffuseTexture = new Texture('src/assets/wheel.png', scene)

  const car = MeshBuilder.ExtrudePolygon('car', {shape: outline, depth: 0.2, faceUV: faceUV, wrap: true})
  const wheelRB = MeshBuilder.CreateCylinder('wheelRB', {diameter: 0.125, height: 0.05, faceUV: wheelUV})
  
  wheelRB.material = wheelMat
  const animWheel = createAnimation()
  wheelRB.animations = [];
  wheelRB.animations.push(animWheel);

  wheelRB.parent = car
  wheelRB.position.z = -0.1
  wheelRB.position.x = -0.2
  wheelRB.position.y = 0.035
  const wheelRF = wheelRB.clone("wheelRF")
  wheelRF.position.x = 0.1
  const wheelLB = wheelRB.clone("wheelLB")
  wheelLB.position.y = -0.2 - 0.035
  const wheelLF = wheelRF.clone("wheelLF")
  wheelLF.position.y = -0.2 - 0.035

  const carMat = new StandardMaterial("carMat", scene)
  carMat.diffuseTexture = new Texture('src/assets/car.png', scene)
  car.material = carMat

  car.rotation.x = -Math.PI / 2
  car.position.y = 0.2

  scene.beginAnimation(wheelRB, 0, 30, true);
  scene.beginAnimation(wheelRF, 0, 30, true);
  scene.beginAnimation(wheelLB, 0, 30, true);
  scene.beginAnimation(wheelLF, 0, 30, true)

  return car
}
