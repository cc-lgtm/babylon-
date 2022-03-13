import {
  Scene,
  Vector3,
  MeshBuilder,
  Mesh,
  ParticleSystem,
  Texture,
  Color4,
  PointerEventTypes
} from 'babylonjs'

export async function buildFountain(scene: Scene): Promise<Mesh> {
  const fountainProfile: Vector3[] = [
		new Vector3(0, 0, 0),
		new Vector3(0.5, 0, 0),
    new Vector3(0.5, 0.2, 0),
		new Vector3(0.4, 0.2, 0),
    new Vector3(0.4, 0.05, 0),
    new Vector3(0.05, 0.1, 0),
		new Vector3(0.05, 0.8, 0),
		new Vector3(0.15, 0.9, 0)
  ];
  const fountain = MeshBuilder.CreateLathe("fountain", {shape: fountainProfile, sideOrientation: Mesh.DOUBLESIDE}, scene);
  fountain.position.x = -4;
  fountain.position.z = -6;

  const particleSystem = new ParticleSystem("particles", 5000, scene);
  particleSystem.particleTexture = new Texture("/src/assets/flare.png", scene)
  particleSystem.emitter = new Vector3(-4, 0.8, -6)
  particleSystem.minEmitBox = new Vector3(-0.01, 0, -0.01)
  particleSystem.maxEmitBox = new Vector3(0.01, 0, 0.01)

  particleSystem.color1 = new Color4(0.7, 0.8, 1.0, 1.0);
  particleSystem.color2 = new Color4(0.2, 0.5, 1.0, 1.0);

  particleSystem.blendMode = ParticleSystem.BLENDMODE_ONEONE;

  particleSystem.minSize = 0.01;
  particleSystem.maxSize = 0.05;

  particleSystem.minLifeTime = 0.3;
  particleSystem.maxLifeTime = 1.5;

  particleSystem.emitRate = 1500;

  particleSystem.direction1 = new Vector3(-1, 8, 1);
  particleSystem.direction2 = new Vector3(1, 8, -1);

  particleSystem.minEmitPower = 0.2;
  particleSystem.maxEmitPower = 0.6;
  particleSystem.updateSpeed = 0.01;

  particleSystem.gravity = new Vector3(0, -9.81, 0)

  let switched: boolean = false;
  scene.onPointerObservable.add((pointerInfo: {
    type: any,
    pickInfo: any
  }) => {            
    switch (pointerInfo.type) {
      case PointerEventTypes.POINTERDOWN:
        if(pointerInfo.pickInfo.hit) {
          pointerDown(pointerInfo.pickInfo.pickedMesh)
        }
      break;
    }
  });

  const pointerDown = (mesh: Mesh) => {
    if (mesh === fountain) { //check that the picked mesh is the fountain
      switched = !switched;  //toggle switch
      if(switched) {
        particleSystem.start();
      }
      else {
        particleSystem.stop();
      }
    }
  }

  return fountain
}
