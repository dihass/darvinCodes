"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

class Spring {
  pos = 0; vel = 0;
  constructor(public k = 70, public d = 11) {}
  tick(target: number, dt: number) {
    this.vel += (-this.k * (this.pos - target) - this.d * this.vel) * dt;
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

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, el.clientWidth / el.clientHeight, 0.1, 100);
    camera.position.set(0, 0.6, 6.5);
    camera.lookAt(0, 0, 0);

    // ── Brand colour ──────────────────────────────────────────
    const coral  = new THREE.Color(0xc3704c);
    const coralL = new THREE.Color(0xd4957a);

    // ── Main: Torus Knot wireframe ────────────────────────────
    const knotGeo = new THREE.TorusKnotGeometry(1.18, 0.36, 220, 22, 2, 3);
    const knotMat = new THREE.MeshBasicMaterial({
      color: coral,
      wireframe: true,
      transparent: true,
      opacity: 0,
    });
    const knot = new THREE.Mesh(knotGeo, knotMat);
    scene.add(knot);

    // ── Three orbital halos at different tilts ────────────────
    const haloAngles = [
      [Math.PI * 0.32, Math.PI * 0.1,  0],
      [Math.PI * 0.55, Math.PI * 0.38, 0],
      [Math.PI * 0.12, Math.PI * 0.62, 0],
    ];
    const halos: THREE.Mesh[] = [];
    haloAngles.forEach(([rx, ry]) => {
      const geo = new THREE.TorusGeometry(2.05 + Math.random() * 0.3, 0.005, 2, 150);
      const mat = new THREE.MeshBasicMaterial({
        color: coral,
        transparent: true,
        opacity: 0,
      });
      const h = new THREE.Mesh(geo, mat);
      h.rotation.x = rx;
      h.rotation.y = ry;
      scene.add(h);
      halos.push(h);
    });

    // ── AnimationMixer – fade-in everything ───────────────────
    const mixer = new THREE.AnimationMixer(scene);
    const clock  = new THREE.Clock();

    const fadeIn = (obj: THREE.Mesh, target: number, dur: number) => {
      const track = new THREE.NumberKeyframeTrack(".material.opacity", [0, dur], [0, target]);
      track.setInterpolation(THREE.InterpolateSmooth);
      const action = mixer.clipAction(new THREE.AnimationClip("fi", dur, [track]), obj);
      action.setLoop(THREE.LoopOnce, 1);
      action.clampWhenFinished = true;
      action.play();
    };

    fadeIn(knot, 0.28, 1.4);
    halos.forEach((h) => fadeIn(h, 0.16, 1.8));

    // Scale breathing (knot) via keyframe track
    const breathTrack = new THREE.VectorKeyframeTrack(
      ".scale", [0, 2.2, 4.4],
      [1, 1, 1,  1.06, 1.06, 1.06,  1, 1, 1],
    );
    breathTrack.setInterpolation(THREE.InterpolateSmooth);
    const breathAction = mixer.clipAction(
      new THREE.AnimationClip("breathe", 4.4, [breathTrack]), knot
    );
    breathAction.setLoop(THREE.LoopRepeat, Infinity);
    breathAction.play();

    // ── Particles ─────────────────────────────────────────────
    const N = 260;
    const bp = new Float32Array(N * 3);
    const ph = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const r     = 1.5 + Math.random() * 2.6;
      bp[i*3]   = r * Math.sin(phi) * Math.cos(theta);
      bp[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
      bp[i*3+2] = r * Math.cos(phi);
      ph[i] = Math.random() * Math.PI * 2;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(bp.slice(), 3));
    const pMat = new THREE.PointsMaterial({
      color: coralL, size: 0.032, transparent: true, opacity: 0.6, sizeAttenuation: true,
    });
    const pts = new THREE.Points(pGeo, pMat);
    scene.add(pts);
    const pAttr = pGeo.attributes.position as THREE.BufferAttribute;

    // ── Spring-damped camera sway ─────────────────────────────
    const sx = new Spring(55, 10);
    const sy = new Spring(55, 10);

    // ── Resize ────────────────────────────────────────────────
    const ro = new ResizeObserver(() => {
      renderer.setSize(el.clientWidth, el.clientHeight);
      camera.aspect = el.clientWidth / el.clientHeight;
      camera.updateProjectionMatrix();
    });
    ro.observe(el);

    // ── Render loop ───────────────────────────────────────────
    let rafId = 0;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const dt = clock.getDelta();
      const t  = clock.getElapsedTime();

      mixer.update(dt);

      // Knot rotation
      knot.rotation.x = t * 0.13;
      knot.rotation.y = t * 0.17;

      // Halos slow drift
      halos[0].rotation.z += dt * 0.04;
      halos[1].rotation.z -= dt * 0.03;
      halos[2].rotation.z += dt * 0.025;

      // Particle radial breathing
      for (let i = 0; i < N; i++) {
        const d = 1 + Math.sin(t * 0.5 + ph[i]) * 0.09;
        pAttr.setXYZ(i, bp[i*3]*d, bp[i*3+1]*d, bp[i*3+2]*d);
      }
      pAttr.needsUpdate = true;

      // Spring camera sway
      camera.position.x = sx.tick(Math.sin(t * 0.16) * 0.45, dt);
      camera.position.y = sy.tick(Math.cos(t * 0.12) * 0.28 + 0.4, dt);
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      mixer.stopAllAction();
      knotGeo.dispose(); knotMat.dispose();
      halos.forEach(h => { h.geometry.dispose(); (h.material as THREE.Material).dispose(); });
      pGeo.dispose(); pMat.dispose();
      renderer.dispose();
      el.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
