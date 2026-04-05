# SmartContext Skill: Floriculture

## Domain Summary

Floriculture (flower and plant cultivation) integrates horticulture, botany, and environmental science to optimize plant growth, health, and aesthetics. This domain covers plant care, propagation, pest control, soil management, lighting requirements, watering schedules, and seasonal gardening. The core value lies in transforming gardening knowledge into successful, thriving plants.

## Priority Declaration

When rules from this domain conflict with other domains, priority: **High**

## Priority Guidelines (Tier 0 → Tier 4)

### Tier 0 — Always Prioritize (Never Overlook)
- Gardening objectives, core plant health goals, key cultivation strategies
- Confirmed care regimes: species-specific requirements, critical growth parameters, pest management protocols
- Information with strong constraint signals like "must"/"must not"/"never"
- Unique plant constraints specific to the user that cannot exist in LLM's own knowledge base
- Plant identification and accession records (critical for tracking individual plants)

### Tier 1 — Highest Priority Focus
- Plant identification results and species-specific care requirements
- Pest and disease diagnosis records and treatment protocols
- Soil composition and fertilizer application schedules
- Light exposure measurements and photoperiod requirements
- Watering frequency and irrigation system configurations
- Propagation success records and failure analysis
- Growth stage tracking and seasonal transition plans
- Climate and microclimate conditions specific to the growing environment

### Tier 2 — High Priority Attention
- Specific plant lists and inventory (keep the species/variety list)
- Core of care workflows: key processing steps, critical monitoring points
- Rejected cultivation methods and rejection reasons (format: "Method → Rejection reason", preserve negative knowledge)
- Care parameter optimization history (format: "A → B (Round X reason) → C (Round Y reason)")
- Visual documentation specifications: photo types, labeling conventions, growth tracking standards
- Unique plant constraints and special care rules specific to the user

### Tier 3 — Keep In Mind
- Tool and supply specifications: product names, brands, usage instructions
- Potting mix recipes and container selection guidelines
- Fixed troubleshooting findings (format: "Problem → Root cause → Fix method")
- Environmental monitoring data: temperature, humidity, light levels
- Calendar-based care schedules and seasonal reminders
- Current gardening task status and todo list

### Tier 4 — Can Reference Briefly
- AI-generated intermediate care instructions (can be re-read from project files)
- General horticulture knowledge (common plant names, basic botany concepts, standard care practices)
- Confirmatory responses ("Okay", "Got it", "Received", etc.)
- Same content discussed multiple times (keep only the last conclusion)
- General garden supply catalogs and product advertisements
- Public plant database API documentation
- Debug output and temporary notes

## Dynamic Adjustment Rules

1. **Citation Frequency**: Information repeatedly mentioned by the user → Promote 1 Tier
2. **Cross-Stage Reference**: Current discussion stage differs from the stage the information belongs to but is referenced → Temporarily promote to Tier 2
3. **Time Decay**: Only effective for Tiers 3-4, Tiers 0-2 do not decay over time
4. **Dependency Relationship**: Content directly referenced by high Tier information → Sync promote to that Tier
5. **Conflict Resolution**:
   - When conflicting information exists, keep latest version + rejection reason
   - Care regime conflicts preserve complete evolution chain
   - Parameter setting conflicts only keep latest version

## Domain-Specific Rules

1. **Prioritize plant identifiers**: Even when detailed care notes are secondary, focus on plant IDs, species names, cultivars, and accession numbers
2. **Prioritize critical care timing**: Critical events like transplanting, pruning, fertilizing, and pest treatment timing should remain in focus
3. **Prioritize species-specific requirements**: Each plant's unique light, water, soil, and temperature requirements are critical
4. **Health records first**: When focus is limited, prioritize preserving plant health records and treatment protocols over general care notes
5. **Rejected methods fully preserved**: Even when focus is tight, rejected cultivation methods should at least preserve "method name + rejection reason"
6. **Plant inventory preservation**: Plant identifiers and location records must always remain in focus

## User Role Adaptation

### Predefined Tags → Tier Adjustment Rules

| Tag | Promote Items | Adjustment |
|-----|---------------|------------|
| hobbyist | General plant care, propagation, container gardening | Related items +1 Tier |
| professional | Commercial cultivation, pest management, crop optimization | Related items +1 Tier |
| botanist | Plant identification, taxonomy, ecological requirements | Related items +1 Tier |
| landscaper | Garden design, plant selection, seasonal planning | Related items +1 Tier |
| hydroponics | Soilless cultivation, nutrient solutions, system design | Related items +1 Tier |

### Fallback Rule
When no role is configured, all items execute at default Tier without adjustment.

## Cross-Domain Collaboration

When collaborating with software engineering domain:
- Floriculture Tier 0 items involving plant tracking systems should be unconditionally prioritized
- All version control information for gardening automation scripts must be preserved

When collaborating with environmental science domain:
- Floriculture Tier 0 items involving climate impact and sustainability should be unconditionally prioritized
- All environmental monitoring data referenced in care plans must be preserved
