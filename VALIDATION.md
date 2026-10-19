# Validation scope — initial public prototype

## PR #67 review follow-up — October 19

- **32 public tests passed**, including new real-controller resting/active settings regressions and rejection of public development-only flags. Before the fix, those regressions reproduced 13 failures; existing active-interruption controls stayed green.
- **24 focused real-browser cases passed** across both themes and desktop/390-pixel phone widths: idle/revealed/apart/completed statuses, actual acquisition interruption, computed 360 fan views / 180 back-projections, 22 component labels, fixed note spacing, no overflow and clean consoles.
- Repeated hosted builds remain byte-identical and preserve the original packed scene hash. Only status logic, explanatory spacing and public build/debug handling changed; reconstruction and renderer/audit policy did not.
- The original audit-body comparison **FAILED**, quick targeted continuity run, exit 1; other turn categories were skipped. This remains a blocker, separate from the already disclosed browser pixel warnings. The original gallery CI success used the local audit variant, not stock-policy acceptance. See [AUDIT-PROVENANCE.md](figures/danrudy33/ct-scanner/src/AUDIT-PROVENANCE.md).

The initial-release receipts below are historical evidence for that original source, not replacement acceptance of this review blocker.

## Packaging checks actually executed

- Six included numerical tests passed: model/readouts, analytic and independently sampled projections, fan-to-parallel rebinning and filtered back-projection.
- Two complete builds of the three hosted pages produced identical bytes. Both themes and the hosting wrapper contain the unchanged reviewed packed scene (`ec24987aab48b9fdae7f5b305917fb730ae9adc8a08fdb85abbc3e7e747d3a97`).
- Unmodified first-party community schema, import, text-safety and AST checks passed on all 17 source files (508,865 bytes after the license-notice fix).
- The first-party validator also passed source layout, skill fingerprint, Node filesystem-permission build, two-build determinism, output, line-end and reduced-motion stillness checks in both themes. Its full geometry audit lane was explicitly skipped here; the reviewed scene/renderer is unchanged. This was NOT a Docker network-isolated run. Community CI still needs to run its own locked checks. Optional gallery-card generation fell back to its poster and is not claimed as a local pass.
- Every standalone HTML carries the complete MIT notice; verification asserts this. The licensing-only rebuild preserved every embedded executable script byte-for-byte.
- Forty real browser assertions passed across light/dark and desktop/390-pixel phone-width configurations on the packaged pages: reduced-motion reveal/explode, all 13/22 in-image callout names, readable non-overlapping label bounds, actual anchor movement, pointer/keyboard orbit, closing, 360 measured fan views, 180 back-projections and the native axial-panel jump/focus link. Browser console was clean in all four configurations.

## Earlier prototype engineering checks

The pre-packaging prototype had 58 deterministic tests passing and scoped full geometry/turn audit and browser checks. Independent source/physics/motion and sampled visual review accepted that engineering scope. These are separate from the six tests included in this minimal public package. Source vendoring/import relocation and the hosting wrapper do not purport to re-certify continuous-time rendering.

## Still NOT passed

Full-turn picture-continuity warnings remain unresolved in both themes. No physical phone/Safari certification, clinical validation, helical/cone-beam reconstruction or calibrated dose/HU claims are made. Read [KNOWN-LIMITATIONS.md](KNOWN-LIMITATIONS.md). Gallery submission/admission is a separate process.
