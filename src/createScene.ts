import {
  Engine,
  Scene,
  ArcRotateCamera,
  Vector3,
  HemisphericLight,
  Animation,
  Mesh
} from 'babylonjs'
import { buildGround } from './buildGround'
import { buildHouse } from './buildHouse'
import { buildDwellings } from './buildDwellings'
import { buildCar } from './buildCar'
import { buildHim } from './buildHime'

export async function createScene(engine: Engine, canvas: HTMLCanvasElement): Promise<Scene> {
  const scene = new Scene(engine)
  const camera = new ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 2, 3, new Vector3(0, 0, 0), scene)
  camera.attachControl(canvas, true)
  camera.upperRadiusLimit = 10
  camera.lowerRadiusLimit = 10
  new HemisphericLight('light', new Vector3(0, 1, 0), scene)

  const detached_house = await buildHouse(scene);
  detached_house.rotation.y = -Math.PI / 16;
  detached_house.position.x = -6.8;
  detached_house.position.z = 2.5;

  const semi_house = await buildHouse(scene);
  semi_house.rotation.y = -Math.PI / 16;
  semi_house.position.x = -4.5;
  semi_house.position.z = 3;

  await buildGround(scene)
  await buildDwellings(detached_house, semi_house)
  const car = await buildCar(scene)
  carAnimation(scene, car)
  await buildHim(scene)

  return scene
}

function carAnimation(scene: Scene, car: Mesh) {
  const animCar = new Animation("carAnimation", "position.x", 30, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CYCLE);
  const carKeys = [];
  carKeys.push({
    frame: 0,
    value: -4
  });
  carKeys.push({
    frame: 150,
    value: 4
  });
  carKeys.push({
    frame: 210,
    value: 4
  });
  animCar.setKeys(carKeys);
  car.animations = [];
  car.animations.push(animCar);
  scene.beginAnimation(car, 0, 210, true)
}
