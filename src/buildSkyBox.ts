import {
  Scene,
  Mesh,
  MeshBuilder,
  StandardMaterial,
  CubeTexture,
  Texture,
  Color3
} from 'babylonjs'

export async function buildSkyBox(scene: Scene): Promise<Mesh> {
  const skyBox = MeshBuilder.CreateBox('skyBox', {size: 150}, scene)
  const skyboxMaterial = new StandardMaterial("skyBox", scene);
  skyboxMaterial.backFaceCulling = false;
  skyboxMaterial.reflectionTexture = new CubeTexture("/src/assets/skybox", scene);
  skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
  skyboxMaterial.diffuseColor = new Color3(0, 0, 0);
  skyboxMaterial.specularColor = new Color3(0, 0, 0);
  skyBox.material = skyboxMaterial

  return skyBox
}
