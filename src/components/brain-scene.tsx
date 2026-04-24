"use client";
import { useEffect, useRef } from "react";
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
import { createBrainGeometry } from "@/lib/brain-geometry";

interface Props {
  className?: string;
  heightClass?: string;
}

export default function BrainScene({ className = "", heightClass = "h-[70vh]" }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // WebGL feature detection → ASCII fallback
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

    const isMobile = window.innerWidth < 768;
    const brainGeo = createBrainGeometry({
      widthSegs: isMobile ? 48 : 80,
      heightSegs: isMobile ? 36 : 60,
    });

    // Neon green wireframe
    const wireGeo = new WireframeGeometry(brainGeo);
    const wireMat = new LineBasicMaterial({ color: 0x39ff14, transparent: true, opacity: 0.85 });
    group.add(new LineSegments(wireGeo, wireMat));

    // Fake bloom: second pass slightly larger, very faint
    const glowGeo = new WireframeGeometry(brainGeo);
    const glowMat = new LineBasicMaterial({ color: 0x39ff14, transparent: true, opacity: 0.18, blending: AdditiveBlending });
    const glowMesh = new LineSegments(glowGeo, glowMat);
    glowMesh.scale.setScalar(1.04);
    group.add(glowMesh);

    // Cyan particle halo
    const pts = brainGeo.attributes.position;
    const ptsGeo = new BufferGeometry();
    ptsGeo.setAttribute("position", new Float32BufferAttribute(pts.array.slice() as Float32Array, 3));
    const ptsMat = new PointsMaterial({
      color: 0x00ffff,
      size: 0.03,
      transparent: true,
      opacity: 0.7,
      blending: AdditiveBlending,
      sizeAttenuation: true,
    });
    group.add(new Points(ptsGeo, ptsMat));

    // Magenta core
    const coreGeo = new SphereGeometry(0.28, 8, 6);
    const coreMat = new MeshBasicMaterial({ color: 0xff00ff, wireframe: true });
    group.add(new Mesh(coreGeo, coreMat));

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
      cancelAnimationFrame(rafId);
      document.removeEventListener("visibilitychange", onVisibility);
      ro.disconnect();
      brainGeo.dispose();
      wireGeo.dispose();
      glowGeo.dispose();
      ptsGeo.dispose();
      coreGeo.dispose();
      wireMat.dispose();
      glowMat.dispose();
      ptsMat.dispose();
      coreMat.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`w-full ${heightClass} ${className}`}
      aria-label="3D rotating digital brain"
    />
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
