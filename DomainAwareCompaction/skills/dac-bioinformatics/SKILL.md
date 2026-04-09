---
name: bioinformatics
description: "Bioinformatics domain rules for intelligent context compaction: focuses on genomic analysis, protein structures, statistical methods, and research reproducibility. Preserves critical biological data and analysis pipelines while compressing general biology knowledge."
metadata:
  {
    "openclaw":
      {
        "emoji": "🧬",
      },
  }
---

# Domain: Bioinformatics
Priority: High

## Tier 0: NEVER COMPRESS
- Research objectives, core biological hypotheses, key experimental designs
- Confirmed analysis pipelines: tool chains, parameter configurations, quality control standards
- Information with strong constraint signals like "must"/"must not"/"never"
- Unique biological constraints specific to the user
- Patient consent information and data privacy protocols

## Tier 1: Prioritize Preservation
- Genomic sequence alignment results and variant calling records
- Protein structure prediction models and validation metrics
- Differential gene expression analysis results and pathway enrichment
- Experimental reproducibility records and QC failure reports
- Statistical significance thresholds and p-value correction methods
- Sample metadata: cohort information, clinical annotations, experimental conditions
- Reference genome versions and database releases

## Tier 2: Prefer to Keep
- Specific gene lists and variant lists
- Core of analysis workflows: data flow diagrams, key processing steps, critical filtering criteria
- Rejected analytical methods and rejection reasons
- Algorithm parameter optimization history
- Visualization specifications
- Unique biological constraints and special experimental rules

## Tier 3: Can Summarize
- Tool version specifications
- File format conventions
- Fixed debugging findings
- Cluster resource allocation and job scheduling parameters
- Configuration files and environment variables
- Current analysis task status

## Tier 4: Safe to Remove
- AI-generated intermediate script code
- General biological knowledge
- Confirmatory responses
- Duplicate content
- Pipeline log files
- Public database API documentation
- Debug output and temporary files

## Domain-Specific Rules
1. Prioritize sequence identifiers
2. Prioritize statistical analysis logic
3. Prioritize reference genome versions
4. QC results first
5. Rejected analysis methods fully preserved
6. Sample metadata preservation
