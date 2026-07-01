# 3D models

Drop a converted trophy here as **`trophy.glb`**:

```
public/models/trophy.glb
```

The hero loads it automatically (`components/three/TrophyGLB.tsx`). Until the
file exists, the scene falls back to the built-in procedural trophy — nothing
breaks. It's auto-centred and auto-scaled, so you don't need to match units.

## Converting the free3d model → glb

free3d gives you `.dae / .blend / .obj / .fbx`. three.js needs `.glb`. Pick one:

### Option A — Blender (recommended, keeps materials)

1. Download the **`.blend`** file and unzip it.
2. Open it in [Blender](https://www.blender.org) (free).
3. `File → Export → glTF 2.0 (.glb)`.
4. In the export panel (right side): **Format = glbBinary**, tick **Apply
   Modifiers**, and under **Compression** enable **Draco** (optional — shrinks
   the file; useGLTF decodes it automatically).
5. Save as `trophy.glb` into this folder.

### Option B — no Blender, use the CLI on the .glb/.gltf

If you already have a `.gltf`/`.glb` (or export an uncompressed one), optimise it:

```bash
npx @gltf-transform/cli optimize input.glb public/models/trophy.glb --texture-compress webp
```

### Option C — online converter

Upload the `.obj` or `.fbx` to an obj→glb / fbx→glb converter, download the
`.glb`, and save it here as `trophy.glb`. (Quality varies; Option A is best.)

## Tuning after it loads

- Wrong size? It's normalised to a target height — change `TARGET_HEIGHT` in
  `components/three/TrophyGLB.tsx`.
- Wrong resting angle? Adjust the `<group>` rotation there, or `baseY`/`turns`
  passed to `useScrollSpin`.

## ⚠️ Licence

The free3d model is under a **Personal Use License**. That's fine for a
demo/portfolio, but **not** for a real commercial client site — you'd need a
model with a commercial licence (or commission one).
