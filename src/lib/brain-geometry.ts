import {
  SphereGeometry,
  BufferGeometry,
  Float32BufferAttribute,
} from "three";

export interface BrainGeometryOptions {
  radius?: number;
  widthSegs?: number;
  heightSegs?: number;
}

export function createBrainGeometry({
  radius = 1.5,
  widthSegs = 80,
  heightSegs = 60,
}: BrainGeometryOptions = {}): BufferGeometry {
  const base = new SphereGeometry(radius, widthSegs, heightSegs);
  const pos = base.attributes.position;
  const out = new Float32Array(pos.count * 3);

  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);

    const len = Math.sqrt(x * x + y * y + z * z) || 1;
    const nx = x / len;
    const ny = y / len;
    const nz = z / len;

    // Interhemispheric fissure: groove along the x=0 plane, deepest at top
    const groove = Math.exp(-nx * nx * 10) * 0.45 * Math.max(0, ny + 0.3);

    // Gyri/sulci: layered high-frequency folds
    const folds =
      Math.sin(ny * 11 + nz * 8)  * 0.075 +
      Math.sin(nz * 13 + nx * 9)  * 0.060 +
      Math.sin(nx * 10 + ny * 14) * 0.050 +
      Math.sin(ny * 17 + nx * 12) * 0.035 +
      Math.sin(nz * 19 + ny * 15) * 0.025;

    // Flatten the bottom slightly (brain stem area)
    const bottomFlatten = Math.max(0, -ny - 0.4) * 0.35;

    const r = radius - groove + folds - bottomFlatten;

    // Brain proportions: wider (x), slightly elongated (z), compressed (y)
    out[i * 3]     = nx * r * 1.35;
    out[i * 3 + 1] = ny * r * 0.95;
    out[i * 3 + 2] = nz * r * 1.1;
  }

  const geo = new BufferGeometry();
  geo.setAttribute("position", new Float32BufferAttribute(out, 3));
  geo.setIndex(base.index);
  geo.computeVertexNormals();
  base.dispose();
  return geo;
}
