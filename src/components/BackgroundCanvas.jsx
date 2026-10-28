import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

function buildAuraLogoGeometry() {
  const shapeOuter = new THREE.Shape();
  shapeOuter.moveTo(-40, -45);
  shapeOuter.lineTo(0, 48);
  shapeOuter.lineTo(40, -45);
  shapeOuter.lineTo(22, -45);
  shapeOuter.lineTo(0, 2);
  shapeOuter.lineTo(-22, -45);
  shapeOuter.closePath();

  const shapeInner = new THREE.Shape();
  shapeInner.moveTo(0, 18);
  shapeInner.lineTo(14, -14);
  shapeInner.lineTo(-14, -14);
  shapeInner.closePath();

  const geom = new THREE.ExtrudeGeometry([shapeOuter, shapeInner], {
    depth: 14,
    bevelEnabled: true,
    bevelThickness: 2.2,
    bevelSize: 1.4,
    bevelSegments: 4,
    curveSegments: 2
  });
  geom.center();
  return geom;
}

// Warm Ivory + Champagne + Walnut Palette (Dark Smoked Architecture Canvas)
const THEME_3D_COLORS = {
  walnut: { fog: 0x141210, floor: 0x1f1a16, wall: 0x181411, accent: 0xD6C2A5, light: 0xfff6ea, louver: 0x795B43, beam: 0x4a3728 },
  monochrome: { fog: 0x07080a, floor: 0x0c0e12, wall: 0x111318, accent: 0xe2e8f0, light: 0xffffff, louver: 0x272a33, beam: 0x1f222b },
  cyan: { fog: 0x04090e, floor: 0x071118, wall: 0x0c1b26, accent: 0x00e5ff, light: 0xe0faff, louver: 0x133042, beam: 0x0e202c },
  cobalt: { fog: 0x050812, floor: 0x080e1e, wall: 0x0e1730, accent: 0x38bdf8, light: 0xbae6fd, louver: 0x172548, beam: 0x121b36 },
  crimson: { fog: 0x090607, floor: 0x12080a, wall: 0x1c0d11, accent: 0xf43f5e, light: 0xffe4e6, louver: 0x3b141d, beam: 0x2b0e14 }
};

// Cubic easing for camera keyframe interpolation
const easeCubic = t => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

const STEP_DIST = 7.5;
const START_Z = -8;
const WALL_HEIGHT = 5.4;
const WALL_WIDTH = 4.4;

function calculateKeyframes(count, isMobile) {
  const keys = [
    // Banner / Hero keyframe: centered view looking straight down the illuminated architectural hallway
    isMobile
      ? { pos: [0, 2.6, 14.5], look: [0, 0.5, 0] }
      : { pos: [-0.15, 2.3, 13.5], look: [0.15, 1.8, 0] },
    // Intro keyframe:
    { pos: [0, 1.8, 4.5], look: [0, 1.9, -14] }
  ];

  for (let r = 0; r < count; r++) {
    const side = r % 2 === 0 ? -1 : 1;
    const zPos = START_Z - r * STEP_DIST;
    keys.push(
      isMobile
        ? { pos: [-side * 0.4, 2.1, zPos + 7.2], look: [side * 1.6, 0.55, zPos] }
        : { pos: [-side * 1.4, 1.75, zPos + 4.6], look: [side * 1.3, 1.85, zPos] }
    );
  }

  const endZ = START_Z - (count - 1) * STEP_DIST - 11;
  keys.push({
    pos: [0, 2.6, endZ + (isMobile ? 13 : 10.5)],
    look: [0, 0.9, endZ]
  });

  return { keys, end: endZ };
}

export function BackgroundCanvas({ progressRef, items }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isMobile = window.innerWidth < 900;
    const { keys, end: endZ } = calculateKeyframes(items.length, isMobile);
    const hallwayStart = 16;
    const hallwayEnd = endZ - 6;
    const totalHallwayLength = hallwayStart - hallwayEnd;
    const hallwayMidZ = (hallwayStart + hallwayEnd) / 2;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
    } catch {
      return;
    }

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x141210, 10, isMobile ? 32 : 38);

    const camera = new THREE.PerspectiveCamera(
      isMobile ? 62 : 45,
      container.clientWidth / container.clientHeight,
      0.1,
      80
    );
    camera.position.set(...keys[0].pos);
    camera.lookAt(new THREE.Vector3(...keys[0].look));

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.setClearColor(0x141210, 1);
    container.appendChild(renderer.domElement);

    // Warm Architectural Ambient Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfffdfa, 1.0);
    dirLight.position.set(2, 10, 6);
    scene.add(dirLight);

    const heroPointLight = new THREE.PointLight(0xffffff, 16, 14);
    heroPointLight.position.set(0, 4.6, 3);
    scene.add(heroPointLight);

    const endPointLight = new THREE.PointLight(0xffffff, 16, 14);
    endPointLight.position.set(0, 4.6, endZ + 4);
    scene.add(endPointLight);

    const sideAccentLight = new THREE.PointLight(0xD6C2A5, 8, 16);
    sideAccentLight.position.set(-WALL_WIDTH + 1, 2.5, 4);
    scene.add(sideAccentLight);

    // 1. AURA 3D ARCHITECTURAL MONOGRAM SCULPTURE (Champagne & Walnut Bronze)
    const logoGeom = buildAuraLogoGeometry();
    const logoMatChampagne = new THREE.MeshPhysicalMaterial({
      color: 0xD6C2A5,
      metalness: 0.15,
      roughness: 0.35,
      clearcoat: 0.85,
      clearcoatRoughness: 0.1
    });
    const logoMatWalnut = new THREE.MeshPhysicalMaterial({
      color: 0x795B43,
      metalness: 0.8,
      roughness: 0.18
    });

    // Hero Floating Logo
    const heroLogoGroup = new THREE.Group();
    heroLogoGroup.position.set(0, 2.35, 0);

    const heroLogoMesh = new THREE.Mesh(logoGeom, [logoMatChampagne, logoMatWalnut]);
    heroLogoMesh.scale.set(0.04, 0.04, 0.04);
    heroLogoGroup.add(heroLogoMesh);
    scene.add(heroLogoGroup);

    // Finale Floating Logo at end of tunnel
    const finaleLogoGroup = new THREE.Group();
    finaleLogoGroup.position.set(0, 2.35, endZ);

    const finaleLogoMesh = new THREE.Mesh(logoGeom, [logoMatChampagne, logoMatWalnut]);
    finaleLogoMesh.scale.set(0.04, 0.04, 0.04);
    finaleLogoGroup.add(finaleLogoMesh);
    scene.add(finaleLogoGroup);

    // 2. CONCENTRIC WALNUT & CHAMPAGNE PORTAL RINGS
    function createFloorRings(zPos) {
      const group = new THREE.Group();
      group.position.set(0, 0.02, zPos);
      group.rotation.x = -Math.PI / 2;

      // Inner Walnut ring
      const innerGeom = new THREE.RingGeometry(2.05, 2.12, 96);
      const innerMat = new THREE.MeshBasicMaterial({ color: 0x795B43 });
      group.add(new THREE.Mesh(innerGeom, innerMat));

      // Outer Champagne aura ring
      const outerGeom = new THREE.RingGeometry(2.5, 2.52, 96);
      const outerMat = new THREE.MeshBasicMaterial({ color: 0xD6C2A5, transparent: true, opacity: 0.55 });
      group.add(new THREE.Mesh(outerGeom, outerMat));

      return group;
    }

    scene.add(createFloorRings(0));
    scene.add(createFloorRings(endZ));

    // 3. ARCHITECTURAL LUXURY CORRIDOR (Honed Travertine & American Walnut)
    const corridorGroup = new THREE.Group();

    // Honed French Limestone / Dark Smoked Travertine Floor
    const floorGeom = new THREE.PlaneGeometry(10.8, totalHallwayLength);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x1f1a16,
      roughness: 0.32,
      metalness: 0.2
    });
    const floor = new THREE.Mesh(floorGeom, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(0, 0, hallwayMidZ);
    corridorGroup.add(floor);

    // Left and Right Deep Smoked Architectural Walls
    const wallGeom = new THREE.PlaneGeometry(totalHallwayLength, WALL_HEIGHT);
    const wallMat = new THREE.MeshStandardMaterial({
      color: 0x181411,
      roughness: 0.95
    });

    const leftWall = new THREE.Mesh(wallGeom, wallMat);
    leftWall.position.set(-WALL_WIDTH, WALL_HEIGHT / 2, hallwayMidZ);
    leftWall.rotation.y = Math.PI / 2;
    corridorGroup.add(leftWall);

    const rightWall = new THREE.Mesh(wallGeom, wallMat);
    rightWall.position.set(WALL_WIDTH, WALL_HEIGHT / 2, hallwayMidZ);
    rightWall.rotation.y = -Math.PI / 2;
    corridorGroup.add(rightWall);

    // Warm Champagne Walnut Vertical Louvers
    const louverSpacing = isMobile ? 0.5 : 0.34;
    const louverCountPerSide = Math.floor(totalHallwayLength / louverSpacing);
    const louverBoxGeom = new THREE.BoxGeometry(0.14, WALL_HEIGHT, 0.17);
    const louverMat = new THREE.MeshStandardMaterial({
      color: 0x795B43,
      roughness: 0.55,
      metalness: 0.08
    });

    const louversMesh = new THREE.InstancedMesh(louverBoxGeom, louverMat, louverCountPerSide * 2);
    const dummy = new THREE.Matrix4();
    let instanceIndex = 0;

    for (const side of [-1, 1]) {
      for (let s = 0; s < louverCountPerSide; s++) {
        dummy.makeTranslation(side * WALL_WIDTH, WALL_HEIGHT / 2, hallwayStart - s * louverSpacing);
        louversMesh.setMatrixAt(instanceIndex++, dummy);
      }
    }
    louversMesh.instanceMatrix.needsUpdate = true;
    corridorGroup.add(louversMesh);

    // Warm Champagne Cove LED Strips
    const stripGeom = new THREE.BoxGeometry(0.035, 0.035, totalHallwayLength);
    const stripMat = new THREE.MeshBasicMaterial({ color: 0xD6C2A5 });

    for (const side of [-1, 1]) {
      for (const y of [0.04, WALL_HEIGHT - 0.04]) {
        const strip = new THREE.Mesh(stripGeom, stripMat);
        strip.position.set(side * (WALL_WIDTH - 0.12), y, hallwayMidZ);
        corridorGroup.add(strip);
      }
    }

    // Overhead Structural Walnut Beams with Recessed Downlights
    const beamBoxGeom = new THREE.BoxGeometry(9.2, 0.22, 0.45);
    const beamMat = new THREE.MeshStandardMaterial({ color: 0x5E4430, roughness: 0.65 });
    const beamLightGeom = new THREE.BoxGeometry(1.6, 0.02, 0.06);
    const beamLightMat = new THREE.MeshBasicMaterial({ color: 0xF5F0E8 });

    for (let z = hallwayStart - 3; z > hallwayEnd; z -= STEP_DIST) {
      const beamGroup = new THREE.Group();
      beamGroup.position.set(0, WALL_HEIGHT + 0.1, z);

      const beam = new THREE.Mesh(beamBoxGeom, beamMat);
      beamGroup.add(beam);

      const beamLight = new THREE.Mesh(beamLightGeom, beamLightMat);
      beamLight.position.set(0, -0.12, 0);
      beamGroup.add(beamLight);

      corridorGroup.add(beamGroup);
    }

    scene.add(corridorGroup);

    // 4. 3D FLOATING GALLERY FRAMES (American Walnut & Champagne)
    const textureLoader = new THREE.TextureLoader();
    const frameWidth = isMobile ? 3.0 : 4.2;
    const frameHeight = frameWidth / 1.5;

    items.forEach((item, idx) => {
      const side = idx % 2 === 0 ? -1 : 1;
      const zPos = START_Z - idx * STEP_DIST;

      const galleryFrameGroup = new THREE.Group();
      galleryFrameGroup.position.set(side * (isMobile ? 2.1 : 2.85), 2.05, zPos);
      galleryFrameGroup.rotation.y = -side * 0.62;

      // Outer Fluted American Walnut Frame
      const outerFrameGeom = new THREE.BoxGeometry(frameWidth + 0.26, frameHeight + 0.26, 0.14);
      const outerFrameMat = new THREE.MeshStandardMaterial({
        color: 0x795B43,
        metalness: 0.5,
        roughness: 0.35
      });
      const outerFrame = new THREE.Mesh(outerFrameGeom, outerFrameMat);
      outerFrame.position.z = -0.09;
      galleryFrameGroup.add(outerFrame);

      // Inset Deep Espresso Shadow Mat
      const matGeom = new THREE.PlaneGeometry(frameWidth + 0.06, frameHeight + 0.06);
      const matMaterial = new THREE.MeshBasicMaterial({ color: 0x292824 });
      const frameMatMesh = new THREE.Mesh(matGeom, matMaterial);
      frameMatMesh.position.z = -0.015;
      galleryFrameGroup.add(frameMatMesh);

      // Real High-Resolution Architecture Artwork
      const artGeom = new THREE.PlaneGeometry(frameWidth, frameHeight);
      const artMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      textureLoader.load(
        item.image,
        tex => {
          artMat.map = tex;
          artMat.needsUpdate = true;
        },
        undefined,
        () => {
          artMat.color.set(0xD6C2A5);
        }
      );
      const artMesh = new THREE.Mesh(artGeom, artMat);
      galleryFrameGroup.add(artMesh);

      // Champagne Picture Lamp
      const lampGeom = new THREE.BoxGeometry(frameWidth * 0.45, 0.05, 0.12);
      const lampMat = new THREE.MeshBasicMaterial({ color: 0xD6C2A5 });
      const lamp = new THREE.Mesh(lampGeom, lampMat);
      lamp.position.set(0, frameHeight / 2 + 0.34, 0.2);
      galleryFrameGroup.add(lamp);

      // Warm Gallery Art Spotlight
      const artLight = new THREE.PointLight(0xfff8f0, 3.8, 7);
      artLight.position.set(0, frameHeight / 2, 1.6);
      galleryFrameGroup.add(artLight);

      scene.add(galleryFrameGroup);
    });

    // 5. ATMOSPHERIC CHAMPAGNE DUST PARTICLES
    const particleCount = isMobile ? 80 : 180;
    const particleGeom = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 8;
      particlePositions[i * 3 + 1] = Math.random() * 4.5 + 0.5;
      particlePositions[i * 3 + 2] = hallwayStart - Math.random() * totalHallwayLength;
    }

    particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xD6C2A5,
      size: isMobile ? 0.08 : 0.12,
      transparent: true,
      opacity: 0.55,
      blending: THREE.NormalBlending
    });
    const particles = new THREE.Points(particleGeom, particleMat);
    scene.add(particles);

    // 6. MOUSE TRACKING & PARALLAX
    const pointer = { x: 0, y: 0 };
    const onPointerMove = e => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('pointermove', onPointerMove);

    // Apply active or saved theme to 3D scene
    const apply3DTheme = themeKey => {
      const c = THEME_3D_COLORS[themeKey] || THEME_3D_COLORS.walnut;
      scene.fog.color.set(c.fog);
      renderer.setClearColor(c.fog, 1);
      floorMat.color.set(c.floor);
      wallMat.color.set(c.wall);
      logoMatWalnut.color.set(c.accent);
      louverMat.color.set(c.louver);
      beamMat.color.set(c.beam);
      heroPointLight.color.set(c.light);
      endPointLight.color.set(c.light);
      sideAccentLight.color.set(c.accent);
      particles.material.color.set(c.accent);
    };

    const initialSavedTheme = localStorage.getItem('aura_theme') || 'walnut';
    apply3DTheme(initialSavedTheme);

    const onThemeEvent = e => {
      apply3DTheme(e.detail?.theme || 'walnut');
    };
    window.addEventListener('themechange', onThemeEvent);

    // 7. ANIMATION LOOP
    let animationFrameId;
    const clock = new THREE.Clock();
    const currentCamLook = new THREE.Vector3(...keys[0].look);
    const targetCamLook = new THREE.Vector3();
    const targetCamPos = new THREE.Vector3();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      particles.rotation.y = elapsed * 0.015;

      const p = progressRef.current || 0;
      const heroExit = Math.min(1, Math.max(0, (p * (keys.length - 1) - 0.05) / 1.05));

      heroLogoGroup.position.y = 2.35 + heroExit * 7;
      heroLogoGroup.rotation.y = -0.35 + pointer.x * 0.3 + heroExit * Math.PI * 1.4 + elapsed * 0.1;
      heroLogoGroup.rotation.x = -pointer.y * 0.12;

      finaleLogoGroup.rotation.y = pointer.x * 0.5 + Math.sin(elapsed * 0.4) * 0.3;

      const totalKeys = keys.length;
      const keyProgress = p * (totalKeys - 1);
      const keyIdx = Math.min(Math.floor(keyProgress), totalKeys - 2);
      const keyFraction = easeCubic(Math.min(1, keyProgress - keyIdx));

      const k1 = keys[keyIdx];
      const k2 = keys[keyIdx + 1];

      targetCamPos.set(
        THREE.MathUtils.lerp(k1.pos[0], k2.pos[0], keyFraction) + pointer.x * 0.4,
        THREE.MathUtils.lerp(k1.pos[1], k2.pos[1], keyFraction) + pointer.y * 0.22,
        THREE.MathUtils.lerp(k1.pos[2], k2.pos[2], keyFraction)
      );

      targetCamLook.set(
        THREE.MathUtils.lerp(k1.look[0], k2.look[0], keyFraction),
        THREE.MathUtils.lerp(k1.look[1], k2.look[1], keyFraction),
        THREE.MathUtils.lerp(k1.look[2], k2.look[2], keyFraction)
      );

      const dampFactor = 1 - Math.exp(-4.5 * 0.016);
      camera.position.lerp(targetCamPos, dampFactor);
      currentCamLook.lerp(targetCamLook, dampFactor);
      camera.lookAt(currentCamLook);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('themechange', onThemeEvent);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      logoGeom.dispose();
      logoMatChampagne.dispose();
      logoMatWalnut.dispose();
      floorGeom.dispose();
      floorMat.dispose();
      wallGeom.dispose();
      wallMat.dispose();
      louverBoxGeom.dispose();
      louverMat.dispose();
      stripGeom.dispose();
      stripMat.dispose();
      beamBoxGeom.dispose();
      beamMat.dispose();
      particleGeom.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, [items, progressRef]);

  return <div className="xp__canvas" ref={containerRef} />;
}
