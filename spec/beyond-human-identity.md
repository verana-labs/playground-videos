# Beyond human identity: who uses verifiable credentials, and for what

Government ID wallets (see [enabled-countries.md](./enabled-countries.md)) are only half
the verifiable-credential story. This file maps the sectors that already use credentials
in production beyond citizen identity, with real deployments separated from pilots.

Compiled: August 2026.

## Sector map

| Sector | Who | What the credential does | Format / status |
|---|---|---|---|
| Agentic commerce | Google AP2 + 60+ partners (Mastercard, Visa, PayPal, Amex, Coinbase, Salesforce), donated to the FIDO Alliance in May 2026 | Intent Mandates and Cart Mandates are W3C Verifiable Credentials: cryptographic proof of what the user authorized their AI agent to buy, including "human not present" purchases | W3C VC; spec live, first production integrations rolling out through FIDO's Agentic Authentication and Payments working groups (chaired by Mastercard and Visa) |
| Workforce / employment | Microsoft Entra Verified ID, used by LinkedIn workplace verification (tens of millions of verified profiles), NHS trusts for clinician onboarding, enterprise employee verification; Velocity Network (HR vendors: HireRight, Cisive, Cornerstone) | Employer-issued proof of employment, staff onboarding without re-vetting, portable career records | W3C VC; production since 2022-2023, LinkedIn is the largest single VC deployment by holder count |
| Education | Open Badges 3.0 (1EdTech) is now VC-native; MIT-led Digital Credentials Consortium universities issue degrees as VCs; EBSI cross-border diploma exchange in the EU | Tamper-proof diplomas, micro-credentials, cross-border recognition of qualifications | W3C VC / Open Badges 3.0; production issuance, verification network still thin |
| Organizational identity & finance | GLEIF vLEI with Qualified vLEI Issuers; organizational credentials entering eIDAS 2.0 business wallets | Verifiable Legal Entity Identifiers: who signs for a company, role credentials for regulatory filings and KYB reuse | KERI/ACDC; production issuance since 2022, volumes still small; the organizational-credential wave rides eIDAS |
| Healthcare | SMART Health Cards: CDC-aligned state registries, CVS/Walgreens, Apple Wallet | Immunization records and lab results as signed, holder-presented credentials | W3C VC (JWS profile); hundreds of millions issued during COVID, still live for immunization records |
| Travel | India's Digi Yatra (14M+ users, 24+ airports), ICAO Digital Travel Credential pilots (Finland, Netherlands, Aruba), IATA One ID | Wallet-held travel identity for airport processing, seamless border and boarding flows | VC-based (Digi Yatra production); DTC pilots converging with EUDI travel use cases |
| Supply chain & trade | Catena-X automotive network (BMW, Mercedes-Benz, Bosch), UN Transparency Protocol (Australian agriculture, critical minerals), Singapore TradeTrust electronic bills of lading, GS1 licence credentials | Company identity between suppliers, ESG and sustainability claims that survive resale, legally valid electronic trade documents, authoritative product identifiers | W3C VC; Catena-X and TradeTrust in production, UNTP scaling through 2026, EU Digital Product Passport (battery mandate Feb 2027) is the forcing function |
| Age assurance | Google Wallet ZK age verification (Bumble, Uber), EU age-verification mini-wallet piloted in 5 member states, UK Online Safety Act and Australia's under-16 social media law as demand drivers | Prove "over 18 / under 16" without revealing identity | mdoc + ZK proofs; production on Google Wallet, regulation-driven scaling now |
| Content authenticity | C2PA Content Credentials (Adobe, Leica, TikTok, YouTube labels); the CAWG identity assertion binds creator identity via VCs | Provenance of images and video, "who made this" in the deepfake era | C2PA manifests + VC identity assertions; production labeling, identity layer early |

## Reading

Every sector converged on the same three-step evolution: first signed documents, then
wallet-held credentials, and then each one hits the identical wall: any issuer can sign a
syntactically valid credential, so who says this issuer is legitimate, this verifier is
authorized, this agent's mandate chain is anchored to an accountable party?

AP2 is the cleanest example: the mandate is a W3C VC, but AP2 explicitly leaves "is this
agent or merchant trustworthy" to out-of-band trust infrastructure, which is why FIDO
spun up an agentic-trust working group at all. The same gap shows up in workforce (anyone
can claim to be an employer-issuer), education (diploma mills with valid signatures),
supply chain (self-asserted ESG claims), and healthcare.

The trust-registry layer is the one component none of these ecosystems ships. The
agentic-commerce row is arriving on Verana's exact timeline, with the largest payment
networks behind it.

## Sources

- [Google Cloud: Announcing Agent Payments Protocol (AP2)](https://cloud.google.com/blog/products/ai-machine-learning/announcing-agents-to-payments-ap2-protocol)
- [Google: AP2 donated to the FIDO Alliance](https://blog.google/products-and-platforms/platforms/google-pay/agent-payments-protocol-fido-alliance/)
- [FIDO Alliance: standards for trusted AI agent interactions](https://fidoalliance.org/fido-alliance-to-develop-standards-for-trusted-ai-agent-interactions/)
- [AP2 protocol explained (2026)](https://eco.com/support/en/articles/15192002-ap2-protocol-explained-google-s-agentic-commerce-standard-2026)
- [Sixty organizations joined Google's AP2 donation to FIDO](https://nohacks.co/blog/agent-payments-protocol-60-organizations)
