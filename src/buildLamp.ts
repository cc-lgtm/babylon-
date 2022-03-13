import {
  Scene,
  Vector3,
  Mesh,
  SceneLoader,
  SpotLight,
  Color3
} from 'babylonjs'

export async function buildLamp(scene: Scene): Promise<Mesh> {
  const lamp = SceneLoader.ImportMesh('', '/src/assets/', 'lamp.babylon', scene) as unknown as Mesh
  const lampLight = new SpotLight("lampLight", Vector3.Zero(), new Vector3(0, -1, 0), 0.8 * Math.PI, 0.01, scene);
  lampLight.diffuse = Color3.Yellow();
  lampLight.parent = scene.getMeshByName("bulb")

  lamp.position = new Vector3(2, 0, 2); 
  lamp.rotation = Vector3.Zero();
  lamp.rotation.y = -Math.PI / 4;

  return lamp
}
