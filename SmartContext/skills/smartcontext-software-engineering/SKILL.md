# SmartContext Skill: Software Engineering

## Domain Summary

Software engineering domain covers the complete lifecycle including requirements analysis, architecture design, coding implementation, testing validation, deployment, and operations. The core value of this domain lies in ensuring system maintainability, scalability, and reliability.

## Priority Declaration

When rules from this domain conflict with other domains, priority: **High**

## Priority Guidelines (Tier 0 → Tier 4)

### Tier 0 — Always Prioritize (Never Overlook)
- User personas, core usage scenarios, key business rules
- Confirmed architectural decisions: technology choices, architectural style, system boundaries, module division
- Information with strong constraint signals like "must"/"must not"/"never"
- Unique constraints specific to the user that cannot exist in LLM's own knowledge base

### Tier 1 — Highest Priority Focus
- Code review comments and fix records (including architecture-level feedback)
- Performance optimization plans and benchmark tests
- Technical debt identification and prioritization
- Dependency management strategies
- Key selection discussions and trade-off records
- Security design and privacy protection measures
- Database schemas and API contracts

### Tier 2 — High Priority Attention
- Specific items of functional and non-functional requirements (keep the item list)
- Core of detailed design: domain model definitions, key API contracts, core data flows
- Rejected solutions and rejection reasons (format: "Solution → Rejection reason", preserve negative knowledge)
- Decision evolution chain (format: "A → B (Round X reason) → C (Round Y reason)")
- Unit test and integration test cases
- Unique business constraints and special rules specific to the user

### Tier 3 — Keep In Mind
- Coding conventions: naming standards, directory structure conventions, lint rules
- Project configuration: framework versions, key dependencies and version constraints
- Fixed debugging findings (format: "Problem → Root cause → Fix method")
- Log formats and monitoring metrics
- Configuration files and environment variables
- Current task status and todo list

### Tier 4 — Can Reference Briefly
- AI-generated implementation detail code (can be re-read from project files)
- General programming knowledge (syntax rules, common library usage, design pattern definitions, etc.)
- Confirmatory responses ("Okay", "Got it", "Received", etc.)
- Same content discussed multiple times (keep only the last conclusion)
- IDE auto-generated code
- Third-party library API documentation
- Debug output and temporary files

## Dynamic Adjustment Rules

1. **Citation Frequency**: Information repeatedly mentioned by the user → Promote 1 Tier
2. **Cross-Stage Reference**: Current discussion stage differs from the stage the information belongs to but is referenced → Temporarily promote to Tier 2
3. **Time Decay**: Only effective for Tiers 3-4, Tiers 0-2 do not decay over time
4. **Dependency Relationship**: Content directly referenced by high Tier information → Sync promote to that Tier
5. **Conflict Resolution**:
   - When conflicting information exists, keep latest version + rejection reason
   - Architecture-level conflicts preserve complete evolution chain
   - Implementation-level conflicts only keep latest version

## Domain-Specific Rules

1. **Prioritize interface definitions**: Even when implementation details are secondary, focus on function signatures, class definitions, interface contracts
2. **Prioritize error handling logic**: Critical logic like error capture, exception handling, retry mechanisms should remain in focus
3. **Prioritize performance-critical paths**: Core algorithms, hot code, performance optimization measures
4. **Test cases first**: When focus is limited, prioritize test cases over implementation details
5. **Rejected solutions fully preserved**: Even when focus is tight, rejected solutions should at least preserve "solution name + rejection reason"

## User Role Adaptation

### Predefined Tags → Tier Adjustment Rules

| Tag | Promote Items | Adjustment |
|-----|---------------|------------|
| frontend | UI constraints, component design, style solutions | Related items +1 Tier |
| backend | API contracts, database design, performance metrics | Related items +1 Tier |
| architect | Architectural decisions, module division, technology choices | Related items +1 Tier |
| devops | Deployment config, CI/CD processes, monitoring | Related items +1 Tier |
| fullstack | Balanced across layers, no adjustment | No adjustment |

### Fallback Rule
When no role is configured, all items execute at default Tier without adjustment.

## Cross-Domain Collaboration

When collaborating with healthcare domain:
- Software engineering Tier 0 items involving medical data privacy protection measures should be unconditionally prioritized
- All personally identifiable information (PII) must be excluded from logs

When collaborating with legal domain:
- Software engineering Tier 0 items involving compliance requirements architectural decisions should be unconditionally prioritized
- Legal provisions referenced in code comments should be preserved
