# changelog

all notable changes to this project are documented here. the format is based on
[keep a changelog](https://keepachangelog.com/en/1.1.0/), and the project aims to
follow [semantic versioning](https://semver.org/spec/v2.0.0/).

## [1.0.0] - 2026-06-09

first tagged release: the existing training app, packaged as a verifiable,
self-hostable container behind a hardened release pipeline. the intentionally
vulnerable application behavior is unchanged.

### added

- published container image at `ghcr.io/sunnypatell/securebank-ctf`, built and
  released from ci for `linux/amd64`.
- slsa v1.0 build level 3 release pipeline: the build runs inside a reusable
  workflow (signing-identity isolation), and every image carries a
  sigstore-signed build-provenance attestation bound to its digest, verifiable
  with `gh attestation verify`.
- cyclonedx sbom generated from the published image, attached to each release as
  a downloadable asset and as a signed attestation.
- supply-chain scanning: an osv scan of the sbom at release time, and a
  `dependency-review` gate on every pull request.
- `docker-build` workflow that builds the amd64 image and boots it (http 200
  smoke test) on every relevant pull request and on main.
- `docker-compose.yml` for one-command self-hosting.
- `DISCLAIMER.md` covering authorized, non-production, educational use only.
- release assets: source tarball, image-digest manifest, and `checksums.txt`.

### changed

- aligned `frontend/package.json` to `1.0.0` to match the project version.
- replaced the disabled docker ci workflow (which only printed a build notice
  and exited non-zero) with the real `docker-build` verification above.

### known issues

- building the next.js app on arm64 (apple silicon, arm64 docker) crashes at
  build time with a v8 fatal error (crbug.com/1201626). the released image is
  therefore amd64-only; arm64 hosts can still run it under docker's runtime
  emulation. a multi-arch image is tracked for a future release.

[1.0.0]: https://github.com/sunnypatell/securebank-ctf/releases/tag/v1.0.0
