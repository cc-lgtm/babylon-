import {
  MeshBuilder,
  Texture,
  StandardMaterial,
  Scene,
  Mesh,
  Vector4
} from 'babylonjs'

const faceUV: Vector4[] = []
faceUV[0] = new Vector4(0.5, 0, 0.75, 1)
faceUV[1] = new Vector4(0, 0, 0.25, 1)
faceUV[2] = new Vector4(0.25, 0, 0.5, 1)
faceUV[3] = new Vector4(0.75, 0, 1, 1)

export async function buildHouse(scene: Scene): Promise<Mesh> {
  const box = MeshBuilder.CreateBox('box', {faceUV: faceUV, wrap: true}, scene)
  box.position.y = 0.5
  const roof = MeshBuilder.CreateCylinder('roof', {diameter: 1.3, height: 1.2, tessellation: 3})
  roof.scaling.x = 0.75
  roof.rotation.z = Math.PI / 2
  roof.position.y = 1.2

  const roofMat = new StandardMaterial('roofMat', scene)
  roofMat.diffuseTexture = new Texture('src/assets/roof.jpg', scene)
  roof.material = roofMat
  const boxMat = new StandardMaterial('boxMat', scene)
  boxMat.diffuseTexture = new Texture('src/assets/cubehouse.png', scene)
  box.material = boxMat

  const house = Mesh.MergeMeshes([box, roof], true, false, undefined, false, true) as Mesh

  return house
}
