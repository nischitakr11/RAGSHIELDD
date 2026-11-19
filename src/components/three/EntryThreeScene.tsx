import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface EntryThreeSceneProps {
  onAccessPlatform: () => void;
  onStageChange?: (stage: string) => void;
}

export const EntryThreeScene: React.FC<EntryThreeSceneProps> = ({
  onAccessPlatform,
  onStageChange,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let animFrameId: number;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // --- SCENE SETUP ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0908, 0.015);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.5, 14);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    // Append canvas
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // --- LIGHTING ---
    const ambientLight = new THREE.AmbientLight(0x2a221b, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffdfa0, 2.5);
    dirLight.position.set(6, 12, 8);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.bias = -0.0005;
    scene.add(dirLight);

    const rimLight = new THREE.DirectionalLight(0xd4af37, 1.8);
    rimLight.position.set(-8, -4, -6);
    scene.add(rimLight);

    const docLight = new THREE.PointLight(0xc5a059, 2.2, 8);
    docLight.position.set(-4.5, -0.5, 2);
    scene.add(docLight);

    const hashLight = new THREE.PointLight(0xffe8a3, 3.5, 9);
    hashLight.position.set(0, -0.2, 2.5);
    scene.add(hashLight);

    const ledgerLight = new THREE.PointLight(0xd4af37, 2.5, 8);
    ledgerLight.position.set(4.5, -0.5, 2);
    scene.add(ledgerLight);

    // --- MATERIALS ---
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.85,
      roughness: 0.25,
      emissive: 0x221705,
      emissiveIntensity: 0.3,
    });

    const darkObsidianMaterial = new THREE.MeshStandardMaterial({
      color: 0x161517,
      metalness: 0.6,
      roughness: 0.35,
    });

    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x24201c,
      metalness: 0.2,
      roughness: 0.15,
      transmission: 0.7,
      thickness: 0.8,
      transparent: true,
      opacity: 0.88,
      reflectivity: 0.9,
    });

    const glowEdgeMaterial = new THREE.LineBasicMaterial({
      color: 0xffdf88,
      linewidth: 1.5,
      transparent: true,
      opacity: 0.75,
    });

    // --- 1. MOUNTAIN TERRAIN ---
    const terrainGroup = new THREE.Group();
    const terrainGeo = new THREE.PlaneGeometry(36, 18, 90, 60);
    const posAttr = terrainGeo.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i);
      const y = posAttr.getY(i);
      const distFromCenter = Math.abs(x) / 18;
      const ridge =
        Math.sin(x * 0.45) * 1.2 +
        Math.cos(y * 0.6) * 0.8 +
        Math.sin(x * 0.9 + y * 0.7) * 0.5;
      const heightFactor = Math.pow(distFromCenter, 1.4) * 2.8 - y * 0.25;
      const z = (ridge * 0.6 + heightFactor) * 0.9;
      posAttr.setZ(i, z);
    }
    terrainGeo.computeVertexNormals();

    const terrainMat = new THREE.MeshStandardMaterial({
      color: 0x0e0d0f,
      roughness: 0.85,
      metalness: 0.35,
      flatShading: true,
    });
    const terrainMesh = new THREE.Mesh(terrainGeo, terrainMat);
    terrainMesh.rotation.x = -Math.PI / 2.3;
    terrainMesh.position.set(0, -4.5, -1);
    terrainMesh.receiveShadow = true;
    terrainGroup.add(terrainMesh);

    const wireGeo = new THREE.WireframeGeometry(terrainGeo);
    const wireMat = new THREE.LineBasicMaterial({
      color: 0x6e5225,
      transparent: true,
      opacity: 0.22,
    });
    const wireMesh = new THREE.LineSegments(wireGeo, wireMat);
    wireMesh.rotation.x = -Math.PI / 2.3;
    wireMesh.position.set(0, -4.48, -1);
    terrainGroup.add(wireMesh);

    scene.add(terrainGroup);

    // --- 2. FLOATING OBJECT 1: 3D DOCUMENT STACK ---
    const docGroup = new THREE.Group();
    docGroup.position.set(-4.5, -1.2, 0);

    const docPedestal = new THREE.Mesh(
      new THREE.CylinderGeometry(1.6, 1.9, 0.25, 32),
      darkObsidianMaterial
    );
    docPedestal.receiveShadow = true;
    docGroup.add(docPedestal);

    const docPedestalRing = new THREE.Mesh(
      new THREE.TorusGeometry(1.7, 0.03, 16, 64),
      goldMaterial
    );
    docPedestalRing.rotation.x = Math.PI / 2;
    docPedestalRing.position.y = 0.12;
    docGroup.add(docPedestalRing);

    const docSheets: THREE.Group[] = [];
    for (let i = 0; i < 3; i++) {
      const sheetGroup = new THREE.Group();
      const sheetGeo = new THREE.BoxGeometry(1.5, 2.1, 0.04);
      const sheetMesh = new THREE.Mesh(sheetGeo, glassMaterial);
      sheetMesh.castShadow = true;
      sheetGroup.add(sheetMesh);

      const edges = new THREE.EdgesGeometry(sheetGeo);
      const edgeLine = new THREE.LineSegments(edges, glowEdgeMaterial);
      sheetGroup.add(edgeLine);

      for (let l = 0; l < 4; l++) {
        const barGeo = new THREE.BoxGeometry(0.9 - l * 0.12, 0.06, 0.05);
        const barMesh = new THREE.Mesh(barGeo, goldMaterial);
        barMesh.position.set(-0.1 + (l % 2) * 0.05, 0.5 - l * 0.32, 0.01);
        sheetGroup.add(barMesh);
      }

      const dot = new THREE.Mesh(
        new THREE.CylinderGeometry(0.1, 0.1, 0.06, 16),
        goldMaterial
      );
      dot.rotation.x = Math.PI / 2;
      dot.position.set(-0.45, -0.7, 0.02);
      sheetGroup.add(dot);

      sheetGroup.position.set(i * 0.2 - 0.2, 0.9 + i * 0.28, -i * 0.25);
      sheetGroup.rotation.set(-0.25, 0.35 + i * 0.08, -0.1);
      docGroup.add(sheetGroup);
      docSheets.push(sheetGroup);
    }
    scene.add(docGroup);

    // --- 3. FLOATING OBJECT 2: SHA-256 FINGERPRINT & CRYPTOGRAPHIC CORE ---
    const hashGroup = new THREE.Group();
    hashGroup.position.set(0, -0.8, 0.6);

    const hashPedestal = new THREE.Mesh(
      new THREE.CylinderGeometry(1.8, 2.1, 0.3, 8),
      darkObsidianMaterial
    );
    hashPedestal.receiveShadow = true;
    hashGroup.add(hashPedestal);

    const hashRing1 = new THREE.Mesh(
      new THREE.TorusGeometry(1.95, 0.035, 16, 8),
      goldMaterial
    );
    hashRing1.rotation.x = Math.PI / 2;
    hashRing1.position.y = 0.15;
    hashGroup.add(hashRing1);

    const gimbal1 = new THREE.Mesh(
      new THREE.TorusGeometry(1.5, 0.03, 16, 64),
      goldMaterial
    );
    gimbal1.rotation.x = 0.6;
    hashGroup.add(gimbal1);

    const gimbal2 = new THREE.Mesh(
      new THREE.TorusGeometry(1.35, 0.025, 16, 64),
      goldMaterial
    );
    gimbal2.rotation.y = 0.8;
    hashGroup.add(gimbal2);

    const coreGeo = new THREE.OctahedronGeometry(0.85, 0);
    const coreMesh = new THREE.Mesh(
      coreGeo,
      new THREE.MeshStandardMaterial({
        color: 0xffdf88,
        metalness: 0.9,
        roughness: 0.15,
        emissive: 0xd4af37,
        emissiveIntensity: 0.55,
      })
    );
    coreMesh.castShadow = true;
    coreMesh.position.y = 1.25;
    hashGroup.add(coreMesh);

    const coreEdges = new THREE.EdgesGeometry(coreGeo);
    const coreLine = new THREE.LineSegments(
      coreEdges,
      new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 })
    );
    coreLine.position.y = 1.25;
    hashGroup.add(coreLine);

    const fpGroup = new THREE.Group();
    fpGroup.position.y = 1.25;
    for (let r = 0; r < 4; r++) {
      const arcLength = Math.PI * (1.1 + r * 0.18);
      const ringGeo = new THREE.TorusGeometry(
        0.35 + r * 0.22,
        0.02,
        12,
        32,
        arcLength
      );
      const ringMesh = new THREE.Mesh(ringGeo, goldMaterial);
      ringMesh.rotation.z = r * 0.7;
      fpGroup.add(ringMesh);
    }
    hashGroup.add(fpGroup);
    scene.add(hashGroup);

    // --- 4. FLOATING OBJECT 3: HASH-LINKED LEDGER BLOCKS ---
    const ledgerGroup = new THREE.Group();
    ledgerGroup.position.set(4.5, -1.2, 0);

    const ledgerPedestal = new THREE.Mesh(
      new THREE.CylinderGeometry(1.6, 1.9, 0.25, 32),
      darkObsidianMaterial
    );
    ledgerPedestal.receiveShadow = true;
    ledgerGroup.add(ledgerPedestal);

    const ledgerPedRing = new THREE.Mesh(
      new THREE.TorusGeometry(1.7, 0.03, 16, 64),
      goldMaterial
    );
    ledgerPedRing.rotation.x = Math.PI / 2;
    ledgerPedRing.position.y = 0.12;
    ledgerGroup.add(ledgerPedRing);

    const blocks: THREE.Group[] = [];
    for (let b = 0; b < 3; b++) {
      const blockGroup = new THREE.Group();
      const boxGeo = new THREE.BoxGeometry(0.9, 0.9, 0.9);
      const isGold = b === 1;
      const boxMesh = new THREE.Mesh(
        boxGeo,
        isGold ? goldMaterial : glassMaterial
      );
      boxMesh.castShadow = true;
      boxMesh.receiveShadow = true;
      blockGroup.add(boxMesh);

      const edges = new THREE.EdgesGeometry(boxGeo);
      const line = new THREE.LineSegments(edges, glowEdgeMaterial);
      blockGroup.add(line);

      if (isGold) {
        const lockArch = new THREE.Mesh(
          new THREE.TorusGeometry(0.18, 0.04, 16, 16, Math.PI),
          darkObsidianMaterial
        );
        lockArch.position.set(0, 0.12, 0.46);
        blockGroup.add(lockArch);
        const lockBody = new THREE.Mesh(
          new THREE.BoxGeometry(0.3, 0.25, 0.08),
          darkObsidianMaterial
        );
        lockBody.position.set(0, -0.08, 0.46);
        blockGroup.add(lockBody);
      } else {
        const plate = new THREE.Mesh(
          new THREE.BoxGeometry(0.5, 0.18, 0.02),
          goldMaterial
        );
        plate.position.set(0, 0, 0.46);
        blockGroup.add(plate);
      }

      blockGroup.position.set(
        (b - 1) * 0.95,
        0.95 + b * 0.28,
        (b - 1) * 0.35
      );
      blockGroup.rotation.set(0.35, -0.45 + b * 0.2, 0.15);
      ledgerGroup.add(blockGroup);
      blocks.push(blockGroup);
    }

    const linkBeamGeo = new THREE.CylinderGeometry(0.02, 0.02, 2.2, 16);
    const linkBeamMat = new THREE.MeshBasicMaterial({ color: 0xffdf88 });
    const linkBeam = new THREE.Mesh(linkBeamGeo, linkBeamMat);
    linkBeam.rotation.z = Math.PI / 2.7;
    linkBeam.position.set(0, 1.25, 0);
    ledgerGroup.add(linkBeam);

    scene.add(ledgerGroup);

    // --- 5. CONNECTING BEAMS & PULSES ---
    const pathMaterial = new THREE.LineDashedMaterial({
      color: 0xd4af37,
      dashSize: 0.3,
      gapSize: 0.15,
      linewidth: 2,
      transparent: true,
      opacity: 0.65,
    });

    const createConnectingCurve = (p1: THREE.Vector3, p2: THREE.Vector3) => {
      const curve = new THREE.QuadraticBezierCurve3(
        p1,
        new THREE.Vector3(
          (p1.x + p2.x) * 0.5,
          p1.y + 0.35,
          (p1.z + p2.z) * 0.5
        ),
        p2
      );
      const points = curve.getPoints(40);
      const geo = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(geo, pathMaterial);
      line.computeLineDistances();
      return line;
    };

    const path1 = createConnectingCurve(
      new THREE.Vector3(-4.5, -0.9, 0),
      new THREE.Vector3(0, -0.5, 0.6)
    );
    scene.add(path1);

    const path2 = createConnectingCurve(
      new THREE.Vector3(0, -0.5, 0.6),
      new THREE.Vector3(4.5, -0.9, 0)
    );
    scene.add(path2);

    const pulseGeo = new THREE.SphereGeometry(0.08, 16, 16);
    const pulseMat = new THREE.MeshBasicMaterial({ color: 0xfff0b0 });
    const pulse1 = new THREE.Mesh(pulseGeo, pulseMat);
    const pulse2 = new THREE.Mesh(pulseGeo, pulseMat);
    scene.add(pulse1);
    scene.add(pulse2);

    // --- 6. FLOATING 3D CTA ELEMENT ---
    const ctaGroup = new THREE.Group();
    ctaGroup.position.set(0, 0.85, 1.2);

    const ctaBaseGeo = new THREE.BoxGeometry(3.2, 0.72, 0.28);
    const ctaBaseMat = new THREE.MeshStandardMaterial({
      color: 0x1f1b16,
      metalness: 0.85,
      roughness: 0.25,
      emissive: 0x241a08,
      emissiveIntensity: 0.4,
    });
    const ctaMesh = new THREE.Mesh(ctaBaseGeo, ctaBaseMat);
    ctaMesh.castShadow = true;
    ctaGroup.add(ctaMesh);

    const ctaEdges = new THREE.EdgesGeometry(ctaBaseGeo);
    const ctaBorder = new THREE.LineSegments(
      ctaEdges,
      new THREE.LineBasicMaterial({ color: 0xd4af37, linewidth: 2 })
    );
    ctaGroup.add(ctaBorder);

    const arrowShaft = new THREE.Mesh(
      new THREE.BoxGeometry(0.35, 0.05, 0.08),
      goldMaterial
    );
    arrowShaft.position.set(0.95, 0, 0.16);
    ctaGroup.add(arrowShaft);

    const arrowHead = new THREE.Mesh(
      new THREE.ConeGeometry(0.12, 0.2, 3),
      goldMaterial
    );
    arrowHead.rotation.z = -Math.PI / 2;
    arrowHead.position.set(1.18, 0, 0.16);
    ctaGroup.add(arrowHead);

    scene.add(ctaGroup);

    // --- 7. AMBIENT PARTICLES ---
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 22;
      particlePos[i + 1] = (Math.random() - 0.5) * 12 + 1;
      particlePos[i + 2] = (Math.random() - 0.5) * 14;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xd4af37,
      size: 0.07,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Mouse tracking
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.targetY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Click handler for 3D CTA
    const raycaster = new THREE.Raycaster();
    const mouseCoord = new THREE.Vector2();
    const handleClick = (e: MouseEvent) => {
      mouseCoord.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseCoord.y = -(e.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouseCoord, camera);
      const intersects = raycaster.intersectObjects([
        ctaMesh,
        arrowShaft,
        arrowHead,
      ]);
      if (intersects.length > 0) {
        ctaGroup.scale.set(0.92, 0.92, 0.92);
        setTimeout(() => {
          onAccessPlatform();
        }, 180);
      }
    };
    window.addEventListener('click', handleClick);

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Initial positioning for animation
    terrainGroup.position.y = -10;
    docGroup.position.y = -6;
    docGroup.scale.set(0.01, 0.01, 0.01);

    hashGroup.position.y = -6;
    hashGroup.scale.set(0.01, 0.01, 0.01);

    ledgerGroup.position.y = -6;
    ledgerGroup.scale.set(0.01, 0.01, 0.01);

    ctaGroup.scale.set(0.01, 0.01, 0.01);
    ctaGroup.position.y = -2;

    const startTime = performance.now();

    // --- ANIMATION LOOP ---
    const animate = (currentTime: number) => {
      animFrameId = requestAnimationFrame(animate);

      const elapsed = (currentTime - startTime) * 0.001;

      // Mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      camera.position.x = mouse.x * 1.2;
      camera.position.y = 1.5 + mouse.y * 0.6;
      camera.lookAt(0, 0.2, 0);

      // Entrance animation progression
      if (elapsed > 0.2 && elapsed < 2.0) {
        const tProgress = Math.min(1, (elapsed - 0.2) / 1.4);
        const ease = 1 - Math.pow(1 - tProgress, 3);
        terrainGroup.position.y = -10 + ease * 10;
      } else if (elapsed >= 2.0) {
        terrainGroup.position.y = 0;
      }

      if (elapsed > 0.8 && elapsed < 2.4) {
        const dProgress = Math.min(1, (elapsed - 0.8) / 1.2);
        const ease = 1 - Math.pow(1 - dProgress, 3);
        docGroup.position.y = -6 + ease * 4.8;
        const s = 0.01 + ease * 0.99;
        docGroup.scale.set(s, s, s);
        if (dProgress > 0.6 && onStageChange) onStageChange('documents');
      } else if (elapsed >= 2.4) {
        docGroup.position.y = -1.2;
        docGroup.scale.set(1, 1, 1);
      }

      if (elapsed > 1.4 && elapsed < 3.0) {
        const hProgress = Math.min(1, (elapsed - 1.4) / 1.2);
        const ease = 1 - Math.pow(1 - hProgress, 3);
        hashGroup.position.y = -6 + ease * 5.2;
        const s = 0.01 + ease * 0.99;
        hashGroup.scale.set(s, s, s);
        if (hProgress > 0.6 && onStageChange) onStageChange('fingerprint');
      } else if (elapsed >= 3.0) {
        hashGroup.position.y = -0.8;
        hashGroup.scale.set(1, 1, 1);
      }

      if (elapsed > 2.0 && elapsed < 3.6) {
        const lProgress = Math.min(1, (elapsed - 2.0) / 1.2);
        const ease = 1 - Math.pow(1 - lProgress, 3);
        ledgerGroup.position.y = -6 + ease * 4.8;
        const s = 0.01 + ease * 0.99;
        ledgerGroup.scale.set(s, s, s);
        if (lProgress > 0.6 && onStageChange) onStageChange('ledger');
      } else if (elapsed >= 3.6) {
        ledgerGroup.position.y = -1.2;
        ledgerGroup.scale.set(1, 1, 1);
      }

      if (elapsed > 2.8 && elapsed < 4.2) {
        const cProgress = Math.min(1, (elapsed - 2.8) / 1.0);
        const ease = 1 - Math.pow(1 - cProgress, 3);
        ctaGroup.position.y = -2 + ease * 2.85;
        const s = 0.01 + ease * 0.99;
        ctaGroup.scale.set(s, s, s);
        if (onStageChange) onStageChange('cta');
      } else if (elapsed >= 4.2) {
        ctaGroup.position.y = 0.85;
        ctaGroup.scale.set(1, 1, 1);
      }

      // Idle animations
      const t = elapsed;
      docGroup.position.y = -1.2 + Math.sin(t * 1.5) * 0.08;
      docSheets.forEach((s, idx) => {
        s.position.y = 0.9 + idx * 0.28 + Math.sin(t * 1.8 + idx * 1.2) * 0.04;
        s.rotation.z = -0.1 + Math.cos(t * 1.2 + idx) * 0.02;
      });

      hashGroup.position.y = -0.8 + Math.cos(t * 1.4) * 0.09;
      coreMesh.rotation.y = t * 0.6;
      coreMesh.rotation.x = t * 0.4;
      coreLine.rotation.y = t * 0.6;
      coreLine.rotation.x = t * 0.4;
      gimbal1.rotation.x = 0.6 + Math.sin(t * 1.2) * 0.2;
      gimbal1.rotation.y = t * 0.4;
      gimbal2.rotation.y = 0.8 + Math.cos(t * 1.1) * 0.2;
      gimbal2.rotation.z = t * 0.3;
      fpGroup.rotation.z = t * 0.15;

      ledgerGroup.position.y = -1.2 + Math.sin(t * 1.6 + 1.0) * 0.08;
      blocks.forEach((b, idx) => {
        b.position.y = 0.95 + idx * 0.28 + Math.sin(t * 2.0 + idx * 0.8) * 0.05;
        b.rotation.y = -0.45 + idx * 0.2 + Math.cos(t * 1.5 + idx) * 0.06;
      });

      ctaGroup.position.y = 0.85 + Math.sin(t * 1.8) * 0.05;
      ctaGroup.rotation.x = mouse.y * 0.08;
      ctaGroup.rotation.y = mouse.x * 0.12;

      const p1Frac = (t * 0.8) % 1.0;
      pulse1.position.lerpVectors(
        new THREE.Vector3(-4.5, -0.9, 0),
        new THREE.Vector3(0, -0.5, 0.6),
        p1Frac
      );
      pulse1.position.y += Math.sin(p1Frac * Math.PI) * 0.35;

      const p2Frac = (t * 0.8 + 0.5) % 1.0;
      pulse2.position.lerpVectors(
        new THREE.Vector3(0, -0.5, 0.6),
        new THREE.Vector3(4.5, -0.9, 0),
        p2Frac
      );
      pulse2.position.y += Math.sin(p2Frac * Math.PI) * 0.35;

      particles.rotation.y = t * 0.02;

      renderer.render(scene, camera);
    };

    animFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [onAccessPlatform, onStageChange]);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full bg-transparent pointer-events-auto z-0"
    />
  );
};
