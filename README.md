# Inside a CT scanner

**An interactive educational prototype by [@danrudy33](https://github.com/danrudy33), built with Hermes Agent and Ryan’s MIT-licensed Anatomy kit.**

## [Open the live CT scanner →](https://danrudy33.github.io/ct-scanner-anatomy/)

Rotate the scanner, reveal its systems, explode the tube and detector subassemblies, and watch a real calculated axial reconstruction form from simulated fan-beam measurements. Component names have connector lines directly in the opened image.

- **Drag / arrow keys:** orbit the machine; **Home:** reset the view.
- **Reveal systems / Explode:** open major assemblies and tube/detector internals; **E** toggles the teardown.
- **Scan phantom / Space:** compute or interrupt the scan. **View axial reconstruction** jumps to the reference, sinogram and reconstruction panels.
- **Light / dark:** both themes are included. Reduced motion uses static states and a computed static axial result.

[Browse Ryan’s Anatomy community museum →](https://skills.wheresryan.sh/anatomy/community)

## What is actually computed?

**Axial mode is real numerical computation, not a pre-rendered image.** Analytic line integrals through a geometric phantom populate a divergent fan-beam sinogram. Rebinning produces parallel-ray coordinates; Ram-Lak ramp filtering and filtered back-projection reconstruct an ideal 2D slice. The reference and reconstruction are shown together.

**Helical mode currently demonstrates gantry/table motion only. It does NOT acquire helical measurements or reconstruct a volume.** A future revision may add genuine longitudinal acquisition and reconstruction; that is not promised by this release.

## Important limitations

This is **not clinical software, a vendor CAD model, an HU/dose simulator or a fully visually validated renderer**. See [KNOWN-LIMITATIONS.md](KNOWN-LIMITATIONS.md).

- Automatic rendering-continuity warnings remain unresolved. Visual artifacts may occur during rotation/opening. They have not been reclassified as harmless or cleared simply to publish.
- Physical geometry is schematic: hardware is enlarged; planar jaws specify central-ray collimation, which narrows toward fan edges; 13 faceted visual detector modules approximate an ideal circular numerical projector.
- Amber rays are superimposed teaching guides, not visible radiation or an occlusion simulation.
- Callout lines identify component positions. Some targets can be hidden by other hardware: orbit to expose them. Phone labels are small and crowded; browser emulation is not physical-device certification.
- The purple object is an **imaging phantom — a test object, not part of the scanner**.

## Build and test

Node 22 or newer; no application dependencies, downloads, accounts or inference are needed:

```sh
npm test
npm run build
npm run verify
```

Open `docs/index.html` locally, or either standalone theme under `docs/`. `npm run verify` rebuilds twice and requires identical output and identical packed scene geometry in both themes. Browser and geometry acceptance are distinct from the unresolved visual-continuity gate.

The gallery payload is only `figures/danrudy33/ct-scanner/`; built pages there are ignored. The public source vendors the small required Anatomy modules with reviewed CT-specific materials and renderer/audit corrections. No shared/installed skill modification is necessary. The payload’s `skill` metadata records the original published Anatomy base; the vendored CT changes are explicit source in this repository, not claimed to be that unmodified kit.

## Truth sheet / provenance

Geometry uses centimetres and world X as the horizontal patient axis (world Z stays up). The nominal generic scanner uses a 70 cm bore, 50 cm scan FOV, source-to-isocentre 54 cm and source-to-detector 95 cm. Those distance values follow the system-architecture study PMC7017544; rotation context follows PMC10644676 / PMC2780825. Pitch means table feed per rotation divided by collimated beam width (PMC8356941). Tube g-load is computed from angular speed and radius; comparison context is PMC3958932. Housing/jaw/window/filter dimensions are explicitly teaching choices, not vendor specifications.

The visible configuration is 64 × 0.625 mm = 40 mm central-ray collimation. Motion is slowed 8× for inspection; both table and gantry are slowed together. See the pure model for the actual formulas.

## Credits and license

- Figure direction and publication: **danrudy33**.
- Implemented/reviewed with **Hermes Agent** using **GPT-6.1 Sol**, with initial work using Claude Opus 5.5. This is not an endorsement by the model providers.
- Original Anatomy skill and rendering kit: **Ryan / wheresryan22**, MIT. See [LICENSE](LICENSE); the original notice is retained in the figure payload’s `src/LICENSE.txt`.
- Figure/adaptations: MIT. Please retain attribution when sharing.

Gallery admission is a separate maintainer/CI process; this repository’s existence does not imply the figure has already been accepted or listed there.
