"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// Spring damper for smooth camera drift
class Spring {
  pos = 0; vel = 0;
  constructor(public stiffness = 80, public damping = 12) {}
  update(target: number, dt: number) {
    const f = -this.stiffness * (this.pos - target) - this.damping * this.vel;
    this.vel += f * dt;
    this.pos += this.vel * dt;
    return this.pos;
  }
}

export default function ContactThree() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    // ── Renderer ──────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(el.clientWidth, el.clientHeight);
    el.appendChild(renderer.domElement);

    // ── Scene / Camera ────────────────────────────────────────
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, el.clientWidth / el.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 7);

    // ── Coral material colour ─────────────────────────────────
    const CORAL = new THREE.Color(0xc3704c);

    // ── Outer icosahedron (wireframe) ─────────────────────────
    const icoGeo = new THREE.IcosahedronGeometry(2.0, 1);
    const icoMat = new THREE.MeshBasicMaterial({
      color: CORAL,
      wireframe: true,
      transparent: true,
      opacity: 0,              // animated in via clip
    });
    const ico = new THREE.Mesh(icoGeo, icoMat);
    scene.add(ico);

    // ── Inner icosahedron ─────────────────────────────────────
    const icoInnerGeo = new THREE.IcosahedronGeometry(1.1, 0);
    const icoInnerMat = new THREE.MeshBasicMaterial({
      color: CORAL,
      wireframe: true,
      transparent: true,
      opacity: 0,
    });
    const icoInner = new THREE.Mesh(icoInnerGeo, icoInnerMat);
    scene.add(icoInner);

    // ── Orbital torus ring ────────────────────────────────────
    const ringGeo = new THREE.TorusGeometry(2.7, 0.005, 2, 140);
    const ringMat = new THREE.MeshBasicMaterial({
      color: CORAL,
      transparent: true,
      opacity: 0,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI * 0.38;
    ring.rotation.y = Math.PI * 0.12;
    scene.add(ring);

    // ── AnimationMixer: fade-in + breathing via keyframe clips ─
    const mixer = new THREE.AnimationMixer(scene);
    const clock  = new THREE.Clock();

    // Opacity fade-in for all three objects
    const fadeTime = [0, 1.4];
    const addFade = (target: THREE.Mesh, finalOpacity: number) => {
      const track = new THREE.NumberKeyframeTrack(
        ".material.opacity", fadeTime, [0, finalOpacity]
      );
      track.setInterpolation(THREE.InterpolateSmooth);
      const clip   = new THREE.AnimationClip("fadeIn", 1.4, [track]);
      const action = mixer.clipAction(clip, target);
      action.setLoop(THREE.LoopOnce, 1);
      action.clampWhenFinished = true;
      action.play();
    };
    addFade(ico,      0.17);
    addFade(icoInner, 0.10);
    addFade(ring,     0.13);

    // Scale breathing on outer ico (loops forever)
    const breathTimes  = [0, 1.8, 3.6];
    const breathValues = [1, 0, 0, 1.06, 0, 0, 1, 0, 0];   // VectorKeyframeTrack x,y,z
    const breathTrack  = new THREE.VectorKeyframeTrack(".scale", breathTimes, breathValues);
    breathTrack.setInterpolation(THREE.InterpolateSmooth);
    const breathClip   = new THREE.AnimationClip("breathe", 3.6, [breathTrack]);
    const breathAction = mixer.clipAction(breathClip, ico);
    breathAction.setLoop(THREE.LoopRepeat, Infinity);
    breathAction.play();

    // ── Particles ─────────────────────────────────────────────
    const PARTS   = 220;
    const basePos = new Float32Array(PARTS * 3);
    const phases  = new Float32Array(PARTS);

    for (let i = 0; i < PARTS; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const r     = 1.6 + Math.random() * 2.2;
      basePos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      basePos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      basePos[i * 3 + 2] = r * Math.cos(phi);
      phases[i] = Math.random() * Math.PI * 2;
    }

    const partGeo = new THREE.BufferGeometry();
    partGeo.setAttribute("position", new THREE.BufferAttribute(basePos.slice(), 3));
    const partMat = new THREE.PointsMaterial({
      color: new THREE.Color(0xd4957a),
      size: 0.025,
      transparent: true,
      opacity: 0.5,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(partGeo, partMat);
    scene.add(particles);

    // ── Spring-damped camera sway ─────────────────────────────
    const springX = new Spring(60, 10);
    const springY = new Spring(60, 10);

    // ── Resize ────────────────────────────────────────────────
    const onResize = () => {
      const W = el.clientWidth, H = el.clientHeight;
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
      renderer.setSize(W, H);
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(el);

    // ── Render loop ───────────────────────────────────────────
    let rafId = 0;
    const posAttr = partGeo.attributes.position as THREE.BufferAttribute;

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const t     = clock.getElapsedTime();

      // Update animation clips
      mixer.update(delta);

      // Manual rotation (not keyframed — continuous)
      ico.rotation.x      =  t * 0.10;
      ico.rotation.y      =  t * 0.13;
      icoInner.rotation.x = -t * 0.085;
      icoInner.rotation.y = -t * 0.115;
      ring.rotation.z     =  t * 0.055;

      // Particle radial breathing
      for (let i = 0; i < PARTS; i++) {
        const drift = 1 + Math.sin(t * 0.55 + phases[i]) * 0.08;
        posAttr.setXYZ(
          i,
          basePos[i * 3]     * drift,
          basePos[i * 3 + 1] * drift,
          basePos[i * 3 + 2] * drift,
        );
      }
      posAttr.needsUpdate = true;

      // Spring-damped camera drift
      const targetX = Math.sin(t * 0.18) * 0.5;
      const targetY = Math.cos(t * 0.14) * 0.3;
      camera.position.x = springX.update(targetX, delta);
      camera.position.y = springY.update(targetY, delta);
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      mixer.stopAllAction();
      icoGeo.dispose();     icoMat.dispose();
      icoInnerGeo.dispose(); icoInnerMat.dispose();
      ringGeo.dispose();    ringMat.dispose();
      partGeo.dispose();    partMat.dispose();
      renderer.dispose();
      el.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
