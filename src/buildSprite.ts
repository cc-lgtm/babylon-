import {
  Scene,
  SpriteManager,
  Sprite
} from 'babylonjs'

export async function buildSprite(scene: Scene) {
  const spriteManagerTrees = new SpriteManager("treesManager", "/src/assets/palmtree.png", 2000, {width: 512, height: 1024}, scene)
  for (let i = 0; i < 500; i++) {
    const tree = new Sprite("tree", spriteManagerTrees);
    tree.position.x = Math.random() * (-30);
    tree.position.z = Math.random() * 20 + 8;
    tree.position.y = 0.5;
  }
  for (let i = 0; i < 500; i++) {
    const tree = new Sprite("tree", spriteManagerTrees);
    tree.position.x = Math.random() * (25) + 7;
    tree.position.z = Math.random() * -35  + 8;
    tree.position.y = 0.5;
  }
  const spriteManagerUFO = new SpriteManager("UFOManager","/src/assets/ufo.png", 1, {width: 128, height: 76}, scene)
  const ufo = new Sprite("ufo", spriteManagerUFO);
  ufo.position.y = 10
  ufo.playAnimation(0, 16, true, 125)
}
