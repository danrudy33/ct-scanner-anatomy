# Known limitations

This release is an educational prototype, not a clinical or fully visually certified simulator.

## Rendering

The standard automated full-turn picture-continuity checker still fails in both themes. The preserved original investigation tracked 65 hard alarms and 135 smaller observations; none was cleared. A later CT/white-cover run reported dark: 1 first-difference region and 36 large second-difference cores; light: 3 regions and 27 cores. The dark large-core count increased from 34; interval/count changes are unresolved, not assumed harmless. These counts are detector alarms, not a count of proven visible defects. One raster-phase false positive was demonstrated, not universal harmlessness.

Separate numerical geometry, sampled order/fidelity checks, motion regressions, actual browser interactions and independent sampled visual review passed their respective scopes. That does not establish continuous-time rendered-ink correctness. This release intentionally discloses the remaining gate rather than weakening its thresholds, deleting outlines or claiming all tests are green.

## Reconstruction and physics

- Computed ideal 2D axial fan-beam acquisition/rebinning/FBP only; no helical or cone-beam reconstruction, patient data, calibrated spectra, HU or dose.
- Helical table movement is an illustration only and explicitly labelled as such.
- Scanner dimensions mix sourced nominal parameters with enlarged schematic internals. Central-ray collimation is not uniform axial coverage at all fan angles.
- Guides and callouts are superimposed illustrations, not an occlusion/visibility proof; orbit to expose hidden targets.
- Phone-width browser checks are not physical iPhone/Safari certification. Phone callouts are small/crowded.

Future work can add genuine longitudinal/helical acquisition and reconstruction, improve callout ergonomics, and address demonstrated renderer defects. Publishing does not claim those upgrades already exist.
