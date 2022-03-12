import {
  Scene,
  SceneLoader,
  Vector3,
  Axis,
  Tools,
  Space,
  Mesh
} from 'babylonjs'

class walk {
  public turn;
  public dist;
  constructor(turn: number, dist: number) {
    this.turn = turn;
    this.dist = dist;
  }
}

export async function buildHim(scene: Scene): Promise<Mesh> {
  const track: any[] = [];
  track.push(new walk(86, 7));
  track.push(new walk(-85, 14.8));
  track.push(new walk(-93, 16.5));
  track.push(new walk(48, 25.5));
  track.push(new walk(-112, 30.5));
  track.push(new walk(-72, 33.2));
  track.push(new walk(42, 37.5));
  track.push(new walk(-98, 45.2));
  track.push(new walk(0, 47))

  let duleMesh: Mesh | undefined = undefined
  SceneLoader.ImportMeshAsync("him", "src/assets/", "Dude.babylon", scene).then((result) => {
    const dude = result.meshes[0] as Mesh;
    dude.scaling = new Vector3(0.008, 0.008, 0.008);
    dude.position = new Vector3(-6, 0, 0);
    dude.rotate(Axis.Y, Tools.ToRadians(-95), Space.LOCAL);
    const startRotation = dude.rotationQuaternion!.clone();
    scene.beginAnimation(result.skeletons[0], 0, 100, true, 1.0);
    let distance = 0;
    let step = 0.015;
    let p = 0;
    scene.onBeforeRenderObservable.add(() => {
      dude.movePOV(0, 0, step);
      if (!(dude.getChildren()[1] as Mesh).intersectsMesh(scene.getMeshByName("car")!)) {
        return;
      }
      distance += step;
      if (distance > track[p].dist) {
        dude.rotate(Axis.Y, Tools.ToRadians(track[p].turn), Space.LOCAL);
        p += 1;
        p %= track.length;
        if (p === 0) {
          distance = 0;
          dude.position = new Vector3(-6, 0, 0);
          dude.rotationQuaternion = startRotation.clone();
        }
      }
    })
    duleMesh = dude
  });
  return duleMesh as unknown as Mesh
}
