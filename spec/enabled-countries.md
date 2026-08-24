# Countries with credential wallets enabled by December 2026

Jurisdictions that are live now, or committed / legally mandated to be live by the end of
December 2026, with a wallet holding standards-based verifiable credentials (W3C VC,
SD-JWT VC, AnonCreds) or ISO 18013-5 mdoc. Pilots, betas, and announcements without a
committed date are kept out of the main table and listed in the watch-list below.

The main driver is the eIDAS 2.0 deadline of 24 December 2026, by which every EU member
state must offer at least one EUDI wallet to its citizens.

Compiled: August 2026.

## Enabled by 12/2026

| Continent | Country / Jurisdiction | Wallet | Status by 12/2026 | Formats |
|---|---|---|---|---|
| Europe | Italy | IT Wallet (IO app) | Live since Dec 2024 | SD-JWT VC, mdoc |
| Europe | Austria | eAusweise / Digitales Amt | Live (mDL since 2022); EUDI upgrade due | mdoc |
| Europe | United Kingdom | GOV.UK Wallet | Live (Veteran Card); mDL from summer 2026 | mdoc, W3C VC 2.0 |
| Europe | Remaining EU-24: Belgium, Bulgaria, Croatia, Cyprus, Czechia, Denmark, Estonia, Finland, France, Germany, Greece, Hungary, Ireland, Latvia, Lithuania, Luxembourg, Malta, Netherlands, Poland, Portugal, Romania, Slovakia, Slovenia, Spain, Sweden | National EUDI wallets | Legally mandated by 24 Dec 2026 | SD-JWT VC + mdoc (ARF) |
| Europe | Norway, Iceland, Liechtenstein (EEA) | EUDI-equivalent wallets | Follow eIDAS via EEA; small timing lag possible | SD-JWT VC + mdoc |
| Europe | Switzerland | swiyu | e-ID issuance scheduled from late 2026 | SD-JWT VC |
| Europe | Ukraine | Diia Wallet | EUDI-compatible documents targeted by end 2026, cross-border with EU | EUDI-aligned |
| Asia | Bhutan | NDI | Live since 2023 | W3C VC |
| Asia | Japan | My Number on smartphone | Live on iOS; Android lands in 2026 | mdoc |
| Asia | South Korea | Mobile resident registration card | Live nationwide since Mar 2025 | DID (domestic stack) |
| Americas | Peru | Peru Pass / DNId | Live (63M VCs, legal equivalence, open wallet ecosystem) | VC |
| Americas | United States (21+ states + PR, sub-national) | State mDLs via Apple/Google/Samsung/state apps | Live, expanding (incl. California scale-up) | mdoc |
| Americas | Canada (British Columbia, sub-national) | BC Wallet | Live | AnonCreds |
| Americas | Argentina (Buenos Aires + provinces, sub-national) | QuarkID via miBA | Live | W3C VC |
| Oceania | Australia (Queensland, sub-national) | QLD Digital Licence | Live statewide | mdoc |

## Watch-list (plausible but not committed for 12/2026)

- Taiwan: TW DIW pilot running since Dec 2025 (W3C VC), production date not fixed
- Moldova: EVO live at population scale, standards alignment in progress
- Bosnia and Herzegovina: national digital ID app, WE BUILD / EUDI alignment
- New Zealand: govt.nz wallet in preparation (age credential first)
- Australia (NSW): digital driving licence live, proprietary format migrating to mdoc
- Morocco, Ethiopia, Togo, Uganda, Philippines: production MOSIP ID rails at scale, no
  committed consumer VC-wallet date; Peru is their template

## Reading

Today there are 7 national production deployments (Italy, Austria, UK, Bhutan, Japan,
South Korea, Peru). On paper, 24 December 2026 takes that to 35+ countries (EU-27 + EEA +
UK + Switzerland + Ukraine + the Asian three + Peru), roughly 800 million people, on two
dominant rails: SD-JWT VC and mdoc. Realistically several EU states will slip into 2027
(as of April 2026 none of the remaining 24 had a certified wallet in production), but the
legal deadline concentrates launches around that date either way. None of these
deployments ships a cross-ecosystem trust layer: which issuers, which verifiers, under
whose accreditation. That is the gap Verana addresses.

## Sources

- [eIDasy: EU Digital Identity Wallet rollout status by member state (April 2026)](https://www.eideasy.com/blog/eu-digital-identity-wallets-status-april-2026)
- [Biometric Update: Peru gives digital ID equal legal status to physical credential](https://www.biometricupdate.com/202608/peru-gives-digital-id-equal-legal-status-to-physical-credential)
- [ID Tech: South Korea completes national digital ID rollout](https://idtechwire.com/south-korea-completes-national-digital-id-rollout-for-52-million-citizens/)
- [Biometric Update: Bhutan begins migrating self-sovereign digital ID to Ethereum](https://www.biometricupdate.com/202510/bhutan-begins-migrating-self-sovereign-digital-id-to-ethereum)
- [Biometric Update: UK prepares to roll out mDL in 2026](https://www.biometricupdate.com/202601/uk-touts-improvements-to-gov-uk-prepares-to-roll-out-mdl-in-2026)
- [GOV.UK Wallet: supported formats and protocols](https://docs.wallet.service.gov.uk/consuming-and-verifying-credentials/supported-protocols.html)
- [Credence ID: US mobile driver's license state tracker](https://credenceid.com/resources/blog/us-mobile-drivers-license-mdl-state-tracker/)
- [Biometric Update: Buenos Aires moves to decentralized digital identity with QuarkID](https://www.biometricupdate.com/202410/buenos-aires-moves-from-centralized-to-decentralized-digital-identity-with-quarkid)
- [MODA: Taiwan Digital Identity Wallet](https://moda.gov.tw/en/press/press-releases/15544)
- [e-Governance Academy: Ukraine at the Moldova Digital Summit 2026](https://ega.ee/ukraine-took-part-in-international-digital-identity-wallet-testing-at-the-moldova-digital-summit-2026/)
