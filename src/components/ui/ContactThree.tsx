"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ContactThree() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    // ── Scene setup ───────────────────────────────────────────
    const scene    = new THREE.Scene();
    const W        = el.clientWidth;
    const H        = el.clientHeight;
    const camera   = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
    camera.position.set(0, 0, 6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    // ── Materials ─────────────────────────────────────────────
    const coral      = new THREE.Color(0xc3704c);
    const coralLight = new THREE.Color(0xd4957a);

    // ── Outer icosahedron wireframe ───────────────────────────
    const icoGeo  = new THREE.IcosahedronGeometry(1.7, 1);
    const icoMat  = new THREE.MeshBasicMaterial({
      color: coral,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const ico = new THREE.Mesh(icoGeo, icoMat);
    scene.add(ico);

    // ── Inner icosahedron (counter-rotates) ───────────────────
    const icoInner = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.0, 0),
      new THREE.MeshBasicMaterial({
        color: coralLight,
        wireframe: true,
        transparent: true,
        opacity: 0.12,
      })
    );
    scene.add(icoInner);

    // ── Orbital ring ──────────────────────────────────────────
    const ringGeo = new THREE.TorusGeometry(2.3, 0.004, 2, 120);
    const ringMat = new THREE.MeshBasicMaterial({
      color: coral,
      transparent: true,
      opacity: 0.14,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI * 0.35;
    ring.rotation.y = Math.PI * 0.15;
    scene.add(ring);

    // ── Floating particles ────────────────────────────────────
    const PARTS = 260;
    const positions = new Float32Array(PARTS * 3);
    const phases    = new Float32Array(PARTS);
    for (let i = 0; i < PARTS; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const r     = 1.4 + Math.random() * 2.4;
      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      phases[i] = Math.random() * Math.PI * 2;
    }

    const partGeo = new THREE.BufferGeometry();
    partGeo.setAttribute("position", new THREE.BufferAttribute(positions.slice(), 3));
    const partMat = new THREE.PointsMaterial({
      color: coralLight,
      size: 0.028,
      transparent: true,
      opacity: 0.55,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(partGeo, partMat);
    scene.add(particles);

    // Keep original positions for breathing animation
    const basePos = positions.slice();

    // ── Resize handler ────────────────────────────────────────
    const onResize = () => {
      const nW = el.clientWidth;
      const nH = el.clientHeight;
      camera.aspect = nW / nH;
      camera.updateProjectionMatrix();
      renderer.setSize(nW, nH);
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(el);

    // ── Render loop ───────────────────────────────────────────
    let rafId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Slow gentle rotation
      ico.rotation.x = t * 0.11;
      ico.rotation.y = t * 0.14;
      icoInner.rotation.x = -t * 0.09;
      icoInner.rotation.y = -t * 0.13;
      ring.rotation.z = t * 0.06;

      // Subtle breathing on outer ico
      const breathe = 1 + Math.sin(t * 0.7) * 0.04;
      ico.scale.setScalar(breathe);

      // Particle drift — each particle breathes radially
      const pos = partGeo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < PARTS; i++) {
        const drift = 1 + Math.sin(t * 0.6 + phases[i]) * 0.07;
        pos.setX(i, basePos[i * 3]     * drift);
        pos.setY(i, basePos[i * 3 + 1] * drift);
        pos.setZ(i, basePos[i * 3 + 2] * drift);
      }
      pos.needsUpdate = true;

      // Slow camera drift
      camera.position.x = Math.sin(t * 0.18) * 0.4;
      camera.position.y = Math.cos(t * 0.14) * 0.25;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      renderer.dispose();
      icoGeo.dispose();
      icoMat.dispose();
      icoInner.geometry.dispose();
      (icoInner.material as THREE.Material).dispose();
      ringGeo.dispose();
      ringMat.dispose();
      partGeo.dispose();
      partMat.dispose();
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
