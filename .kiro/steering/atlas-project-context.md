---
inclusion: always
---

# ATLAS Project Context — Persistent Development Guidelines

This steering file provides persistent context for all Kiro agents working on the ATLAS geospatial platform.

---

## PROJECT IDENTITY

**Name:** ATLAS  
**Type:** Long-term geospatial exploration platform  
**Status:** Day 0 planning phase  
**Started:** November 3, 2026  

**This is NOT:**
- A quick website generation task
- A generic AI dashboard
- A travel directory
- A placeholder prototype

**This IS:**
- A serious long-term engineering project
- A scientifically accurate geographical platform
- A comprehensive geospatial database
- A premium educational and research tool

---

## CORE PRINCIPLES (NON-NEGOTIABLE)

1. **Scientific accuracy over speed**
2. **Verify before publishing** — no unverified data as fact
3. **Always attribute sources**
4. **Plan before implementing**
5. **Follow approved architecture**
6. **Never fabricate geographical data**
7. **Security first** — never expose credentials
8. **Modular, documented code**
9. **Test coverage required**
10. **Ask before major architectural changes**

---

## GEOGRAPHICAL SCOPE

### Primary Focus (Highest Priority)
- **India**: All 28 states, 8 union territories
- **Nepal**: All 7 provinces

### Extended Coverage
- Tibet, Bhutan, Karakoram, Hindu Kush, Pamir, Tian Shan, Kunlun, Altai
- Central Asian mountain systems
- Full Himalayan geographical context

### Entity Coverage
Mountains, ranges, valleys, passes, plateaus, plains, deserts, rivers, tributaries, lakes, glaciers, waterfalls, wetlands, forests, grasslands, beaches, coastlines, islands, bays, gulfs, estuaries, deltas, coral reefs, national parks, wildlife sanctuaries, settlements, historical sites, geological formations, faults, tectonic plates, infrastructure, natural hazards.

---

## APPROVED TECHNOLOGY STACK

### Frontend
- React + TypeScript
- Vite
- Tailwind CSS

### Geospatial
- **CesiumJS** (primary 3D globe engine)
- Three.js (specialized visualizations only, when CesiumJS insufficient)
- GeoJSON and standard formats

### Backend
- Supabase
- PostgreSQL + PostGIS
- Supabase Storage
- Server-side functions

### Development
- GitHub
- Kiro
- Automated testing
- Modular architecture

### Deployment
- Vercel (or justified alternative)

### AI
- Provider-independent integration
- RAG with verified records
- Mandatory source attribution

**DO NOT introduce:**
- MongoDB without justification
- Unnecessary additional services
- Redundant dependencies
- Alternative databases without approval

---

## ARCHITECTURAL BOUNDARIES

### Database
- Normalized PostgreSQL + PostGIS schema
- Proper spatial types and indexes
- Source attribution on every record
- Verification status tracking
- NO unstructured JSON for core geographical data
- JSONB only for flexible supplementary attributes

### Data Pipeline
- Raw → Processed → Staging → Published
- Preserve original source files
- Document transformations
- Verification workflow required
- No auto-publishing of unverified data

### AI System
- Retrieve from verified database records
- Cite sources
- Distinguish verified vs uncertain information
- Label AI-generated artistic reconstructions
- Never hallucinate coordinates or elevations

### CesiumJS
- Real terrain from elevation models
- Distinguish satellite imagery vs artistic renders
- Proper terrain providers
- Mobile compatibility
- Performance optimization

---

## SPECIALIZED AGENT ROLES

| Agent | Primary Responsibilities |
|-------|-------------------------|
| **Project Architect** | System integration, cross-module decisions, architecture approval |
| **Geospatial Engineer** | PostGIS, spatial algorithms, coordinate systems, terrain |
| **Frontend Engineer** | React, CesiumJS, UI components, user experience |
| **Backend & Database Engineer** | Supabase, PostgreSQL, APIs, server functions |
| **Data Engineering Agent** | ETL, transformations, processing pipelines |
| **Geographical Research Agent** | Dataset research, licensing, acquisition planning |
| **QA & Security Agent** | Testing, security audits, performance |

### Agent Restrictions
- **NO agent** may modify approved database schema without Project Architect review
- **NO agent** may publish unverified geographical data
- **NO agent** may expose secrets or credentials
- **NO agent** may skip verification workflows
- **NO agent** may override security policies

---

## DATA INTEGRITY REQUIREMENTS

### Every Geographical Record Must Have:
```typescript
{
  source_name: string;
  source_url: string;
  license: string;
  attribution: string;
  acquired_date: string;
  verification_status: "verified" | "needs_review" | "unverified";
}
```

### Verification Workflow
1. Raw data ingestion
2. Format validation
3. Coordinate validation
4. Duplicate detection
5. Staging table import
6. Quality checks
7. Manual/automated verification
8. Publication approval
9. Ongoing monitoring

### Prohibited Actions
- Publishing unverified data as fact
- Fabricating coordinates or elevations
- Removing source attribution
- Skipping verification steps
- Presenting AI reconstructions as authentic imagery

---

## SECURITY RULES

### NEVER commit:
- API keys
- Credentials
- Tokens
- Private keys
- Database passwords
- Service role keys
- Access tokens

### ALWAYS:
- Use environment variables
- Reference `.env.example`
- Add secrets to `.gitignore`
- Use Supabase RLS policies
- Validate user inputs
- Sanitize queries
- Use parameterized statements

---

## CODING STANDARDS

### TypeScript
- Explicit types always
- No `any` without justification
- Proper error handling
- Document complex functions

### React
- Functional components
- TypeScript interfaces for props
- One component per file
- Composition over inheritance

### Database
- PostGIS spatial types
- Spatial indexes
- Transactions for multi-step operations
- No `SELECT *` in production

### Testing
- Unit tests for business logic
- Integration tests for APIs
- Spatial tests for calculations
- E2E for critical journeys

---

## COMMIT CONVENTIONS

Format: `<type>(<scope>): <subject>`

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `data`

Example:
```
data(nepal): add Mount Everest geographical record

Source: Natural Earth 1:10m Physical Features
License: Public Domain
Coordinates validated against USGS dataset
Elevation: 8848.86m (2020 China-Nepal joint survey)

Verified: Yes
Attribution: naturalearthdata.com
```

---

## MILESTONE WORKFLOW

Currently in **M0: Product Discovery & Architecture**

### Before Moving to M1:
1. Complete all M0 documentation
2. Founder review and approval
3. Resolve all open questions
4. Architecture sign-off

### M1-M11 Sequence:
Each milestone requires:
- Clear objectives
- Defined deliverables
- Acceptance criteria
- Test cases
- Verification
- Documentation updates

**Do NOT skip ahead to implementation without completing planning.**

---

## FLAGSHIP EXAMPLE

**Mount Kailash** is the first flagship place exploration.

A user should experience:
1. Search for "Mount Kailash"
2. Globe flies to coordinates
3. Explore 3D terrain
4. Discover Lake Mansarovar and Rakshastal
5. View available imagery
6. Read geological history
7. Understand tectonic context
8. Explore cultural significance
9. Ask AI assistant questions
10. Navigate to related places

This architecture must work for **all** geographical features.

---

## DOCUMENTATION REQUIREMENTS

### Always Update:
- Relevant module docs when adding features
- `SYSTEM_ARCHITECTURE.md` for architectural changes
- `DECISION_LOG.md` for significant decisions
- `DATA_SOURCE_REGISTRY.md` for new datasets
- API docs for endpoint changes
- `.env.example` for new config

### Documentation Standards:
- Clear, active voice
- Include examples
- Keep current
- Link between docs
- Diagrams for complex systems

---

## REVIEW CHECKLIST

Before considering any work complete:

**Code:**
- [ ] Follows architecture
- [ ] Includes tests
- [ ] Documentation updated
- [ ] No secrets
- [ ] Proper error handling
- [ ] Type safety
- [ ] Performance considered
- [ ] Security reviewed

**Data:**
- [ ] Source attributed
- [ ] License compatible
- [ ] Coordinates validated
- [ ] Duplicates checked
- [ ] Verification status set
- [ ] Transformation documented
- [ ] Quality checks passed

---

## COMMUNICATION WITH PROJECT OWNER

### Ask Before:
- Major architectural changes
- New technology introductions
- Database schema modifications
- External service integrations
- Deployment changes
- Security policy changes

### Document When:
- Making architectural decisions
- Discovering technical constraints
- Finding data source limitations
- Identifying risks
- Proposing alternatives

### Escalate When:
- Requirements unclear
- Technical blockers encountered
- Conflicting specifications
- Security concerns
- Data licensing questions

---

## CURRENT PHASE FOCUS

**We are in Day 0 planning. Implementation has NOT started.**

Current priorities:
1. Complete all planning documents
2. Research geospatial datasets thoroughly
3. Design robust database architecture
4. Document CesiumJS integration strategy
5. Establish AI architecture
6. Create detailed roadmap
7. Identify risks and dependencies
8. Prepare environment setup
9. List open questions for founder review

**DO NOT:**
- Start building the frontend
- Generate placeholder content
- Create mock geographical data
- Begin large-scale implementation
- Skip planning documentation

---

## SUCCESS CRITERIA

ATLAS is successful when it becomes:
- A real, accurate geographical database
- A scientifically sound exploration platform
- A reliable research and educational tool
- A properly attributed, licensed platform
- A performant, secure, accessible application

**NOT when it looks impressive but contains fabricated data or unverified claims.**

---

*This steering file provides persistent context. All agents must follow these guidelines throughout the project lifecycle.*
