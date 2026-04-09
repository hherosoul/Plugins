---
name: software-engineering
description: "Software Engineering domain rules for intelligent context compaction: preserves architecture decisions, API contracts, and design rationale while compressing non-critical content. Use for all software development, coding, and engineering contexts."
metadata:
  {
    "openclaw":
      {
        "emoji": "💻",
      },
  }
---

# Domain: Software Engineering
Priority: High

## Tier 0: NEVER COMPRESS
- User personas, core usage scenarios, key business rules
- Confirmed architectural decisions: technology choices, architectural style, system boundaries, module division
- Information with strong constraint signals like "must"/"must not"/"never"
- Unique constraints specific to the user
- Complete code interfaces, function signatures, type definitions, API contracts
- Database schemas and data models

## Tier 1: Prioritize Preservation
- Code review comments and fix records
- Performance optimization plans and benchmark tests
- Technical debt identification and prioritization
- Dependency management strategies
- Key selection discussions and trade-off records
- Security design and privacy protection measures
- Implementation logic for complex features
- Error handling patterns and retry mechanisms
- Database schemas and API contracts

## Tier 2: Prefer to Keep
- Specific items of functional and non-functional requirements
- Core of detailed design: domain model definitions, key API contracts, core data flows
- Rejected solutions and rejection reasons
- Decision evolution chain
- Unit test and integration test cases
- Unique business constraints and special rules

## Tier 3: Can Summarize
- Coding conventions: naming standards, directory structure conventions, lint rules
- Project configuration: framework versions, key dependencies and version constraints
- Fixed debugging findings
- Log formats and monitoring metrics
- Configuration files and environment variables
- Current task status and todo list

## Tier 4: Safe to Remove
- AI-generated implementation detail code
- General programming knowledge
- Confirmatory responses
- Duplicate content
- IDE auto-generated code
- Third-party library API documentation
- Debug output and temporary files

## Domain-Specific Rules
1. Prioritize interface definitions
2. Prioritize error handling logic
3. Prioritize performance-critical paths
4. Test cases first
5. Rejected solutions fully preserved
