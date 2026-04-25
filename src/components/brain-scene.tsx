"use client";
import { useEffect, useRef, useState } from "react";
import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  Group,
  WireframeGeometry,
  LineSegments,
  LineBasicMaterial,
  Points,
  PointsMaterial,
  BufferGeometry,
  Float32BufferAttribute,
  SphereGeometry,
  MeshBasicMaterial,
  Mesh,
  AdditiveBlending,
} from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { createBrainGeometry } from "@/lib/brain-geometry";
import { extractBrainGeometry } from "@/lib/brain-loader";

interface Props {
  className?: string;
  heightClass?: string;
}

type Status = "loading" | "ready" | "fallback";

export default function BrainScene({ className = "", heightClass = "h-[70vh]" }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const testCanvas = document.createElement("canvas");
    const hasWebGL = !!(
      testCanvas.getContext("webgl2") || testCanvas.getContext("webgl")
    );
    if (!hasWebGL) {
      mount.innerHTML = `<pre class="font-pixel text-retro-green text-xs leading-tight p-4 select-none" aria-label="ASCII brain">${ASCII_BRAIN}</pre>`;
      return;
    }

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const renderer = new WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene = new Scene();
    const camera = new PerspectiveCamera(55, 1, 0.1, 100);
    camera.position.z = 4.5;

    const group = new Group();
    scene.add(group);

    // Inner group with fixed orientation correction for the GLB mesh
    // (3MF ships face-down; pitch back -90° around X so it stands upright).
    const meshGroup = new Group();
    meshGroup.rotation.x = -Math.PI / 2;
    group.add(meshGroup);

    const disposables: Array<{ dispose: () => void }> = [];
    let cancelled = false;

    const buildScene = (brainGeo: BufferGeometry) => {
      if (cancelled) {
        brainGeo.dispose();
        return;
      }
      disposables.push(brainGeo);

      const wireGeo = new WireframeGeometry(brainGeo);
      const wireMat = new LineBasicMaterial({ color: 0x39ff14, transparent: true, opacity: 0.55 });
      meshGroup.add(new LineSegments(wireGeo, wireMat));
      disposables.push(wireGeo, wireMat);

      const glowGeo = new WireframeGeometry(brainGeo);
      const glowMat = new LineBasicMaterial({
        color: 0x39ff14,
        transparent: true,
        opacity: 0.15,
        blending: AdditiveBlending,
      });
      const glowMesh = new LineSegments(glowGeo, glowMat);
      glowMesh.scale.setScalar(1.04);
      meshGroup.add(glowMesh);
      disposables.push(glowGeo, glowMat);

      const pts = brainGeo.attributes.position;
      const ptsGeo = new BufferGeometry();
      ptsGeo.setAttribute(
        "position",
        new Float32BufferAttribute(pts.array.slice() as Float32Array, 3),
      );
      const ptsMat = new PointsMaterial({
        color: 0x00ffff,
        size: 0.025,
        transparent: true,
        opacity: 0.6,
        blending: AdditiveBlending,
        sizeAttenuation: true,
      });
      meshGroup.add(new Points(ptsGeo, ptsMat));
      disposables.push(ptsGeo, ptsMat);

      const coreGeo = new SphereGeometry(0.28, 8, 6);
      const coreMat = new MeshBasicMaterial({ color: 0xff00ff, wireframe: true });
      meshGroup.add(new Mesh(coreGeo, coreMat));
      disposables.push(coreGeo, coreMat);
    };

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco/");
    dracoLoader.setDecoderConfig({ type: "wasm" });

    const gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(dracoLoader);

    gltfLoader
      .loadAsync("/models/brain.glb")
      .then((gltf) => {
        const geo = extractBrainGeometry(gltf.scene);
        buildScene(geo);
        if (!cancelled) setStatus("ready");
      })
      .catch(() => {
        const isMobile = window.innerWidth < 768;
        const fallback = createBrainGeometry({
          widthSegs: isMobile ? 48 : 80,
          heightSegs: isMobile ? 36 : 60,
        });
        buildScene(fallback);
        if (!cancelled) setStatus("fallback");
      })
      .finally(() => {
        dracoLoader.dispose();
      });

    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    let rafId: number;
    let t = 0;

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      if (!prefersReduced) {
        t += 0.004;
        group.rotation.y = t;
        group.rotation.x = Math.sin(t * 0.4) * 0.15;
      }
      renderer.render(scene, camera);
    };

    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(rafId);
      else animate();
    };
    document.addEventListener("visibilitychange", onVisibility);

    animate();

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      document.removeEventListener("visibilitychange", onVisibility);
      ro.disconnect();
      for (const d of disposables) d.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className={`relative w-full ${heightClass} ${className}`} aria-label="3D rotating digital brain">
      <div ref={mountRef} className="absolute inset-0" />
      {status === "loading" && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center font-mono text-xs text-retro-green animate-blink">
          █ LOADING NEURAL MESH...
        </div>
      )}
    </div>
  );
}

const ASCII_BRAIN = `
        .-~~~-.
    .-~         ~-.
  .~   (  brain   )  ~.
 /    (  no webgl  )   \\
|      ~.       .~      |
 \\        ~---~        /
  '-.________________.-'
`;
