# SmartContext Skill: Bioinformatics

## Domain Summary

Bioinformatics (biological computing) integrates biology, computer science, mathematics, and statistics to analyze and interpret biological data. This domain covers genomic sequence analysis, protein structure prediction, systems biology, drug discovery, and personalized medicine. The core value lies in transforming massive biological data into actionable biological insights.

## Priority Declaration

When rules from this domain conflict with other domains, priority: **High**

## Priority Guidelines (Tier 0 → Tier 4)

### Tier 0 — Always Prioritize (Never Overlook)
- Research objectives, core biological hypotheses, key experimental designs
- Confirmed analysis pipelines: tool chains, parameter configurations, quality control standards
- Information with strong constraint signals like "must"/"must not"/"never"
- Unique biological constraints specific to the user that cannot exist in LLM's own knowledge base
- Patient consent information and data privacy protocols (critical for regulatory compliance)

### Tier 1 — Highest Priority Focus
- Genomic sequence alignment results and variant calling records
- Protein structure prediction models and validation metrics
- Differential gene expression analysis results and pathway enrichment
- Experimental reproducibility records and QC failure reports
- Statistical significance thresholds and p-value correction methods
- Sample metadata: cohort information, clinical annotations, experimental conditions
- Reference genome versions and database releases (critical for result reproducibility)

### Tier 2 — High Priority Attention
- Specific gene lists and variant lists (keep the identifier list)
- Core of analysis workflows: data flow diagrams, key processing steps, critical filtering criteria
- Rejected analytical methods and rejection reasons (format: "Method → Rejection reason", preserve negative knowledge)
- Algorithm parameter optimization history (format: "A → B (Round X reason) → C (Round Y reason)")
- Visualization specifications: plot types, color schemes, annotation rules
- Unique biological constraints and special experimental rules specific to the user

### Tier 3 — Keep In Mind
- Tool version specifications: software names, versions, installation paths
- File format conventions: FASTQ, BAM, VCF, GFF, etc.
- Fixed debugging findings (format: "Problem → Root cause → Fix method")
- Cluster resource allocation and job scheduling parameters
- Configuration files and environment variables for bioinformatics pipelines
- Current analysis task status and todo list

### Tier 4 — Can Reference Briefly
- AI-generated intermediate script code (can be re-read from project files)
- General biological knowledge (gene names, common pathways, basic molecular biology concepts, etc.)
- Confirmatory responses ("Okay", "Got it", "Received", etc.)
- Same content discussed multiple times (keep only the last conclusion)
- Pipeline log files (keep only error summaries and key metrics)
- Public database API documentation
- Debug output and temporary files

## Dynamic Adjustment Rules

1. **Citation Frequency**: Information repeatedly mentioned by the user → Promote 1 Tier
2. **Cross-Stage Reference**: Current discussion stage differs from the stage the information belongs to but is referenced → Temporarily promote to Tier 2
3. **Time Decay**: Only effective for Tiers 3-4, Tiers 0-2 do not decay over time
4. **Dependency Relationship**: Content directly referenced by high Tier information → Sync promote to that Tier
5. **Conflict Resolution**:
   - When conflicting information exists, keep latest version + rejection reason
   - Analysis pipeline conflicts preserve complete evolution chain
   - Parameter setting conflicts only keep latest version

## Domain-Specific Rules

1. **Prioritize sequence identifiers**: Even when detailed sequences are secondary, focus on gene IDs, transcript IDs, variant IDs, and genomic coordinates
2. **Prioritize statistical analysis logic**: Critical logic like p-value calculation, multiple testing correction, confidence intervals should remain in focus
3. **Prioritize reference genome versions**: Genome build (hg19, hg38, etc.) and annotation versions are critical for result reproducibility
4. **QC results first**: When focus is limited, prioritize quality control results over raw data summaries
5. **Rejected analysis methods fully preserved**: Even when focus is tight, rejected methods should at least preserve "method name + rejection reason"
6. **Sample metadata preservation**: Sample identifiers and clinical annotations must always remain in focus

## User Role Adaptation

### Predefined Tags → Tier Adjustment Rules

| Tag | Promote Items | Adjustment |
|-----|---------------|------------|
| genomicist | Sequence alignment, variant calling, genome assembly | Related items +1 Tier |
| transcriptomicist | Gene expression, differential analysis, pathway enrichment | Related items +1 Tier |
| structuralbiologist | Protein structure, molecular dynamics, docking | Related items +1 Tier |
| clinician | Patient data, clinical outcomes, treatment response | Related items +1 Tier |
| computationalbiologist | Algorithm development, statistical modeling, pipeline design | Related items +1 Tier |

### Fallback Rule
When no role is configured, all items execute at default Tier without adjustment.

## Cross-Domain Collaboration

When collaborating with software engineering domain:
- Bioinformatics Tier 0 items involving pipeline reproducibility should be unconditionally prioritized
- All version control information for analysis scripts must be preserved

When collaborating with clinical domain:
- Bioinformatics Tier 0 items involving patient data and privacy should be unconditionally prioritized
- All clinical annotations referenced in analysis must be preserved
