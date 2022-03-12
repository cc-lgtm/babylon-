import {
  Scene,
  MeshBuilder,
  StandardMaterial,
  Color3,
  Mesh
} from 'babylonjs'

export async function buildGround(scene: Scene): Promise<Mesh> {
  const ground = MeshBuilder.CreateGround('ground', {width: 20, height: 20}, scene)
  const groundMat = new StandardMaterial('groundMat', scene)
  groundMat.diffuseColor = new Color3(0, 1, 0)
  ground.material = groundMat

  return ground
}
