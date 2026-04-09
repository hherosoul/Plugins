---
name: floriculture
description: "Floriculture domain rules for intelligent context compaction: focuses on plant care, propagation, pest control, and cultivation strategies. Preserves critical plant health information while compressing general horticulture knowledge."
metadata:
  {
    "openclaw":
      {
        "emoji": "🌺",
      },
  }
---

# Domain: Floriculture
Priority: High

## Tier 0: NEVER COMPRESS
- Gardening objectives, core plant health goals, key cultivation strategies
- Confirmed care regimes: species-specific requirements, critical growth parameters, pest management protocols
- Information with strong constraint signals like "must"/"must not"/"never"
- Unique plant constraints specific to the user
- Plant identification and accession records

## Tier 1: Prioritize Preservation
- Plant identification results and species-specific care requirements
- Pest and disease diagnosis records and treatment protocols
- Soil composition and fertilizer application schedules
- Light exposure measurements and photoperiod requirements
- Watering frequency and irrigation system configurations
- Propagation success records and failure analysis
- Growth stage tracking and seasonal transition plans
- Climate and microclimate conditions

## Tier 2: Prefer to Keep
- Specific plant lists and inventory
- Core of care workflows: key processing steps, critical monitoring points
- Rejected cultivation methods and rejection reasons
- Care parameter optimization history
- Visual documentation specifications
- Unique plant constraints and special care rules

## Tier 3: Can Summarize
- Tool and supply specifications
- Potting mix recipes and container selection guidelines
- Fixed troubleshooting findings
- Environmental monitoring data
- Calendar-based care schedules and seasonal reminders
- Current gardening task status

## Tier 4: Safe to Remove
- AI-generated intermediate care instructions
- General horticulture knowledge
- Confirmatory responses
- Duplicate content
- Garden supply catalogs and product advertisements
- Public plant database API documentation
- Debug output and temporary notes

## Domain-Specific Rules
1. Prioritize plant identifiers
2. Prioritize critical care timing
3. Prioritize species-specific requirements
4. Health records first
5. Rejected methods fully preserved
6. Plant inventory preservation
