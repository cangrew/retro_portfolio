import { BufferGeometry, Float32BufferAttribute, Mesh, type Group } from "three";

export function extractBrainGeometry(root: Group): BufferGeometry {
  let positions: Float32Array | null = null;
  let indices: Uint16Array | Uint32Array | null = null;

  root.traverse((obj) => {
    if (positions) return;
    if ((obj as Mesh).isMesh) {
      const geo = (obj as Mesh).geometry as BufferGeometry;
      const pos = geo.getAttribute("position");
      if (pos) {
        positions = new Float32Array(pos.array as ArrayLike<number>);
        const idx = geo.getIndex();
        if (idx) {
          const arr = idx.array;
          indices =
            arr instanceof Uint16Array
              ? new Uint16Array(arr)
              : new Uint32Array(arr as ArrayLike<number>);
        }
      }
    }
  });

  if (!positions) throw new Error("No mesh found in GLB");

  const out = new BufferGeometry();
  out.setAttribute("position", new Float32BufferAttribute(positions, 3));
  if (indices) out.setIndex(Array.from(indices));
  out.computeVertexNormals();
  return out;
}
