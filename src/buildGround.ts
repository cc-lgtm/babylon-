import {
  Scene,
  MeshBuilder,
  StandardMaterial,
  Mesh,
  Texture
} from 'babylonjs'

export async function buildGround(scene: Scene): Promise<Mesh> {
  const ground = MeshBuilder.CreateGround('ground', {width: 20, height: 20}, scene)
  const groundMat = new StandardMaterial('groundMat', scene)
  groundMat.diffuseTexture = new Texture('/src/assets/villagegreen.png', scene)
  groundMat.diffuseTexture.hasAlpha = true
  ground.material = groundMat

  const largeGroundMat = new StandardMaterial('largeGroundMat', scene)
  largeGroundMat.diffuseTexture = new Texture('/src/assets/valleygrass.png', scene)
  const largeGround = Mesh.CreateGroundFromHeightMap('large', '/src/assets/villageheightmap.png', 150, 150, 20, 0, 20, scene)
  largeGround.material = largeGroundMat
  largeGround.position.y = -0.01

  return ground
}
