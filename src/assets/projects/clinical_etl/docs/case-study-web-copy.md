# Structured Clinical Document Reasoning Platform
*Work in progress — independent project, 2026*

A hierarchy-aware, provenance-tracked reasoning graph for healthcare data — clinical documentation, billing and claims, and quality/registry reporting all reasoned over from one shared ontology, with both deterministic graph queries and vector/RAG-assisted natural-language querying available on top of it.

Clinical trial matching remains a core, fully-built-out application — it's the sharpest proof point of the reasoning engine, and where most of the domain depth (ontology, compositional model, ICD-O bridge) was first worked out. But it's one application among several the same graph and vector core supports, alongside billing integrity and hospital quality initiatives, not the ceiling of what the platform does.

---

## What's distinctive here

A quick highlight reel before the detail — the pieces of this architecture that go beyond standard practice in clinical NLP, not just competent implementation of it:

- **Compositional concept model** — body part and morphology compose into a diagnosis without either atom being erased, unlike the erasure pattern common in extraction pipelines.
- **ICD-O modeled as a bridge, not a dead end** — a queryable pivot between SNOMED and ICD-10-CM, reflecting a real structural relationship most systems leave as a flat, one-way lookup.
- **Vector similarity used for attachment resolution, not just retrieval** — determining *which body part a finding belongs to* when proximity in the text is unreliable, a harder and less-discussed problem than concept matching.
- **Bitemporal tracking on both clinical and billing data** — effective date vs. logged date, enabling both clinical-timeline and audit-style reasoning from the same graph.
- **A resolution-scope precision gauge** — every resolved link carries the granularity it was resolved at (phrase, sentence, paragraph, document), so downstream consumers know how much to trust it, rather than treating every match as equally certain.
- **Indexed incremental updates instead of full reprocessing** — adding a new concept or synonym triggers a targeted search over already-stored document text, not a corpus-wide re-run of the entire NLP pipeline.
- **Dual reasoning modes on one graph** — deterministic, auditable graph queries and RAG-assisted natural language querying, over the same data, selectable per use case rather than forced into one paradigm.

Each is unpacked below.

---

## Why clinical AI reasoning is still fragile

Flat-text retrieval and terminal ontology mappings leave real gaps in high-stakes reasoning.

**Pure RAG lacks structure.** Semantic similarity retrieves related text — it can't verify a numeric threshold or a temporal rule the way eligibility logic requires.

**Terminology maps are flat.** Official SNOMED–ICD-O crosswalks are lookup tables, not queryable structure — they don't expose hierarchy or reasoning.

**Output is often unusable.** Rich, accurate extracted data still fails to land if it's delivered as raw evidence instead of a clear conclusion.

These aren't hypothetical concerns. Published evaluations of LLM-based clinical recommendation systems have found real gaps in reliability — one study found 34.3% of AI breast-cancer recommendations were non-concordant with NCCN guidelines, with a 12.5% hallucination rate. That's the gap this architecture is built to close.

---

## Compositional concept model

Body part and morphology compose into a diagnosis — without erasing either atom.

*[Image: compositional-model.png]*

A common approach in clinical NLP pipelines erases "breast" once it's folded into "breast cancer," losing it as a standalone, independently reasonable concept elsewhere in the chart — a prior imaging finding, a family history note, anything unrelated to the cancer diagnosis itself.

This model keeps both atoms independently queryable while the composite concept is still available wherever "breast cancer" is the right unit — nothing is erased, only added.

*Concrete example: a pathology note reads "carcinoma identified in the left breast, moderately differentiated." The system tags "left breast" (body part), "carcinoma" (morphology), and composes "breast cancer" (diagnosis) — while a later note mentioning only "left breast" (e.g., a mammogram unrelated to the cancer) still resolves correctly, because the atom was never deleted.*

---

## ICD-O as a reconciliation bridge

Not a terminal mapping off SNOMED — a queryable pivot between two code systems.

*[Image: icdo-bridge.png]*

Most systems treat ICD-O as a dead-end crosswalk hanging off a SNOMED concept. This structure treats it as the actual reconciliation point it is: ICD-O-3 topography is derived from ICD-10 Chapter II, and SEER maintains official ICD-O ↔ ICD-10-CM conversion tables. Modeling that relationship explicitly means a SNOMED clinical concept and its ICD-10-CM billing code can be reconciled through ICD-O even when a direct mapping is ambiguous or one-to-many — a common occurrence in oncology coding.

*Concrete example: a clinical note documents "invasive ductal carcinoma, left breast." The SNOMED finding maps to ICD-O topography C50.9 and morphology 8500/3, which resolves via the bridge to ICD-10-CM C50.912 — the specific, laterality-coded billing diagnosis — without a human having to manually reconcile the clinical description against the billing code.*

---

## One patient, every source, two clocks

Clinical mentions and billing claims share one hub — each carries its own effective and logged date.

*[Image: patient-hub-bitemporal.png]*

A diagnosis logged today can be effective years earlier; a claim's service date routinely precedes its adjudication date. Tracking both dates — on every mention and every claim — supports two different kinds of reasoning from the same graph: clinical-timeline questions ("what's true about this patient") and audit questions ("what did we know, and when"). Because every mention and claim connects back to the same patient node, reasoning across a patient's full history — across documents, encounters, and billing records — is a single traversal, not a search across disconnected systems.

*Concrete example: "flag any diagnosis logged more than 30 days after its effective date" is a pure audit query — it filters on the gap between the two dates, not on either date alone, and surfaces documentation-lag patterns a single-date system couldn't distinguish from an on-time record.*

---

## Two ways to ask the same question

The graph is the source of truth either way — RAG is an optional interface on top of it, not the reasoning engine itself.

*[Image: dual-reasoning-modes.png]*

**RAG / chat mode** offers natural-language querying with LLM-synthesized answers — fast, good for open-ended exploration, but harder to fully audit.

**Deterministic / graph mode** answers the same question through a direct, traceable graph query with no LLM in the reasoning loop — every answer carries full provenance, built for the abstractors, reviewers, and compliance workflows that need a defensible answer, not just a plausible one.

Same query, same underlying data — the customer, not the architecture, decides which mode to trust for a given task.

---

## What the graph handles vs. what the vectors handle

Two different reasoning problems, deliberately not solved with one tool:

**The graph handles structure.** Hierarchy (is this concept a kind of that one), composition (which atoms make up a diagnosis), temporal logic (is this lab result recent enough to count), and provenance (which document, which span, which date). This is where determinism and auditability live.

**Vector embeddings handle fuzziness** — and one of the hardest, least-discussed problems they solve here isn't matching a diagnosis to a trial. It's a more basic question: when a document mentions a morphology finding, *which body part does it actually belong to?*

### Resolving attachment, not just meaning

Real clinical documentation doesn't reliably place a finding right next to the body part it describes. Templated reports, dictated notes, and multi-specimen pathology reports routinely separate a morphology mention from its actual anatomical source by several sentences — sometimes across sections entirely.

*[Image: body-part-vector-disambiguation.png]*

A pathology report might describe a left breast biopsy in one section and a right axillary FNA in another, then state "carcinoma identified, moderately differentiated" without repeating which specimen it refers to. Proximity heuristics — attaching a finding to whichever body-part mention appears nearest in the text — get this wrong often enough to matter, especially in templated or dictated notes where mention order doesn't track anatomical logic.

Here, vector similarity between the morphology mention's surrounding context and each candidate body part's surrounding context resolves the attachment — not by guessing based on distance, but by scoring which context actually reads as related. The winning pairing is written into the graph as a scored edge; low-confidence pairs route to human review rather than being silently guessed. This is the same class of problem as coreference resolution in general NLP, applied to a place where getting it wrong has real clinical and billing consequences.

*Known limitation, stated honestly: true pronominal coreference ("it was treated with lumpectomy," referring to a diagnosis named two sentences earlier) is a distinct problem from attachment scoring — there's no concept-specific text in that sentence to embed or search for at all. It has to be resolved at initial ingestion time, while the document's discourse structure is still in view, not recovered later. This is flagged as an open item, not solved by the mechanisms above.*

---

## One document, many spans — how storage actually works

Every phrase, sentence, and section is a set of character offsets into one stored copy of the document — never a duplicated substring.

*[Image: resolution-scope-precision-gauge.png]*

A phrase-level mention ("left breast," offsets 142–156) and its sentence-level context window (offsets 89–210) both point into the same underlying document text — this is the same pattern UIMA (the framework cTAKES itself runs on) already uses internally, applied consistently up through paragraph and section boundaries as well, which most pipelines don't carry that far.

This matters for two reasons:

**Storage stays cheap.** The cost of "give this phrase its sentence context" is two integers, not a copied string — clinical text is highly repetitive across patients, so avoiding duplication at every granularity keeps the index from ballooning the way naive per-mention text copies would.

**Every resolution carries an honest confidence level.** A phrase-level match is high-precision and safe to use for billing codes or registry fields, auto-resolved with no flag. A match that could only be made at sentence, paragraph, or section granularity is progressively looser — still usable for broader reasoning ("this note is broadly about breast cancer treatment"), but explicitly marked with the scope it was resolved at, and routed to human review rather than treated as equivalent to an exact match. Nothing is silently upgraded to a confidence level it didn't earn.

---

## Adding new terminology without reprocessing everything

A recurring failure mode in clinical NLP systems: adding one new concept or synonym forces every document back through the full extraction pipeline, end to end.

*[Image: incremental-terminology-update.png]*

That happens when a system only stores the *result* of dictionary matching, with nothing to check newly-added terms against later. The fix here is to keep a searchable, indexed copy of the underlying document text itself — separate from whatever the dictionary currently knows.

When a new synonym is added: the exact string is searched against a full-text index over the stored documents (not a linear scan — an indexed lookup, the same mechanism behind any production search engine), returning precise character offsets everywhere it occurs. Each hit becomes a new mention, gets embedded for attachment resolution if needed, and gets linked into the graph. None of the expensive linguistic stages — sentence detection, tokenization, parsing — rerun, because they were never dictionary-dependent in the first place; only the matching step, scoped to the new term, executes again.

*Concrete cost comparison: reprocessing the full corpus scales with total document count, every single time a term is added. Indexed lookup scales with how many documents actually contain the new term — typically a small fraction of the corpus, and a one-time cost per addition rather than a recurring one.*

This is deliberately paired with exact-match search rather than replacing it with pure vector similarity: literal term lookup catches the common case cheaply, while embedding-based matching remains the fallback for paraphrased mentions the literal string wouldn't find. Two different failure modes, two different tools — the same design principle behind the graph/vector split throughout the rest of the architecture.

---

## One graph, several initiatives

*[Image: graph-grounded-domains.png]*

The same ontology-and-graph core, scoped to different reasoning tasks across three areas of healthcare operations. Trial matching is the most fully worked out of the three — full ontology, compositional model, and ClinicalTrials.gov integration — while billing and quality initiatives use the same reasoning core applied to a different rule set and output shape.

**Clinical care**
- Trial eligibility matching against live ClinicalTrials.gov criteria
- Chronic disease trend monitoring (e.g., A1c thresholds over time)
- Cross-document patient history, reasoned from one hub node

**Billing & revenue integrity**
- Auditing clinical documentation against billed codes, using the SNOMED↔ICD-O↔ICD-10-CM bridge to catch mismatches
- Claims coding anomaly detection across a patient's billing history
- Under/overbilling pattern review, grounded in the same provenance layer as the clinical side

**Hospital quality & safety**
- Registry and quality-measure reporting (e.g., NAACCR fields), auto-populated with full source traceability
- Readmission risk flagging from structured encounter and diagnosis history
- Patient safety indicator tracking across documents and encounters over time

One graph, one ontology, one provenance layer — different reasoning rules and output shapes per initiative, not separate systems built from scratch each time.

---

## Where this holds up, and where it doesn't yet

**Strengths**
- Grounds reasoning in real domain structure, not just semantic similarity
- Full provenance to source document and span, on every answer — down to the exact resolution scope it was matched at
- Generalizes across code systems — proven with a SNOMED/ICD-O/RxNorm ontology applied to two unrelated clinical domains
- Same graph and provenance layer extends to billing/claims and quality-reporting use cases, not just clinical narrative
- Deterministic mode gives an auditable option most RAG-only systems don't offer
- Concept and synonym updates are indexed lookups, not full-corpus reprocessing

**Open limitations**
- Ontology and crosswalk coverage is currently narrow — hand-built, not exhaustive
- True pronominal coreference resolution is a known open gap, distinct from the attachment-scoring mechanism already in place
- Not yet validated against real clinical data — MIMIC access is pending
- Output usability is still unproven with an actual end user
- Single-developer build — not yet production-hardened or scale-tested

---

## Current status

MVP scoped to two tracks — breast cancer (oncology/registry) and A1c monitoring (chronic disease) — both matched against ClinicalTrials.gov.

1. **Architecture locked** *(done)* — graph schema, compositional model, ICD-O bridge, bitemporal design, resolution-scope gauge, and incremental-update strategy finalized.
2. **Ontology & data ingestion** *(planned)* — SNOMED/ICD-O/NAACCR seed data and synthetic clinical notes for both tracks.
3. **Reasoning rules & trial matching** *(planned)* — 3–5 rules live; ClinicalTrials.gov ingestion and matching, both tracks.
4. **Dual-mode demo** *(planned)* — RAG and deterministic modes, toggleable, with full provenance on output.

---

*Built independently, rebuilt from scratch, applying lessons from prior clinical NLP work — every hard edge that earlier system hit (erasure, flat crosswalks, unusable output, full-corpus reprocessing) addressed deliberately in the opposite direction.*
