import {
  Engine,
  Scene,
  ArcRotateCamera,
  FollowCamera,
  Vector3,
  HemisphericLight,
  DirectionalLight,
  ShadowGenerator,
  Animation,
  Mesh
} from 'babylonjs'
import { buildGround } from './buildGround'
import { buildHouse } from './buildHouse'
import { buildDwellings } from './buildDwellings'
import { buildCar } from './buildCar'
import { buildHim } from './buildHime'
import { buildSkyBox } from './buildSkyBox'
import { buildSprite } from './buildSprite'
import { buildFountain } from './buildFountain'
import { buildLamp } from './buildLamp'
import { buildGUI } from './buildGUI'

export async function createScene(engine: Engine, canvas: HTMLCanvasElement): Promise<Scene> {
  const scene = new Scene(engine)
  const camera = new ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 2.5, 3, new Vector3(0, 0, 0), scene)
  // camera.attachControl(true)
  // camera.upperRadiusLimit = 10
  // camera.lowerRadiusLimit = 5
  // camera.upperBetaLimit = Math.PI / 2.2
  // camera.heightOffset = 8;
  // camera.radius = 1;
  // camera.rotationOffset = 0;
  // camera.cameraAcceleration = 0.005
  // camera.maxCameraSpeed = 10
  camera.attachControl(canvas, true);
  // const light = new HemisphericLight('light', new Vector3(0, 1, 0), scene)
  const light = new DirectionalLight("dir01", new Vector3(0, -1, 1), scene);
  light.position = new Vector3(0, 50, -100);

  const xr = scene.createDefaultXRExperienceAsync({})

  const shadowGenerator = new ShadowGenerator(1024, light);
  light.intensity = 1;

  const detached_house = await buildHouse(scene);
  detached_house.rotation.y = -Math.PI / 16;
  detached_house.position.x = -6.8;
  detached_house.position.z = 2.5;

  const semi_house = await buildHouse(scene);
  semi_house.rotation.y = -Math.PI / 16;
  semi_house.position.x = -4.5;
  semi_house.position.z = 3;

  const ground = await buildGround(scene)
  await buildDwellings(detached_house, semi_house)
  const car = await buildCar(scene)
  carAnimation(scene, car)
  const him = await buildHim(scene)
  await buildSkyBox(scene)
  await buildSprite(scene)
  await buildFountain(scene)
  await buildLamp(scene)
  await buildGUI(light)

  // camera.parent = him
  // camera.lockedTarget = him

  shadowGenerator.addShadowCaster(him, false)
  ground.receiveShadows = true

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
