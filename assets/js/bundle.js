/**
 * IBRAHIM IHSAN PORTFOLIO - PRODUCTION BUNDLE (Universal Vanilla JS)
 * Fully self-contained, zero-dependency, works over file:/// and https://
 * WAI-ARIA accessible modal dialog, before/after comparison slider,
 * project filters, mobile navigation, and theme toggling.
 */

(function () {
    'use strict';

    // =========================================================================
    // 1. CASE STUDIES DATABASE
    // =========================================================================
    const CASE_STUDIES = {
        naca: {
            id: "naca",
            title: "NACA 0015 Stepped Airfoil Aerodynamic CFD",
            shortTitle: "NACA 0015 Stepped Airfoil",
            category: "CFD & Aerodynamics",
            domain: "Aerospace & Fluid Mechanics",
            badge: "Wind Tunnel Validated",
            role: "Aerodynamic Simulation Engineer (Undergraduate Independent Research)",
            status: "Completed & Benchmark Validated",
            tools: "ANSYS Fluent 2026 R1 • FreeCAD • Post-Processing CFD Engine",
            primaryImage: "assets/images/naca_fluent_static_pressure.png",
            meshImage: "assets/images/naca0015_mesh.png",
            hasComparison: true,
            summary: "Detailed 2D external aerodynamic investigation comparing conventional vs backward-facing stepped suction surface modifications on the NACA 0015 symmetrical airfoil at chord Reynolds number Re = 1.0 × 10⁶. Evaluated boundary layer vortex trapping, delayed stall inception, and pressure recovery from 0° to 16° angles of attack.",
            problem: "Conventional symmetrical airfoils undergo adverse pressure gradient buildup at high angles of attack, leading to abrupt boundary layer separation from the suction shoulder and catastrophic loss of lift (stall). The objective was to investigate whether backward-facing suction surface steps can trap a stable recirculating vortex to re-energize the boundary layer and delay stall without introducing excessive parasite drag at low angles of attack.",
            constraints: [
                "Chord Reynolds number fixed at Re = 1.0 × 10⁶ (incompressible regime, Mach < 0.1).",
                "Near-wall first cell height constrained to y⁺ ≈ 1.0 for two-equation turbulence wall resolution.",
                "Domain extents set to 12.5 chord lengths upstream and 20 chord lengths downstream to eliminate artificial boundary blockage."
            ],
            methodology: [
                "Parametric 2D geometry generated in FreeCAD with backward-facing step located at 50% chord with step depth h/c = 0.015.",
                "Structured multi-block C-grid topology generated with 240,000 quadrilateral cells and hyperbolic wall clustering.",
                "Steady-state Reynolds-Averaged Navier-Stokes (RANS) solved using Realizable k-ε turbulence model with Enhanced Wall Treatment.",
                "Coupled pressure-velocity scheme with second-order upwind spatial discretization for momentum, turbulent kinetic energy, and dissipation.",
                "Convergence criteria: scaled residuals < 10⁻⁶ with lift and drag force monitors stabilized to within 0.05% across 200 consecutive iterations."
            ],
            meshStats: {
                topology: "Structured 2D C-Grid",
                elements: "240,000 Quadrilateral Cells",
                wallYPlus: "y⁺ < 1.0 throughout boundary layer",
                boundaryInlet: "Velocity Inlet (30 m/s, Tu = 0.5%)",
                boundaryOutlet: "Pressure Outlet (0 Pa gauge)"
            },
            verification: "Lift and drag coefficients across α = 0° to 16° were benchmarked directly against published wind tunnel measurements from Abbott & von Doenhoff ('Theory of Wing Sections', NACA Report TR-824). The baseline smooth profile predicted stall at α = 14° with C_L,max = 1.18, within 2.60% of the experimental value (C_L,exp = 1.15).",
            results: [
                { label: "Maximum Lift Coefficient (C_L,max)", value: "1.18 at α = 14°", note: "Numerical simulation" },
                { label: "Experimental Benchmark (Abbott & von Doenhoff)", value: "1.15 at α = 14°", note: "Wind tunnel data" },
                { label: "Correlation Discrepancy", value: "+2.60%", note: "Verified within acceptable RANS tolerance" },
                { label: "Stall Delay Mechanism", value: "Trapped suction vortex", note: "Suppresses catastrophic leading-edge burst" }
            ],
            limitations: [
                "2D RANS formulation does not resolve 3D spanwise span instabilities or wake vortex shedding dynamics present in un-swept finite wings.",
                "Realizable k-ε model exhibits slight eddy-viscosity overprediction near the vortex core compared to Reynolds Stress Model (RSM) or Large Eddy Simulation (LES).",
                "Physical testing in a subsonic wind tunnel is planned for a scaled 3D-printed model to verify transient acoustic signature."
            ]
        },

        weld: {
            id: "weld",
            title: "S355J2 Multi-Pass Butt-Weld Transient Thermal FEA",
            shortTitle: "S355J2 Butt-Weld Thermal FEA",
            category: "Structural & Thermal FEA",
            domain: "Metallurgical & Manufacturing Engineering",
            badge: "ISO 15614-1 Compliant",
            role: "Thermal FEA Consultant (Client Deliverable: TR-BW8-MAG-MT-001)",
            status: "Delivered & Verified",
            tools: "Gmsh 3D • ANSYS Workbench (Mechanical / Thermal) • Python FEA Scripts",
            primaryImage: "assets/images/s355j2_gmsh_welding_mesh.png",
            meshImage: "assets/images/weld_pass3_thermal.png",
            hasComparison: true,
            summary: "Contracted transient 3D thermal FEA modeling multi-pass Metal Active Gas (MAG/GMAW) butt-welding of 8 mm thick S355J2 structural steel plates. Simulated Goldak moving volumetric heat source, temperature-dependent non-linear thermophysical properties, and metallurgical cooling rate t₈/₅ across 3 sequential welding passes.",
            problem: "Multi-pass arc welding of structural grade S355J2 steel induces steep thermal gradients and localized cooling rates. If the cooling time between 800°C and 500°C (t₈/₅) drops below critical thresholds, brittle martensite forms in the Heat Affected Zone (HAZ), risking cold cracking and failing ISO 15614-1 Welding Procedure Qualifications.",
            constraints: [
                "Plate geometry: 8 mm thickness, single-V butt joint (60° included angle, 2 mm root face).",
                "Welding parameters: 3 passes, arc voltage 24 V, current 220 A, travel speed 5.5 mm/s, arc efficiency η = 0.80.",
                "Preheat temperature: 25°C ambient; interpass temperature controlled to ≤ 180°C."
            ],
            methodology: [
                "Constructed parametric 3D finite element mesh in Gmsh with graded element sizing (0.5 mm in weld fusion zone up to 4.0 mm at plate boundaries).",
                "Implemented Goldak double-ellipsoidal volumetric heat source equation via APDL script with forward and rear semi-axes calibrated to bead geometry.",
                "Incorporated temperature-dependent steel properties (specific heat C_p(T), thermal conductivity k(T), and latent heat of fusion L_f = 270 kJ/kg for solidus/liquidus transition).",
                "Applied combined convective cooling (h = 15 W/(m²·K)) and Stefan-Boltzmann radiative dissipation (ε = 0.85) on outer surfaces.",
                "Extracted nodal temperature-time thermal history curves along weld centerline and fusion boundary."
            ],
            meshStats: {
                topology: "3D Hexahedral / Prismatic Hybrid",
                elements: "480,000 Elements",
                heatSource: "Goldak Double-Ellipsoidal Moving Flux",
                boundaryInlet: "Preheat & Interpass ≤ 180°C",
                boundaryOutlet: "Radiation (ε = 0.85) + Convection (15 W/m²K)"
            },
            verification: "Computed cooling time t₈/₅ was compared against the empirical cooling model from EN 1011-2 and the allowable range mandated by ISO 15614-1 for S355J2 structural steel.",
            results: [
                { label: "Simulated Peak Weld Pool Temp", value: "1,740°C", note: "Above 1,510°C steel liquidus" },
                { label: "Cooling Time t₈/₅ (Pass 3)", value: "11.4 s", note: "Critical hardening indicator" },
                { label: "ISO 15614-1 Acceptable Window", value: "10.0 s to 25.0 s", note: "Prevents martensite embrittlement" },
                { label: "HAZ Width (Simulated)", value: "2.8 mm", note: "Matches macro-etch inspection range" }
            ],
            limitations: [
                "Solid-state phase transformations (austenite-ferrite-pearlite decomposition) were tracked via cooling rates rather than full metallurgical kinetics.",
                "Weld pool fluid dynamics (Marangoni convection) were approximated via enhanced equivalent thermal conductivity in the liquid phase.",
                "Residual stress tensor computation requires subsequent coupled elastoplastic structural run."
            ]
        },

        meplaniq: {
            id: "meplaniq",
            title: "MEPLANIQ: Parametric 2D MEP Floorplan & Procedural Routing Engine",
            shortTitle: "MEPLANIQ Procedural MEP Engine",
            category: "Computational BIM & Automation",
            domain: "Building Services & Procedural Geometry",
            badge: "Parametric Algorithmic Engine",
            role: "Lead Developer & System Architect (Independent Software Project)",
            status: "Working Prototype v1.2",
            tools: "Python 3.11 • ezdxf • NumPy • Matplotlib • AutoCAD Drafter Studio",
            primaryImage: "assets/images/meplaniq_ui.png",
            meshImage: "assets/images/meplaniq_arch.png",
            hasComparison: false,
            summary: "Algorithmic Python CAD engine that converts 2D architectural room definitions into fully coordinated, parametric MEP engineering packages. Procedurally generates clash-free 4-state sanitary plumbing, +70mm parallel potable water supply offsets, HVAC cooling tonnage estimates, and synchronized AutoCAD DXF floorplans with automated bill of quantities (BOQ).",
            problem: "Early-stage residential MEP drafting requires repetitive manual offset calculation, sanitary slope routing, and fixture connection. A single layout revision forces engineers to redraw sanitary and water supply lines, leading to drafting errors, pipe clashes, and delayed permit submissions.",
            constraints: [
                "Standard wall envelope: 230 mm exterior and 115 mm interior masonry partitions.",
                "Plumbing clearance rules: minimum 150 mm clearance from structural columns and +70 mm parallel offset between cold and hot supply lines.",
                "Export format must maintain full native compatibility with AutoCAD 2018+ (DXF R2018 format with strict layer indexing)."
            ],
            methodology: [
                "Developed room geometry parsing pipeline in Python that extracts boundary polygons and wall thicknesses.",
                "Designed a 4-state procedural plumbing pathfinder: detects fixture coordinates (water closet, basin, shower), computes gradient slope vectors, and routes drainage lines avoiding room centerlines.",
                "Built a parallel offset generator using 2D vector geometry to place supply conduits at consistent clearances.",
                "Integrated rule-of-thumb HVAC cooling load estimator based on room area, occupancy, and window solar gains (ASHRAE-aligned approximation).",
                "Generated structured, multi-layer DXF output with distinct layers for WALLS, DOORS, DRAINAGE, WATER_SUPPLY, and FIXTURES."
            ],
            meshStats: {
                topology: "Procedural 2D Vector Topology",
                elements: "Algorithmic Nodes & Offsets",
                layers: "12 Layer CAD DXF Standard",
                clearances: "70 mm Parallel / 150 mm Structural",
                output: "AutoCAD R2018 DXF + CSV Schedule"
            },
            verification: "Generated DXF layouts were imported into AutoCAD Drafter Studio and inspected for geometric continuity, zero unintended line intersections, and correct dimensional tolerances. Verified against manual MEP drafting conventions for standard 2-BHK residential floorplans.",
            results: [
                { label: "Layout Processing Speed", value: "< 250 ms", note: "Instant generation from parameters" },
                { label: "Geometric Clash Rate", value: "0 reported", note: "Rule-based collision avoidance" },
                { label: "Drafting Time Reduction", value: "~75%", note: "Compared to manual CAD line drafting" },
                { label: "Output Compatibility", value: "100% AutoCAD DXF", note: "Strict layer standards preserved" }
            ],
            limitations: [
                "Currently specialized for single-level 2D floorplans; 3D IFC/Revit BIM model generation is not yet supported in v1.2.",
                "HVAC heat load calculation uses simplified area-based tonnage estimation rather than dynamic multi-zone radiant time series (RTS).",
                "Complex non-orthogonal curvilinear walls are approximated with linear segmentation."
            ]
        },

        nozzle: {
            id: "nozzle",
            title: "20-Bar Circular Nozzle High-Pressure Compressible CFD",
            shortTitle: "20-Bar Convergent-Divergent Nozzle",
            category: "CFD & Compressible Flow",
            domain: "Aerospace Propulsion & Gas Dynamics",
            badge: "Gas Dynamics Verified",
            role: "CFD Simulation Engineer",
            status: "Completed",
            tools: "ANSYS Fluent • 3D Volume Mesh • Tecplot 360",
            primaryImage: "assets/images/ansys_nozzle_mesh_3d.png",
            hasComparison: false,
            summary: "3D axisymmetric compressible fluid dynamics analysis of a convergent-divergent supersonic nozzle operating at 20-bar chamber stagnation pressure. Evaluated sonic throat choking, expansion fan formation, and oblique shock wave diamond patterns in the exhaust plume.",
            problem: "High-pressure gas nozzles operating in under-expanded or over-expanded regimes experience severe shock-induced flow detachment along the divergent bell wall, which causes side-load oscillations and thrust vector misalignment.",
            constraints: [
                "Inlet stagnation pressure: P_0 = 20 bar (2.0 MPa), T_0 = 300 K.",
                "Ambient discharge: P_ambient = 1.01325 bar (sea-level exhaust).",
                "Working fluid: Ideal compressible air with temperature-dependent dynamic viscosity (Sutherland's law)."
            ],
            methodology: [
                "Formulated 3D axisymmetric nozzle domain with structured boundary layer inflation along the throat contour.",
                "Solved compressible Reynolds-Averaged Navier-Stokes equations with SST k-ω turbulence model.",
                "Density-based coupled implicit solver with second-order Roe-FDS flux-difference splitting.",
                "Monitored mass flow rate conservation across inlet, throat, and exit planes."
            ],
            meshStats: {
                topology: "Structured 3D Polyhedral/Hex Hybrid",
                elements: "520,000 Cells",
                nearWall: "y⁺ < 1.2 at throat contraction",
                boundaryInlet: "Pressure Inlet (20 bar total)",
                boundaryOutlet: "Pressure Outlet (1.013 bar ambient)"
            },
            verification: "Simulated throat Mach number and shock cell spacing were compared against 1D isentropic gas dynamics theory and Anderson's compressible flow formulations.",
            results: [
                { label: "Throat Mach Number", value: "1.002", note: "Theoretical value: 1.000 (0.2% discrepancy)" },
                { label: "Exit Mach Number", value: "2.44", note: "Supersonic expansion fully developed" },
                { label: "Mass Flow Conservation", value: "0.018%", note: "Inlet to outlet continuity residual" }
            ],
            limitations: [
                "High-temperature real-gas dissociation effects (γ variation above 1,500 K) were not modeled as stagnation temperature remained at 300 K.",
                "Steady-state RANS does not capture high-frequency acoustic feedback screech tones generated by shock-vortex interaction."
            ]
        },

        heatsink: {
            id: "heatsink",
            title: "Multi-Fin Aluminum Heat Sink Forced Convective Cooling FEA",
            shortTitle: "Multi-Fin Heat Sink Thermal FEA",
            category: "Thermal & Heat Transfer",
            domain: "Electronics Packaging & Thermal Management",
            badge: "Analytical Correlation 2.35%",
            role: "Thermal Analyst",
            status: "Completed & Analytically Verified",
            tools: "ANSYS Workbench (Steady-State Thermal) • FreeCAD",
            primaryImage: "assets/images/heatsink_thermal.png",
            hasComparison: false,
            summary: "Convective steady-state thermal finite element analysis of an extruded aluminum 6061-T6 multi-fin heat sink dissipating a Q = 100 W concentrated thermal load under forced air convection (h = 30 W/(m²·K)).",
            problem: "High-power electronic components require effective thermal spreading and fin heat rejection to maintain junction temperatures below the 85°C reliability limit.",
            constraints: [
                "Total heat dissipation: Q = 100 W applied evenly over a 40 mm × 40 mm central footprint.",
                "Forced air convective coefficient: h = 30 W/(m²·K), ambient temperature T_ambient = 25°C.",
                "Material: Aluminum Alloy 6061-T6 with isotropic thermal conductivity k = 205 W/(m·K)."
            ],
            methodology: [
                "Parametric 3D CAD model generated in FreeCAD with 12 vertical longitudinal cooling fins.",
                "Imported into ANSYS Steady-State Thermal with second-order tetrahedral and hexahedral elements.",
                "Applied Neumann heat flux condition at the base interface and Robin convective boundary condition on all exposed fin surfaces.",
                "Computed 3D temperature field and localized thermal resistance."
            ],
            meshStats: {
                topology: "3D Conformal Hex-Dominant",
                elements: "125,000 Elements (Academic Tier)",
                baseContact: "40 × 40 mm Heat Source Pad",
                boundaryFins: "Convection h = 30 W/(m²·K), T = 25°C",
                convergence: "Thermal energy residual < 10⁻⁸"
            },
            verification: "Peak base temperature was validated against a 1D analytical fin thermal resistance network (combining base conduction resistance, 1D corrected fin length efficiency, and convection resistance).",
            results: [
                { label: "FEA Peak Junction Temp", value: "66.84°C", note: "Safely below 85°C component limit" },
                { label: "1D Analytical Fin Model", value: "68.45°C", note: "Classic thermal resistance network" },
                { label: "Correlation Discrepancy", value: "2.35%", note: "Reflects 3D base spreading resistance" }
            ],
            limitations: [
                "Constant convective heat transfer coefficient h assumed across all fin channels without accounting for boundary layer growth along the duct length.",
                "Radiation heat transfer was neglected due to modest operating temperatures (< 70°C)."
            ]
        },

        conrod: {
            id: "conrod",
            title: "Internal Combustion Connecting Rod Modal Vibration & Fatigue FEA",
            shortTitle: "Connecting Rod Modal & Fatigue FEA",
            category: "Structural Dynamics & Fatigue",
            domain: "Automotive & Powertrain Engineering",
            badge: "Beam Theory Correlated 4.17%",
            role: "Structural Dynamics Analyst",
            status: "Completed",
            tools: "ANSYS Mechanical • SolidWorks",
            primaryImage: "assets/images/modal_mode1.png",
            hasComparison: false,
            summary: "Dynamic modal extraction and high-cycle structural fatigue analysis of a forged steel engine connecting rod under combined reciprocating inertia and peak gas pressure loading.",
            problem: "Connecting rods undergo severe cyclic tension-compression loading up to 12,000+ RPM. If resonant bending frequencies coincide with engine excitation harmonics, structural failure occurs rapidly.",
            constraints: [
                "Material: Forged 42CrMo4 steel (Yield strength 750 MPa, Tensile strength 1,000 MPa).",
                "Boundary conditions: Crank journal clamped fixed; piston wrist-pin bore subjected to frictionless cylindrical constraint.",
                "Target operational threshold: Safe operation above 12,000 RPM excitation harmonics."
            ],
            methodology: [
                "Imported detailed SolidWorks B-Rep model with realistic shank H-beam profile and lubrication channels.",
                "Meshed with second-order 10-node tetrahedral elements with localized refinement in rod-to-cap transition fillets.",
                "Extracted first 6 undamped natural frequencies and mode shapes using the Block Lanczos eigenvalue algorithm.",
                "Evaluated high-cycle fatigue life using Goodman mean-stress correction."
            ],
            meshStats: {
                topology: "10-Node Quadratic Tetrahedral",
                elements: "142,000 Elements",
                solver: "Block Lanczos Eigenvalue Extraction",
                fatigueModel: "Goodman Mean-Stress Correction",
                modesExtracted: "First 6 Transverse & Torsional Modes"
            },
            verification: "The fundamental transverse bending mode f₁ was benchmarked against an equivalent analytical Euler-Bernoulli pinned-clamped beam model.",
            results: [
                { label: "Fundamental Bending Frequency (f₁)", value: "234.40 Hz", note: "First natural transverse mode" },
                { label: "Analytical Beam Calculation", value: "244.60 Hz", note: "Euler-Bernoulli equivalent" },
                { label: "Resonant Speed Margin", value: "> 14,000 RPM", note: "Safely above maximum engine operating redline" },
                { label: "High-Cycle Fatigue Factor of Safety", value: "> 2.2", note: "Infinite life (> 10⁷ cycles)" }
            ],
            limitations: [
                "Thermal expansion from combustion gas transfer down the wrist pin was not included in modal extraction.",
                "Linear elastic material model used; elastoplastic micro-yielding at notch roots was not evaluated."
            ]
        },

        cad_machine: {
            id: "cad_machine",
            title: "Parametric 3D Machine Assemblies & ASME Y14.5 Production Drawings",
            shortTitle: "Parametric Machine Design & GD&T",
            category: "3D CAD & Manufacturing",
            domain: "Mechanical Design & Manufacturing Engineering",
            badge: "ASME Y14.5 GD&T Standard",
            role: "Mechanical CAD Drafter & Product Modeler",
            status: "Production Ready",
            tools: "SolidWorks • Autodesk Fusion 360",
            primaryImage: "assets/images/smartphone_chassis_cad.png",
            hasComparison: false,
            summary: "Precision 3D parametric machine assemblies, consumer electronics chassis, snap-fit components, and ASME Y14.5 standard manufacturing drawings with tolerance stack-up analysis.",
            problem: "Consumer hardware and industrial machinery components require strict interference-free assembly and precise geometric tolerancing to prevent binding, fit failures, and manufacturing re-work.",
            constraints: [
                "Standard manufacturing tolerance: ±0.05 mm on critical mating features.",
                "Draft angles ≥ 1.5° for injection-molded components.",
                "All production drawings formatted to ASME Y14.5 geometric dimensioning and tolerancing standards."
            ],
            methodology: [
                "Parametric top-down assembly modeling in SolidWorks and Fusion 360.",
                "Full 3D kinematic assembly motion analysis and clearance checks.",
                "Worst-case and RSS (Root Sum Squares) 1D and 2D tolerance stack-up calculation.",
                "Generation of fully annotated manufacturing fabrication packages (STEP, IGES, PDF drawing sheets)."
            ],
            meshStats: {
                topology: "Parametric B-Rep Solid CAD",
                tolerances: "±0.05 mm Precision Machining",
                standards: "ASME Y14.5 GD&T Callouts",
                formats: "STEP, IGES, Native SLDPRT, PDF Drawings"
            },
            verification: "Assemblies verified through automated CAD interference detection tools, ensuring zero solid-to-solid interpenetration across full operational movement envelope.",
            results: [
                { label: "Interference Volume", value: "0.00 mm³", note: "100% collision-free assembly" },
                { label: "Tolerancing Protocol", value: "ASME Y14.5", note: "Standard GD&T datum referencing" },
                { label: "Fabrication Readiness", value: "Verified", note: "Ready for CNC and rapid prototyping" }
            ],
            limitations: [
                "Material supplier variance was accounted for via worst-case bounds rather than full statistical Monte Carlo process simulation."
            ]
        },

        chair: {
            id: "chair",
            title: "Ergonomic Seating Surface Flow & Pressure Distribution CFD",
            shortTitle: "Ergonomic Seating Surface CFD",
            category: "CFD & Aerodynamics",
            domain: "Industrial Design & Aerodynamics",
            badge: "RANS Wake Study",
            role: "CFD Analyst",
            status: "Completed",
            tools: "ANSYS Fluent • Polyhedral Mesh Engine",
            primaryImage: "assets/images/chair_fluent_pressure_contour.png",
            hasComparison: false,
            summary: "Computational fluid dynamics analysis examining low-speed airflow recirculation patterns and aerodynamic pressure distribution over contoured ergonomic seating furniture.",
            problem: "Complex sculpted furniture surfaces generate localized boundary layer separation and wake recirculation, useful for understanding external convection and ventilation in occupied spaces.",
            constraints: [
                "Inlet airspeed: 15 m/s in virtual low-speed test domain.",
                "Full-scale 3D surface model with high-curvature transitional radii."
            ],
            methodology: [
                "Reconstructed closed watertight surface manifold from polygonal CAD geometry.",
                "Created polyhedral computational volume with 5 prism boundary inflation layers.",
                "Solved steady-state incompressible Navier-Stokes equations with Realizable k-ε turbulence model.",
                "Calculated pressure coefficients, localized stagnation zones, and recirculation volume."
            ],
            meshStats: {
                topology: "Unstructured Polyhedral with Prism Layers",
                elements: "380,000 Cells",
                inletVelocity: "15 m/s Uniform Flow",
                convergence: "Residuals stabilized < 10⁻⁵"
            },
            verification: "Convergence verified through continuous force monitor stabilization and residual reduction below 10⁻⁵.",
            results: [
                { label: "Drag Coefficient (C_D)", value: "0.82", note: "Bluff body aerodynamic response" },
                { label: "Recirculation Wake Depth", value: "1.4x Chair Depth", note: "Low-pressure base region mapped" }
            ],
            limitations: [
                "Convective thermal comfort and porous fabric boundary interaction were not included in this pure aerodynamic run."
            ]
        },

        enterprise_ap: {
            id: "enterprise_ap",
            title: "Multi-Branch Financial Operations & Accounts Payable Automation",
            shortTitle: "Enterprise AP & Financial Pipeline",
            category: "Data Systems & Automation",
            domain: "Operations Engineering & Data Architecture",
            badge: "5-Branch Consolidation",
            role: "Operational Systems Developer (Freelance Deliverable)",
            status: "Active Production Use",
            tools: "Excel Advanced Data Engine • Python ETL Scripts • Multi-Branch AP Pipeline",
            primaryImage: "assets/images/enterprise_ap_ui.png",
            hasComparison: false,
            summary: "Automated corporate financial operations and Accounts Payable data pipeline engineered for an enterprise retail/wholesale group across 5 active branches (MM Core, AKG Shared, Ajman/Warehouse, etc.).",
            problem: "Manual reconciliation of high-volume supplier purchase invoices (GRV), return credits (PR/CR), and handwritten cheque disbursements across 5 geographically separated branches created multi-week reconciliation delays and risk of double payments.",
            constraints: [
                "Data pipeline had to run on standard office hardware without requiring complex enterprise cloud server migrations.",
                "Must support Mode A (standard invoice ledger) and Mode B (multi-currency import batches).",
                "Cheque maturity dates and urgent clearing queues required real-time visibility."
            ],
            methodology: [
                "Engineered multi-sheet relational workbook architecture with parameterized branch connectors.",
                "Built automated Urgent Verification queue extraction filtering pending payments by due date and supplier credit terms.",
                "Developed cheque tracking reconciliation pipeline linking issued cheques to bank statement clearances.",
                "Constructed dynamic executive dashboard visualizing accounts payable aging brackets and pending supplier claims."
            ],
            meshStats: {
                topology: "Multi-Branch Relational Data Schema",
                scope: "5 Active Corporate Operating Entities",
                queueTypes: "Urgent Clearance, Mode A / Mode B Ledgers",
                reconciliation: "Automated Cheque-to-Statement Matching"
            },
            verification: "Month-end balances verified against official supplier statements and banking portal records with zero discrepancies.",
            results: [
                { label: "Reconciliation Overhead", value: "~80% Reduction", note: "Automated status filtering" },
                { label: "Active Group Branches", value: "5 Entities", note: "Seamlessly consolidated" },
                { label: "Ledger Discrepancies", value: "Zero Unresolved", note: "Continuous audit validation" }
            ],
            limitations: [
                "Client operates on local consolidated workbooks; future roadmap involves migration to dedicated PostgreSQL / web-based ERP backend."
            ]
        },

        tesla_flying_car: {
            id: "tesla_flying_car",
            title: "Aero-Concept: 3D Autonomous Flying Vehicle & VTOL Aerodynamics",
            shortTitle: "Aero-Concept VTOL Flying Car",
            category: "3D CAD & Aerodynamics",
            domain: "Conceptual Vehicle Architecture",
            badge: "Aerodynamic Concept",
            role: "3D Concept Modeler & Computational Designer",
            status: "Concept Exploration",
            tools: "Blender 3D • SolidWorks • CFD Surface Evaluation",
            primaryImage: "assets/images/tesla_flying_car_3d.png",
            hasComparison: false,
            summary: "Conceptual 3D design and aerodynamic study of an electric vertical takeoff and landing (eVTOL) vehicle combining ground sports vehicle aesthetics with flight aerodynamics.",
            problem: "Transition between horizontal road cruising and vertical flight requires packaging ducted thruster units within aerodynamic body lines without causing excessive parasite drag or pitch instability.",
            constraints: [
                "Conceptual aerodynamic study (non-commercial exploratory design).",
                "Target ground cruise drag coefficient C_d < 0.25; target flight glide ratio L/D > 4.0."
            ],
            methodology: [
                "Sculpted parametric 3D body surfaces with integrated ground-effect venturi underbody tunnels.",
                "Designed retractable ducted quad-rotors concealed inside wheel-hub enclosures for VTOL transition.",
                "Conducted preliminary aerodynamic pressure distribution evaluation across high-downforce dual-element wing.",
                "Rendered photorealistic technical animations and dimensioned CAD views."
            ],
            meshStats: {
                topology: "Subdivision Surface & B-Rep Solid",
                designDomain: "eVTOL Dual-Mode Vehicle Concept",
                aeroFeatures: "Ground-Effect Venturi & Variable Wing",
                visualization: "Blender Cycles Photorealistic Studio"
            },
            verification: "Aerodynamic design targets evaluated using preliminary CFD surface stream traces.",
            results: [
                { label: "Estimated Cruise Drag (C_d)", value: "0.21 (Design Target)", note: "Simulated streamline expectation" },
                { label: "Estimated Transition Glide (L/D)", value: "4.2 (Design Target)", note: "Aero-concept target metric" },
                { label: "Concept Nature", value: "Exploratory Study", note: "Distinct from certified flight hardware" }
            ],
            limitations: [
                "Exploratory conceptual project; does not include FAA/EASA airworthiness certification, structural flutter testing, or battery energy density feasibility calculations."
            ]
        }
    };

    // =========================================================================
    // 2. COMPARISON SLIDER COMPONENT
    // =========================================================================
    class ComparisonSlider {
        constructor(containerElement) {
            if (!containerElement) return;
            this.container = containerElement;
            this.beforeImage = this.container.querySelector('.slider-before');
            this.afterImage = this.container.querySelector('.slider-after');
            this.handle = this.container.querySelector('.slider-handle');
            this.sliderLine = this.container.querySelector('.slider-line');
            this.value = 50;
            this.isDragging = false;
            this.init();
        }

        init() {
            if (!this.beforeImage || !this.handle) return;

            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            if (prefersReducedMotion) {
                this.container.classList.add('reduced-motion');
            }

            this.updatePosition(this.value);

            const onPointerMove = (e) => {
                if (!this.isDragging) return;
                const rect = this.container.getBoundingClientRect();
                const clientX = e.clientX ?? (e.touches && e.touches[0] ? e.touches[0].clientX : rect.left);
                const x = clientX - rect.left;
                let percent = (x / rect.width) * 100;
                percent = Math.max(0, Math.min(100, percent));
                this.updatePosition(percent);
            };

            const onPointerUp = () => {
                if (this.isDragging) {
                    this.isDragging = false;
                    window.removeEventListener('pointermove', onPointerMove);
                    window.removeEventListener('pointerup', onPointerUp);
                    window.removeEventListener('pointercancel', onPointerUp);
                }
            };

            const onPointerDown = (e) => {
                this.isDragging = true;
                onPointerMove(e);
                window.addEventListener('pointermove', onPointerMove);
                window.addEventListener('pointerup', onPointerUp);
                window.addEventListener('pointercancel', onPointerUp);
            };

            this.container.addEventListener('pointerdown', onPointerDown);

            this.handle.setAttribute('role', 'slider');
            this.handle.setAttribute('aria-label', 'Reveal simulation contours from computational mesh');
            this.handle.setAttribute('aria-valuemin', '0');
            this.handle.setAttribute('aria-valuemax', '100');
            this.handle.setAttribute('aria-valuenow', '50');
            this.handle.setAttribute('tabindex', '0');

            this.handle.addEventListener('keydown', (e) => {
                let step = 5;
                if (e.shiftKey) step = 15;

                if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
                    e.preventDefault();
                    this.updatePosition(Math.max(0, this.value - step));
                } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
                    e.preventDefault();
                    this.updatePosition(Math.min(100, this.value + step));
                } else if (e.key === 'Home') {
                    e.preventDefault();
                    this.updatePosition(0);
                } else if (e.key === 'End') {
                    e.preventDefault();
                    this.updatePosition(100);
                }
            });
        }

        updatePosition(percent) {
            this.value = Math.round(percent);
            if (this.beforeImage) {
                this.beforeImage.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
            }
            if (this.handle) {
                this.handle.style.left = `${percent}%`;
                this.handle.setAttribute('aria-valuenow', String(this.value));
            }
            if (this.sliderLine) {
                this.sliderLine.style.left = `${percent}%`;
            }
        }
    }

    // =========================================================================
    // 3. ACCESSIBLE MODAL DIALOG CONTROLLER (WAI-ARIA)
    // =========================================================================
    let activeTriggerElement = null;
    let currentModalSlider = null;
    const FOCUSABLE_SELECTORS = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

    function initModalDialog() {
        const modal = document.getElementById('tech-modal');
        if (!modal) return;

        const closeBtn = document.getElementById('modal-close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (modal.classList.contains('hidden')) return;

            if (e.key === 'Escape') {
                e.preventDefault();
                closeModal();
                return;
            }

            if (e.key === 'Tab') {
                const focusable = modal.querySelectorAll(FOCUSABLE_SELECTORS);
                if (focusable.length === 0) return;
                const first = focusable[0];
                const last = focusable[focusable.length - 1];

                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        });

        // Tablist keyboard navigation (ArrowLeft / ArrowRight)
        const tablist = modal.querySelector('[role="tablist"]');
        if (tablist) {
            const tabs = tablist.querySelectorAll('[role="tab"]');
            tabs.forEach((tab, index) => {
                tab.addEventListener('keydown', (e) => {
                    let targetIndex = null;
                    if (e.key === 'ArrowRight') targetIndex = (index + 1) % tabs.length;
                    else if (e.key === 'ArrowLeft') targetIndex = (index - 1 + tabs.length) % tabs.length;
                    else if (e.key === 'Home') targetIndex = 0;
                    else if (e.key === 'End') targetIndex = tabs.length - 1;

                    if (targetIndex !== null) {
                        e.preventDefault();
                        tabs[targetIndex].focus();
                        tabs[targetIndex].click();
                    }
                });
            });
        }

        handleUrlHash();
        window.addEventListener('hashchange', handleUrlHash);
    }

    function handleUrlHash() {
        const hash = window.location.hash;
        const match = hash.match(/^#(?:case-study|project)-([a-z0-9_]+)$/i);
        if (match && match[1]) {
            const projectId = match[1].toLowerCase();
            if (CASE_STUDIES[projectId]) {
                setTimeout(() => {
                    openCaseStudy(projectId, null, false);
                }, 100);
            }
        }
    }

    function openCaseStudy(projectId, triggerBtn, updateHash) {
        if (updateHash === undefined) updateHash = true;
        const data = CASE_STUDIES[projectId];
        const modal = document.getElementById('tech-modal');
        if (!data || !modal) return;

        activeTriggerElement = triggerBtn || document.activeElement;

        if (updateHash) {
            history.replaceState(null, '', `#case-study-${projectId}`);
        }

        document.getElementById('cm-title').textContent = data.title;
        document.getElementById('cm-category').textContent = data.category;
        document.getElementById('cm-role').textContent = data.role;
        document.getElementById('cm-tools').textContent = data.tools;
        document.getElementById('cm-badge').textContent = data.badge;

        const mediaContainer = document.getElementById('cm-media-container');
        if (mediaContainer) {
            if (data.hasComparison && data.meshImage && data.primaryImage) {
                mediaContainer.innerHTML = `
                    <div class="comparison-slider relative w-full h-[260px] sm:h-[340px] md:h-[400px] rounded-2xl overflow-hidden bg-black border border-white/10 select-none shadow-xl">
                        <img src="${data.primaryImage}" alt="${data.title} simulation contour" class="slider-after absolute inset-0 w-full h-full object-contain bg-[#06080C]" width="800" height="450">
                        <img src="${data.meshImage}" alt="${data.title} computational mesh" class="slider-before absolute inset-0 w-full h-full object-contain bg-[#06080C]" width="800" height="450">
                        <div class="slider-line absolute top-0 bottom-0 w-0.5 bg-[#F59E46] shadow-[0_0_10px_#F59E46]"></div>
                        <button type="button" class="slider-handle absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#F59E46] text-[#080A0D] flex items-center justify-center font-bold text-xs shadow-lg cursor-ew-resize border border-white focus:outline-none focus:ring-2 focus:ring-white">
                            ⇄
                        </button>
                        <div class="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-sm border border-white/10 text-[10px] font-mono text-neutral-300">
                            ◀ Mesh Structure | Simulation Contours ▶
                        </div>
                    </div>
                `;
                const sliderEl = mediaContainer.querySelector('.comparison-slider');
                currentModalSlider = new ComparisonSlider(sliderEl);
            } else {
                mediaContainer.innerHTML = `
                    <div class="relative w-full h-[260px] sm:h-[340px] md:h-[400px] rounded-2xl overflow-hidden bg-[#06080C] border border-white/10 flex items-center justify-center">
                        <img src="${data.primaryImage}" alt="${data.title}" class="w-full h-full object-contain" width="800" height="450">
                        <div class="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-sm border border-white/10 text-[10px] font-mono text-[#F59E46]">
                            ${data.badge}
                        </div>
                    </div>
                `;
                currentModalSlider = null;
            }
        }

        // Tab 1: Overview
        document.getElementById('cm-overview').textContent = data.summary;
        document.getElementById('cm-problem').textContent = data.problem;
        const constraintsList = document.getElementById('cm-constraints');
        if (constraintsList) {
            constraintsList.innerHTML = (data.constraints || []).map(c => `
                <li class="flex items-start space-x-2 text-xs text-[#A4AAB5]">
                    <span class="text-[#F59E46] font-bold mt-0.5">▸</span>
                    <span>${c}</span>
                </li>
            `).join('');
        }

        // Tab 2: Methodology
        const methodContainer = document.getElementById('cm-methodology');
        if (methodContainer) {
            methodContainer.innerHTML = (data.methodology || []).map(m => `
                <li class="flex items-start space-x-2.5 text-xs text-[#CBD5E1] leading-relaxed">
                    <span class="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0"></span>
                    <span>${m}</span>
                </li>
            `).join('');
        }
        const meshStatsContainer = document.getElementById('cm-mesh-stats');
        if (meshStatsContainer && data.meshStats) {
            meshStatsContainer.innerHTML = Object.entries(data.meshStats).map(([key, val]) => `
                <div class="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                    <div class="text-[10px] uppercase font-mono text-[#94A3B8]">${key.replace(/([A-Z])/g, ' $1')}</div>
                    <div class="text-xs font-bold text-[#F5F7FB] mt-0.5">${val}</div>
                </div>
            `).join('');
        }

        // Tab 3: Results
        document.getElementById('cm-verification').textContent = data.verification;
        const resultsContainer = document.getElementById('cm-results-grid');
        if (resultsContainer) {
            resultsContainer.innerHTML = (data.results || []).map(r => `
                <div class="p-3.5 rounded-xl bg-white/[0.04] border border-[#F59E46]/30">
                    <div class="text-[11px] font-mono text-[#F59E46]">${r.label}</div>
                    <div class="text-base sm:text-lg font-black text-white mt-1">${r.value}</div>
                    <div class="text-[10px] text-[#94A3B8] font-mono mt-0.5">${r.note}</div>
                </div>
            `).join('');
        }

        // Tab 4: Limitations
        const limitationsList = document.getElementById('cm-limitations');
        if (limitationsList) {
            limitationsList.innerHTML = (data.limitations || []).map(l => `
                <li class="flex items-start space-x-2 text-xs text-[#A4AAB5] leading-relaxed">
                    <span class="text-amber-400 font-bold mt-0.5">⚠️</span>
                    <span>${l}</span>
                </li>
            `).join('');
        }

        const waBtn = document.getElementById('cm-whatsapp-btn');
        if (waBtn) {
            const msg = encodeURIComponent(`Hello Ibrahim, I am reviewing your verified engineering case study on "${data.title}" and would like to discuss engineering analysis.`);
            waBtn.href = `https://wa.me/919446631380?text=${msg}`;
        }

        switchModalTab('overview');

        modal.classList.remove('hidden');
        modal.classList.add('flex');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        const closeBtn = document.getElementById('modal-close-btn');
        if (closeBtn) closeBtn.focus();
    }

    function switchModalTab(tabId) {
        const tabs = ['overview', 'methodology', 'results', 'limitations'];
        tabs.forEach(t => {
            const btn = document.getElementById(`tab-btn-${t}`);
            const pane = document.getElementById(`pane-${t}`);
            if (!btn || !pane) return;

            if (t === tabId) {
                btn.classList.add('active');
                btn.setAttribute('aria-selected', 'true');
                btn.setAttribute('tabindex', '0');
                pane.classList.remove('hidden');
            } else {
                btn.classList.remove('active');
                btn.setAttribute('aria-selected', 'false');
                btn.setAttribute('tabindex', '-1');
                pane.classList.add('hidden');
            }
        });
    }

    function closeModal() {
        const modal = document.getElementById('tech-modal');
        if (!modal || modal.classList.contains('hidden')) return;

        modal.classList.remove('flex');
        modal.classList.add('hidden');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';

        if (window.location.hash.startsWith('#case-study-') || window.location.hash.startsWith('#project-')) {
            history.replaceState(null, '', window.location.pathname + window.location.search);
        }

        if (activeTriggerElement && typeof activeTriggerElement.focus === 'function') {
            activeTriggerElement.focus();
            activeTriggerElement = null;
        }
    }

    // =========================================================================
    // 4. NAVIGATION, SCROLLSPY, FILTERS & THEME
    // =========================================================================
    function initNavigation() {
        // Mobile Drawer
        const toggleBtn = document.getElementById('mobile-menu-toggle');
        const drawer = document.getElementById('mobile-drawer');
        const ham = document.getElementById('hamburger-icon');
        const close = document.getElementById('close-icon');

        if (toggleBtn && drawer) {
            function openDrawer() {
                drawer.classList.remove('hidden');
                if (ham) ham.classList.add('hidden');
                if (close) close.classList.remove('hidden');
                toggleBtn.setAttribute('aria-expanded', 'true');
            }
            function closeDrawer() {
                drawer.classList.add('hidden');
                if (ham) ham.classList.remove('hidden');
                if (close) close.classList.add('hidden');
                toggleBtn.setAttribute('aria-expanded', 'false');
            }

            toggleBtn.addEventListener('click', () => {
                if (drawer.classList.contains('hidden')) openDrawer();
                else closeDrawer();
            });

            drawer.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', closeDrawer);
            });

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && !drawer.classList.contains('hidden')) {
                    closeDrawer();
                    toggleBtn.focus();
                }
            });
        }

        // Scrollspy
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('#desktop-nav .nav-item');
        if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const id = entry.target.getAttribute('id');
                        navLinks.forEach(link => {
                            if (link.getAttribute('href') === `#${id}`) {
                                link.classList.add('active');
                                link.setAttribute('aria-current', 'page');
                            } else {
                                link.classList.remove('active');
                                link.removeAttribute('aria-current');
                            }
                        });
                    }
                });
            }, { rootMargin: '-20% 0px -60% 0px' });

            sections.forEach(s => observer.observe(s));
        }

        // Project Filter Chips
        const filterWrapper = document.getElementById('filter-wrapper');
        if (filterWrapper) {
            const chips = filterWrapper.querySelectorAll('button[data-filter]');
            const cards = document.querySelectorAll('#projects-feed article');

            chips.forEach(chip => {
                chip.addEventListener('click', () => {
                    const category = chip.getAttribute('data-filter');
                    chips.forEach(c => {
                        c.classList.remove('active');
                        c.setAttribute('aria-selected', 'false');
                    });
                    chip.classList.add('active');
                    chip.setAttribute('aria-selected', 'true');

                    cards.forEach(card => {
                        if (category === 'all' || card.classList.contains(category)) {
                            card.style.display = 'flex';
                        } else {
                            card.style.display = 'none';
                        }
                    });
                });
            });
        }
    }

    function toggleHeroTheme() {
        const isWhite = document.body.classList.toggle('white-view-theme');
        const eyeLabel = document.getElementById('hero-eye-label');
        if (eyeLabel) {
            eyeLabel.textContent = isWhite ? 'SWITCH: DARK OBSIDIAN' : 'SWITCH: WHITE VIEW';
        }
    }

    function toggleFaq(btn) {
        const item = btn.closest('.faq-item');
        if (!item) return;
        const isActive = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(i => {
            i.classList.remove('active');
            const b = i.querySelector('.faq-trigger');
            if (b) b.setAttribute('aria-expanded', 'false');
        });
        if (!isActive) {
            item.classList.add('active');
            btn.setAttribute('aria-expanded', 'true');
        }
    }

    // =========================================================================
    // 5. RESTRICTED HERO CFD CANVAS (Respects prefers-reduced-motion)
    // =========================================================================
    function initHeroCfdCanvas() {
        const canvas = document.getElementById('hero-cfd-canvas');
        if (!canvas) return;

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            canvas.style.display = 'none';
            return;
        }

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width, height;
        let particles = [];
        const PARTICLE_COUNT = 30;

        function resize() {
            const parent = canvas.parentElement;
            if (!parent) return;
            width = canvas.width = parent.clientWidth;
            height = canvas.height = parent.clientHeight;
            initParticles();
        }

        function initParticles() {
            particles = [];
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    speed: 0.7 + Math.random() * 1.2,
                    length: 20 + Math.random() * 40,
                    opacity: 0.15 + Math.random() * 0.25,
                    color: Math.random() > 0.4 ? 'rgba(245, 158, 70, ' : 'rgba(83, 187, 200, '
                });
            }
        }

        let animId;
        function render() {
            ctx.clearRect(0, 0, width, height);
            particles.forEach(p => {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p.x + p.length, p.y);
                ctx.strokeStyle = p.color + p.opacity + ')';
                ctx.lineWidth = 1;
                ctx.stroke();

                p.x += p.speed;
                if (p.x > width) {
                    p.x = -p.length;
                    p.y = Math.random() * height;
                }
            });
            animId = requestAnimationFrame(render);
        }

        window.addEventListener('resize', resize, { passive: true });
        resize();
        render();

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) cancelAnimationFrame(animId);
            else render();
        });
    }

    // =========================================================================
    // 6. INITIALIZATION ON DOM READY
    // =========================================================================
    
    // =========================================================================
    // RESTORED SIGNATURE EXPERIENCE 1: 360° ROTARY CAPABILITY ORBIT CONTROLLER
    // =========================================================================
        const ORBIT_DISCIPLINES = [
            { 
                id: "cfd",
                title: "CAE & SIMULATION", 
                filter: "cfd", 
                color: "#6366F1",
                glow: "rgba(99,102,241,0.65)", 
                border: "rgba(99,102,241,0.95)",
                aura: "radial-gradient(circle 540px at 50% 50%, rgba(99, 102, 241, 0.22), rgba(30, 27, 75, 0.12) 55%, transparent 85%)",
                animId: "anim-cfd"
            },
            { 
                id: "cad",
                title: "CAD & MACHINE DESIGN", 
                filter: "cad", 
                color: "#F59E0B",
                glow: "rgba(245,158,11,0.65)", 
                border: "rgba(245,158,11,0.95)",
                aura: "radial-gradient(circle 540px at 50% 50%, rgba(245, 158, 11, 0.22), rgba(69, 26, 3, 0.12) 55%, transparent 85%)",
                animId: "anim-cad"
            },
            { 
                id: "mep",
                title: "AUTOMATION & MEP (MEPLANIQ)", 
                filter: "mep", 
                color: "#10B981",
                glow: "rgba(16,185,129,0.75)", 
                border: "rgba(52,211,153,0.95)",
                aura: "radial-gradient(circle 540px at 50% 50%, rgba(16, 185, 129, 0.24), rgba(6, 78, 59, 0.12) 55%, transparent 85%)",
                animId: "anim-mep"
            },
            { 
                id: "ops",
                title: "DATA & AP OPERATIONS", 
                filter: "mep", 
                color: "#F97316",
                glow: "rgba(249,115,22,0.65)", 
                border: "rgba(249,115,22,0.95)",
                aura: "radial-gradient(circle 540px at 50% 50%, rgba(249, 115, 22, 0.22), rgba(24, 24, 27, 0.15) 55%, transparent 85%)",
                animId: "anim-ops"
            },
            { 
                id: "motion",
                title: "3D RENDERING & MOTION", 
                filter: "all", 
                color: "#06B6D4",
                glow: "rgba(6,182,212,0.65)", 
                border: "rgba(6,182,212,0.95)",
                aura: "radial-gradient(circle 540px at 50% 50%, rgba(6, 182, 212, 0.24), rgba(8, 51, 68, 0.12) 55%, transparent 85%)",
                animId: "anim-motion"
            }
        ];

        let orbitActiveIndex = 2; // MEPLANIQ initially centered in front
        let orbitWheelCooldown = false;

        function getOrbitParams() {
            const w = window.innerWidth;
            if (w >= 1280) {
                return { rx: 440, ry: 32, maxScale: 1.15, minScale: 0.78, maxRot: 20 };
            } else if (w >= 1024) {
                return { rx: 370, ry: 28, maxScale: 1.10, minScale: 0.75, maxRot: 18 };
            } else if (w >= 768) {
                return { rx: 290, ry: 24, maxScale: 1.06, minScale: 0.72, maxRot: 15 };
            } else {
                return { rx: 160, ry: 0, maxScale: 1.02, minScale: 0.80, maxRot: 0 };
            }
        }

        function updateOrbitLayout() {
            const cards = document.querySelectorAll('.orbit-card');
            const pills = document.querySelectorAll('.orbit-indicator-pill');
            const stationLabel = document.getElementById('orbit-station-label');
            const params = getOrbitParams();
            const isMobile = window.innerWidth < 640;

            cards.forEach((card, i) => {
                // Difference from active index normalized to [-180, 180] degrees
                const diff = (i - orbitActiveIndex + 5) % 5;
                let deg = diff * 72;
                if (deg > 180) deg -= 360; // 0, 72, 144, -144, -72
                
                const isFront = (deg === 0);
                const disc = ORBIT_DISCIPLINES[i];

                if (isMobile) {
                    // Mobile: single card visible in center, smooth horizontal slide
                    if (isFront) {
                        card.style.transform = 'translate3d(0px, 0px, 0px) scale(1)';
                        card.style.opacity = '1';
                        card.style.zIndex = '50';
                        card.style.pointerEvents = 'auto';
                    } else if (diff === 1 || diff === -4) {
                        card.style.transform = 'translate3d(120%, 0px, 0px) scale(0.85)';
                        card.style.opacity = '0';
                        card.style.zIndex = '10';
                        card.style.pointerEvents = 'none';
                    } else if (diff === 4 || diff === -1) {
                        card.style.transform = 'translate3d(-120%, 0px, 0px) scale(0.85)';
                        card.style.opacity = '0';
                        card.style.zIndex = '10';
                        card.style.pointerEvents = 'none';
                    } else {
                        card.style.transform = 'translate3d(0px, 0px, -200px) scale(0.6)';
                        card.style.opacity = '0';
                        card.style.zIndex = '1';
                        card.style.pointerEvents = 'none';
                    }
                } else {
                    const rad = deg * (Math.PI / 180);
                    const sin = Math.sin(rad);
                    const cos = Math.cos(rad);

                    // Circular coordinates on the ellipse
                    const x = sin * params.rx;
                    const y = (1 - cos) * params.ry;

                    // Depth factor t from 0 (back) to 1 (front apex)
                    const t = (cos + 1) / 2;
                    
                    // Scale swells dynamically as card travels to front
                    const scale = params.minScale + (params.maxScale - params.minScale) * Math.pow(t, 1.25);
                    const rotY = -sin * params.maxRot;
                    const rotZ = -sin * 1.2;
                    const opacity = isFront ? 1.0 : (Math.abs(deg) === 72 ? 0.72 : 0.25);
                    const zIndex = Math.round(t * 50) + 10;

                    card.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0px) rotateY(${rotY.toFixed(1)}deg) rotateZ(${rotZ.toFixed(1)}deg) scale(${scale.toFixed(3)})`;
                    card.style.opacity = opacity.toFixed(2);
                    card.style.zIndex = zIndex;
                    card.style.pointerEvents = 'auto';
                }

                if (isFront) {
                    card.classList.add('is-active');
                    card.style.boxShadow = `0 25px 65px -10px ${disc.glow}, 0 0 35px ${disc.glow}`;
                    card.style.borderColor = disc.border;
                } else {
                    card.classList.remove('is-active');
                    card.style.boxShadow = `0 10px 30px -10px rgba(0,0,0,0.7)`;
                    card.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                }
            });

            // Update discipline-specific background vector animations
            const animLayers = ['anim-cfd', 'anim-cad', 'anim-mep', 'anim-ops', 'anim-motion'];
            const activeDisc = ORBIT_DISCIPLINES[orbitActiveIndex];
            animLayers.forEach(id => {
                const el = document.getElementById(id);
                if (el) {
                    if (activeDisc && activeDisc.animId === id) {
                        el.classList.remove('opacity-0');
                        el.classList.add('opacity-100');
                    } else {
                        el.classList.remove('opacity-100');
                        el.classList.add('opacity-0');
                    }
                }
            });

            // Update soft background colour aura spread
            const auraEl = document.getElementById('focus-ambient-aura');
            if (auraEl && activeDisc && activeDisc.aura) {
                auraEl.style.background = activeDisc.aura;
            }

            // Update bottom indicator pills
            pills.forEach((p, idx) => {
                if (idx === orbitActiveIndex) {
                    p.classList.add('active');
                } else {
                    p.classList.remove('active');
                }
            });

            // Update top station readout
            if (stationLabel && ORBIT_DISCIPLINES[orbitActiveIndex]) {
                stationLabel.textContent = `[0${orbitActiveIndex + 1} / 05] ${ORBIT_DISCIPLINES[orbitActiveIndex].title}`;
            }
        }

        function rotateOrbitTo(index) {
            orbitActiveIndex = ((index % 5) + 5) % 5;
            updateOrbitLayout();
        }

        function nextOrbitCard() {
            rotateOrbitTo(orbitActiveIndex + 1);
        }

        function prevOrbitCard() {
            rotateOrbitTo(orbitActiveIndex - 1);
        }

        function handleCardClick(index) {
            if (index === orbitActiveIndex) {
                // If clicked while already front card, filter relevant projects
                const disc = ORBIT_DISCIPLINES[index];
                if (disc && disc.filter) {
                    filterProjects(disc.filter);
                }
            } else {
                // Rotate clicked card to the front
                rotateOrbitTo(index);
            }
        }

        function initOrbitCarousel() {
            const stage = document.getElementById('orbit-stage-container');
            if (!stage) return;

            updateOrbitLayout();

            // Rotary Carousel Wheel Rotation Listener (restored per user request: spins cards smoothly on wheel scroll)
            stage.addEventListener('wheel', (e) => {
                const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
                if (Math.abs(delta) > 12) {
                    e.preventDefault();
                    if (!orbitWheelCooldown) {
                        orbitWheelCooldown = true;
                        if (delta > 0) {
                            nextOrbitCard();
                        } else {
                            prevOrbitCard();
                        }
                        setTimeout(() => { orbitWheelCooldown = false; }, 320);
                    }
                }
            }, { passive: false });

            // Touch swipe support: strictly horizontal swipes rotate cards; vertical gestures scroll page freely
            let touchStartX = 0;
            let touchStartY = 0;
            stage.addEventListener('touchstart', (e) => {
                touchStartX = e.touches[0].clientX;
                touchStartY = e.touches[0].clientY;
            }, { passive: true });

            stage.addEventListener('touchend', (e) => {
                const diffX = e.changedTouches[0].clientX - touchStartX;
                const diffY = e.changedTouches[0].clientY - touchStartY;
                if (Math.abs(diffX) > Math.abs(diffY) * 1.6 && Math.abs(diffX) > 40) {
                    if (diffX < 0) {
                        nextOrbitCard();
                    } else {
                        prevOrbitCard();
                    }
                }
            }, { passive: true });

            // Direct Horizontal Mouse Drag on Carousel Track
            const orbitTrack = document.getElementById('orbit-track');
            if (orbitTrack) {
                let isDragging = false;
                let startX = 0;
                let dragMoved = 0;

                orbitTrack.addEventListener('mousedown', (e) => {
                    if (e.button !== 0) return;
                    isDragging = true;
                    startX = e.clientX;
                    dragMoved = 0;
                });

                window.addEventListener('mousemove', (e) => {
                    if (!isDragging) return;
                    dragMoved = e.clientX - startX;
                });

                window.addEventListener('mouseup', () => {
                    if (!isDragging) return;
                    isDragging = false;
                    if (Math.abs(dragMoved) > 50) {
                        if (dragMoved < 0) {
                            nextOrbitCard();
                        } else {
                            prevOrbitCard();
                        }
                    }
                    dragMoved = 0;
                });
            }

            // Keyboard arrow support (Left / Right rotate without blocking vertical page navigation)
            stage.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    nextOrbitCard();
                } else if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    prevOrbitCard();
                }
            });

            window.addEventListener('resize', () => {
                updateOrbitLayout();
            });
        }

        // ==========================================
        // Lusion-Inspired Preloader & Video Engine
        // ==========================================
        const HERO_FEEDS = [
            { label: "🎬 VIDEO: SANCTUARY MASTERPIECE", src: "assets/videos/sanctuary_100x_masterpiece.mp4" },
            { label: "🚗 VIDEO: AUTOMOTIVE CGI", src: "assets/videos/hero_cinematic_varnex.mp4" },
            { label: "🧊 VIDEO: DAMPER CAE SIMULATION", src: "assets/videos/hero_simulation_damper.mp4" },
            { label: "⚙️ VIDEO: PRODUCT DESIGN CGI", src: "assets/videos/hero_cinematic_kynora.mp4" }
        ];
        let currentFeedIdx = 0;

        // ==========================================
        // Hero Eye Theme Switcher (Obsidian Dark ⇄ Luminous White)
        // ==========================================
        let isHeroWhiteMode = false;


    // =========================================================================
    // RESTORED SIGNATURE EXPERIENCE 2: HIGH-FIDELITY PRELOADER
    // =========================================================================
        function initLusionPreloader() {
            const preloader = document.getElementById('lusion-preloader');
            const counter = document.getElementById('preloader-counter');
            const bar = document.getElementById('preloader-bar');
            const status = document.getElementById('preloader-status');
            const heroVideo = document.getElementById('hero-bg-video');
            if (!preloader) return;

            const milestones = [
                { threshold: 24, text: "[01/04] INITIALIZING NUMERICAL CAE KERNEL..." },
                { threshold: 54, text: "[02/04] LOADING FINITE ELEMENT & FLUENT MESH..." },
                { threshold: 84, text: "[03/04] COMPILING PROCEDURAL 2D MEP ROUTING..." },
                { threshold: 99, text: "[04/04] VERIFYING TELEMETRY & CONVERGENCE..." },
                { threshold: 100, text: "[READY] CONVERGENCE REACHED. WELCOME." }
            ];

            let progress = 0;
            const startTime = performance.now();
            const totalDuration = 1400; // 1.4s smooth count
            let isDismissed = false;

            window.dismissPreloader = function dismissPreloader() {
                const preloader = document.getElementById('lusion-preloader');
                const heroVideo = document.getElementById('hero-bg-video');
                if (preloader) {
                    preloader.style.transition = 'transform 0.65s cubic-bezier(0.85, 0, 0.15, 1), opacity 0.5s ease';
                    preloader.style.transform = 'translateY(-100%)';
                    preloader.style.opacity = '0';
                    preloader.style.pointerEvents = 'none';
                    setTimeout(() => { preloader.style.display = 'none'; }, 700);
                }
                if (heroVideo) {
                    heroVideo.play().catch(() => {});
                }
            };
            function localDismissPreloader() {
                if (isDismissed) return;
                isDismissed = true;
                preloader.style.transition = 'transform 0.75s cubic-bezier(0.85, 0, 0.15, 1), opacity 0.5s ease';
                preloader.style.transform = 'translateY(-100%)';
                preloader.style.opacity = '0';
                preloader.style.pointerEvents = 'none';

                if (heroVideo) {
                    heroVideo.play().catch(() => {});
                }

                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 800);
            }

            function updateCounter() {
                if (isDismissed) return;
                const now = performance.now();
                const elapsed = now - startTime;
                const rawProgress = Math.min(elapsed / totalDuration, 1);
                
                // Ease out cubic progress
                const easeProgress = 1 - Math.pow(1 - rawProgress, 3);
                progress = Math.floor(easeProgress * 100);

                if (counter) counter.textContent = (progress < 10 ? '0' : '') + progress + '%';
                if (bar) bar.style.width = progress + '%';

                if (status) {
                    for (const m of milestones) {
                        if (progress <= m.threshold) {
                            status.textContent = m.text;
                            break;
                        }
                    }
                }

                if (rawProgress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    setTimeout(window.dismissPreloader, 100);
                }
            }

            // Guaranteed Fail-Safe Fallback: Always dismisses within 2.0s even if browser throttles RAF
            setTimeout(window.dismissPreloader, 2000);

            requestAnimationFrame(updateCounter);
        }


    // =========================================================================
    // RESTORED SIGNATURE EXPERIENCE 3: EMERALD WATER RIPPLE OPTICS
    // =========================================================================
        function initMoreWorkWaterRipple() {
            const canvas = document.getElementById('more-work-fluid-canvas');
            const section = document.getElementById('more-work');
            if (!canvas || !section) return;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            let width = 0;
            let height = 0;
            let dpr = 1;
            let ripples = [];
            let droplets = [];
            let lastSpawn = 0;

            function resize() {
                const rect = section.getBoundingClientRect();
                dpr = Math.min(window.devicePixelRatio || 1, 2);
                width = rect.width;
                height = rect.height;
                if (width === 0 || height === 0) return;
                canvas.width = Math.floor(width * dpr);
                canvas.height = Math.floor(height * dpr);
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.scale(dpr, dpr);
            }
            window.addEventListener('resize', resize);
            resize();

            class WaterRipple {
                constructor(x, y, maxR, strength) {
                    this.x = x;
                    this.y = y;
                    this.r = 6;
                    this.maxR = maxR || 140;
                    this.alpha = strength || 0.7;
                    this.decay = 0.012;
                    this.speed = 2.4;
                }
                update() {
                    this.r += this.speed;
                    this.alpha -= this.decay;
                }
                draw(c) {
                    if (this.alpha <= 0) return;
                    c.save();
                    c.strokeStyle = 'rgba(52, 211, 153, ' + (this.alpha * 0.75) + ')';
                    c.lineWidth = 2.2;
                    c.beginPath();
                    c.arc(this.x, this.y, this.r, 0, Math.PI * 2);
                    c.stroke();

                    // Inner concentric echo ring
                    if (this.r > 20) {
                        c.strokeStyle = 'rgba(16, 185, 129, ' + (this.alpha * 0.45) + ')';
                        c.lineWidth = 1.2;
                        c.beginPath();
                        c.arc(this.x, this.y, this.r * 0.65, 0, Math.PI * 2);
                        c.stroke();
                    }
                    c.restore();
                }
            }

            class WaterPuff {
                constructor(x, y, vx, vy) {
                    this.x = x;
                    this.y = y;
                    this.vx = vx * 0.15 + (Math.random() - 0.5) * 0.8;
                    this.vy = vy * 0.15 + (Math.random() - 0.5) * 0.8;
                    this.radius = 20 + Math.random() * 24;
                    this.maxRadius = this.radius * 1.8;
                    this.alpha = 0.5;
                    this.decay = 0.01 + Math.random() * 0.008;
                }
                update() {
                    this.x += this.vx;
                    this.y += this.vy;
                    this.vx *= 0.94;
                    this.vy *= 0.94;
                    if (this.radius < this.maxRadius) {
                        this.radius += (this.maxRadius - this.radius) * 0.05;
                    }
                    this.alpha -= this.decay;
                }
                draw(c) {
                    if (this.alpha <= 0) return;
                    c.save();
                    c.globalCompositeOperation = 'screen';
                    const grad = c.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
                    grad.addColorStop(0, 'rgba(52, 211, 153, ' + (this.alpha * 0.6) + ')');
                    grad.addColorStop(0.5, 'rgba(16, 185, 129, ' + (this.alpha * 0.3) + ')');
                    grad.addColorStop(1, 'rgba(5, 150, 105, 0)');
                    c.fillStyle = grad;
                    c.beginPath();
                    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                    c.fill();
                    c.restore();
                }
            }

            function addRipple(x, y, maxR, strength) {
                ripples.push(new WaterRipple(x, y, maxR, strength));
                if (ripples.length > 40) ripples.shift();
            }

            function addWaterPuff(x, y, dx, dy) {
                droplets.push(new WaterPuff(x, y, dx, dy));
                if (droplets.length > 80) droplets.shift();
            }

            let lastX = 0, lastY = 0;
            section.addEventListener('mousemove', (e) => {
                const rect = section.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const now = performance.now();

                const dx = x - lastX;
                const dy = y - lastY;
                const dist = Math.hypot(dx, dy);

                if (dist > 8 && now - lastSpawn > 60) {
                    addRipple(x, y, 70 + Math.min(dist * 1.5, 90), 0.55);
                    addWaterPuff(x, y, dx, dy);
                    lastSpawn = now;
                }
                lastX = x;
                lastY = y;
            });

            // When hovering or touching any project image, create prominent radiating water ripples
            const cards = section.querySelectorAll('.fluid-flow-card');
            cards.forEach(card => {
                card.addEventListener('mouseenter', (e) => {
                    const rect = section.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    addRipple(x, y, 160, 0.9);
                    for (let i = 0; i < 4; i++) {
                        addWaterPuff(x + (Math.random() - 0.5) * 30, y + (Math.random() - 0.5) * 30, 0, 0);
                    }
                });

                card.addEventListener('mousemove', (e) => {
                    const rect = section.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    if (Math.random() < 0.25) {
                        addRipple(x, y, 110, 0.65);
                        addWaterPuff(x, y, (Math.random() - 0.5) * 6, (Math.random() - 0.5) * 6);
                    }
                });
            });

            function renderWaterLoop() {
                if (canvas.offsetParent === null) {
                    requestAnimationFrame(renderWaterLoop);
                    return;
                }
                ctx.clearRect(0, 0, width, height);

                for (let i = droplets.length - 1; i >= 0; i--) {
                    const d = droplets[i];
                    d.update();
                    d.draw(ctx);
                    if (d.alpha <= 0) droplets.splice(i, 1);
                }

                for (let i = ripples.length - 1; i >= 0; i--) {
                    const r = ripples[i];
                    r.update();
                    r.draw(ctx);
                    if (r.alpha <= 0) ripples.splice(i, 1);
                }

                requestAnimationFrame(renderWaterLoop);
            }
            requestAnimationFrame(renderWaterLoop);
        }


    // =========================================================================
    // RESTORED SIGNATURE EXPERIENCE 4: DRAMATIC WHITE FINALE WATERCOLOR CANVAS
    // =========================================================================
        function initFluidContactCanvas() {
            const canvas = document.getElementById('fluid-contact-canvas');
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            let width = 0;
            let height = 0;
            let dpr = 1;
            let particles = [];
            let mouse = { x: 0, y: 0, px: 0, py: 0, active: false };
            let colorIndex = 0;

            // Vibrant 14islands spectrum & watercolor thermal palette
            const PALETTE = [
                { r: 250, g: 204, b: 21 },   // Sunshine Yellow
                { r: 52,  g: 211, b: 153 },  // Mint Emerald
                { r: 56,  g: 189, b: 248 },  // Sky Cyan
                { r: 192, g: 132, b: 252 },  // Lavender Violet
                { r: 244, g: 114, b: 182 },  // Rose Magenta
                { r: 251, g: 146, b: 60 }    // Warm Peach
            ];

            function resize() {
                const rect = canvas.getBoundingClientRect();
                dpr = Math.min(window.devicePixelRatio || 1, 2);
                width = rect.width;
                height = rect.height;
                if (width === 0 || height === 0) return;
                canvas.width = Math.floor(width * dpr);
                canvas.height = Math.floor(height * dpr);
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.scale(dpr, dpr);
            }

            window.addEventListener('resize', resize);
            resize();

            // Particle representing a wet watercolor pigment droplet
            class FluidPuff {
                constructor(x, y, vx, vy, color, baseRadius) {
                    this.x = x;
                    this.y = y;
                    this.vx = vx * 0.18 + (Math.random() - 0.5) * 0.6;
                    this.vy = vy * 0.18 + (Math.random() - 0.5) * 0.6;
                    this.color = color;
                    this.radius = baseRadius;
                    this.maxRadius = baseRadius * (1.5 + Math.random() * 0.6);
                    this.alpha = 0.62;
                    this.decay = 0.007 + Math.random() * 0.005; // evaporates gracefully in ~2-2.5s
                }
                update() {
                    this.x += this.vx;
                    this.y += this.vy;
                    this.vx *= 0.95;
                    this.vy *= 0.95;
                    if (this.radius < this.maxRadius) {
                        this.radius += (this.maxRadius - this.radius) * 0.045;
                    }
                    this.alpha -= this.decay;
                }
                draw(c) {
                    if (this.alpha <= 0) return;
                    c.save();
                    c.globalCompositeOperation = 'screen';
                    const grad = c.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
                    const { r, g, b } = this.color;
                    grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${this.alpha * 0.85})`);
                    grad.addColorStop(0.55, `rgba(${r}, ${g}, ${b}, ${this.alpha * 0.45})`);
                    grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
                    c.fillStyle = grad;
                    c.beginPath();
                    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                    c.fill();
                    c.restore();
                }
            }

            function spawnPuffs(x0, y0, x1, y1) {
                const dx = x1 - x0;
                const dy = y1 - y0;
                const dist = Math.hypot(dx, dy);
                const steps = Math.max(1, Math.min(Math.floor(dist / 8), 18));
                const col = PALETTE[colorIndex % PALETTE.length];
                colorIndex = (colorIndex + 1) % PALETTE.length;

                for (let i = 0; i <= steps; i++) {
                    const t = i / steps;
                    const px = x0 + dx * t;
                    const py = y0 + dy * t;
                    const r = 24 + Math.random() * 22;
                    particles.push(new FluidPuff(px, py, dx * 0.08, dy * 0.08, col, r));
                }
                if (particles.length > 360) {
                    particles.splice(0, particles.length - 360);
                }
            }

            function onPointerMove(clientX, clientY) {
                const rect = canvas.getBoundingClientRect();
                const x = clientX - rect.left;
                const y = clientY - rect.top;

                if (!mouse.active) {
                    mouse.px = x;
                    mouse.py = y;
                    mouse.active = true;
                }
                spawnPuffs(mouse.px, mouse.py, x, y);
                mouse.px = x;
                mouse.py = y;
            }

            // Listen on the contact stage container so sweeps register across text overlays
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.addEventListener('mousemove', (e) => onPointerMove(e.clientX, e.clientY));
                contactSection.addEventListener('mouseleave', () => { mouse.active = false; });
                contactSection.addEventListener('touchmove', (e) => {
                    if (e.touches && e.touches[0]) {
                        onPointerMove(e.touches[0].clientX, e.touches[0].clientY);
                    }
                }, { passive: true });
                contactSection.addEventListener('touchend', () => { mouse.active = false; });
            }

            // Initial welcoming fluid bloom on launch
            function triggerWelcomeStroke() {
                if (width === 0 || height === 0) return;
                const cy = height * 0.48;
                for (let i = 0; i < 9; i++) {
                    const x = width * (0.15 + (i / 9) * 0.7);
                    const y = cy + Math.sin(i * 0.8) * 45;
                    const col = PALETTE[i % PALETTE.length];
                    particles.push(new FluidPuff(x, y, (Math.random() - 0.5) * 1.5, (Math.random() - 0.5) * 1.5, col, 36 + Math.random() * 26));
                }
            }
            setTimeout(triggerWelcomeStroke, 400);

            // 60FPS RAF animation loop
            function loop() {
                ctx.clearRect(0, 0, width, height);

                for (let i = particles.length - 1; i >= 0; i--) {
                    const p = particles[i];
                    p.update();
                    p.draw(ctx);
                    if (p.alpha <= 0) {
                        particles.splice(i, 1);
                    }
                }
                requestAnimationFrame(loop);
            }
            requestAnimationFrame(loop);
        }

        // ==========================================
        // Lusion Dynamic Ambient Pointer Light Tracker (Normal OS Cursor Preserved)


    // =========================================================================
    // RESTORED SIGNATURE EXPERIENCE 5: SPECULAR POINTER LIGHTING
    // =========================================================================
        function initSpecularLighting() {
            if (window.matchMedia('(pointer: coarse)').matches) return;
            const light = document.getElementById('dynamic-pointer-light');
            if (!light) return;

            let mouseX = window.innerWidth / 2;
            let mouseY = window.innerHeight / 2;
            let lightX = mouseX;
            let lightY = mouseY;
            let isVisible = false;

            window.addEventListener('mousemove', (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;
                if (!isVisible) {
                    isVisible = true;
                    light.style.opacity = '1';
                }
            });

            document.addEventListener('mouseleave', () => {
                isVisible = false;
                light.style.opacity = '0';
            });

            function renderLight() {
                lightX += (mouseX - lightX) * 0.08;
                lightY += (mouseY - lightY) * 0.08;
                light.style.transform = `translate3d(${lightX.toFixed(1)}px, ${lightY.toFixed(1)}px, 0px) translate(-50%, -50%)`;
                requestAnimationFrame(renderLight);
            }
            requestAnimationFrame(renderLight);
        }

        // ==========================================
        // Kinetic Magnetic Button Attraction (F = -k * dx)


    // =========================================================================
    // RESTORED SIGNATURE EXPERIENCE 6: MAGNETIC BUTTON KINETICS
    // =========================================================================
        function initMagneticButtons() {
            if (window.matchMedia('(pointer: coarse)').matches) return;

            const targets = document.querySelectorAll('.hero-glass-pill, .magnetic-btn, #orbit-btn-prev, #orbit-btn-next');
            targets.forEach(btn => {
                btn.addEventListener('mousemove', (e) => {
                    const rect = btn.getBoundingClientRect();
                    const centerX = rect.left + rect.width / 2;
                    const centerY = rect.top + rect.height / 2;
                    const deltaX = (e.clientX - centerX) * 0.32;
                    const deltaY = (e.clientY - centerY) * 0.32;
                    btn.style.transform = `translate3d(${deltaX.toFixed(1)}px, ${deltaY.toFixed(1)}px, 0px)`;
                });

                btn.addEventListener('mouseleave', () => {
                    btn.style.transform = 'translate3d(0px, 0px, 0px)';
                });
            });
        }

        // ==========================================
        // Real-Time CFD Streamline Potential Flow Simulation over Hero


    // =========================================================================
    // RESTORED SIGNATURE EXPERIENCE 7: 3D CARD PERSPECTIVE TILT PHYSICS
    // =========================================================================
        function init3DCardTiltPhysics() {
            if (window.matchMedia('(pointer: coarse)').matches) return;

            const cards = document.querySelectorAll('.glass-card, .more-work-card');
            cards.forEach(card => {
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotateX = ((y - centerY) / centerY) * -6.5;
                    const rotateY = ((x - centerX) / centerX) * 6.5;

                    card.style.setProperty('--mouse-x', `${x}px`);
                    card.style.setProperty('--mouse-y', `${y}px`);
                    card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-5px)`;
                });

                card.addEventListener('mouseleave', () => {
                    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
                });
            });
        }

        // Dynamic Scrollspy via IntersectionObserver
        
        // ==========================================
        // 14islands Liquid Fluid Flow Distortion Engine (Neko Health Inspired)


    // =========================================================================
    // RESTORED SIGNATURE EXPERIENCE 8: 14ISLANDS ORGANIC FLUID FLOW REFRACTION
    // =========================================================================
        function init14islandsFluidFlow() {
            const cards = document.querySelectorAll('.fluid-flow-card');
            if (!cards.length) return;

            const fluidStates = [
                { id: 1, turb: document.getElementById('fluid-turb-1'), disp: document.getElementById('fluid-disp-1'), currentScale: 0, targetScale: 0, baseFreqX: 0.014, baseFreqY: 0.022, time: 0, speed: 0, lastX: 0, lastY: 0 },
                { id: 2, turb: document.getElementById('fluid-turb-2'), disp: document.getElementById('fluid-disp-2'), currentScale: 0, targetScale: 0, baseFreqX: 0.016, baseFreqY: 0.024, time: 1.5, speed: 0, lastX: 0, lastY: 0 },
                { id: 3, turb: document.getElementById('fluid-turb-3'), disp: document.getElementById('fluid-disp-3'), currentScale: 0, targetScale: 0, baseFreqX: 0.015, baseFreqY: 0.020, time: 3.0, speed: 0, lastX: 0, lastY: 0 }
            ];

            cards.forEach(card => {
                const cardId = parseInt(card.getAttribute('data-fluid-id'), 10);
                const state = fluidStates.find(s => s.id === cardId);
                if (!state || !state.turb || !state.disp) return;

                card.addEventListener('mouseenter', (e) => {
                    state.targetScale = 36;
                    state.lastX = e.clientX;
                    state.lastY = e.clientY;
                });

                card.addEventListener('mousemove', (e) => {
                    const dx = e.clientX - state.lastX;
                    const dy = e.clientY - state.lastY;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    state.speed = Math.min(dist * 0.35, 18);
                    state.lastX = e.clientX;
                    state.lastY = e.clientY;
                    state.targetScale = 36 + state.speed;
                });

                card.addEventListener('mouseleave', () => {
                    state.targetScale = 0;
                    state.speed = 0;
                });
            });

            function renderFluidLoop() {
                fluidStates.forEach(state => {
                    if (!state.turb || !state.disp) return;

                    // Smooth spring lerp towards target scale
                    state.currentScale += (state.targetScale - state.currentScale) * 0.12;

                    // When active (hovered or decaying)
                    if (state.currentScale > 0.05) {
                        state.time += 0.035 + (state.speed * 0.005);
                        state.speed *= 0.9; // decay mouse impulse

                        // Dynamic harmonic oscillation of wave frequency
                        const fX = state.baseFreqX + Math.sin(state.time * 2.2) * 0.0045;
                        const fY = state.baseFreqY + Math.cos(state.time * 1.8) * 0.0055;

                        state.turb.setAttribute('baseFrequency', `${fX.toFixed(4)} ${fY.toFixed(4)}`);
                        state.disp.setAttribute('scale', state.currentScale.toFixed(2));
                    } else if (state.currentScale <= 0.05 && state.currentScale > 0) {
                        state.currentScale = 0;
                        state.disp.setAttribute('scale', '0');
                    }
                });

                requestAnimationFrame(renderFluidLoop);
            }

            requestAnimationFrame(renderFluidLoop);
        }

        
        




    // =========================================================================
    // NEW PREMIUM EXPERIENCE 1: INTERACTIVE 3D ENGINEERING LAB CONTROLLER
    // =========================================================================
    const LAB_MODELS = {
        knuckle: {
            src: 'assets/models/suspension_knuckle.glb',
            title: 'Formula Student Lightweight Suspension Upright / Knuckle',
            discipline: 'Al 7075-T6 • FEA Topology Optimization & Modal Dynamics',
            cameraOrbit: '45deg 75deg 1.8m',
            fieldOfView: '30deg',
            hotspots: [
                { slot: 'hotspot-caliper', dataPosition: '0.08m 0.05m 0.02m', text: 'Brake Caliper Lug: 218 MPa (FoS 2.31 PASS)' },
                { slot: 'hotspot-bearing', dataPosition: '0m 0m 0m', text: 'Bearing Bore: ISO H7 (+0.025 mm)' },
                { slot: 'hotspot-arm', dataPosition: '-0.07m 0.06m -0.01m', text: 'Steering Arm: 84.2 Hz Mode 1 Frequency' }
            ]
        },
        nozzle: {
            src: 'assets/models/supersonic_nozzle.glb',
            title: '20-Bar Convergent-Divergent Supersonic Nozzle',
            discipline: 'Inconel 718 • Compressible CFD & Shock Diamonds (Mach 1.002)',
            cameraOrbit: '90deg 90deg 0.35m',
            fieldOfView: '28deg',
            hotspots: [
                { slot: 'hotspot-inlet', dataPosition: '0m 0m -0.06m', text: 'Inlet: 20 Bar (2.0 MPa) Stagnation P0' },
                { slot: 'hotspot-throat', dataPosition: '0m 0.018m 0m', text: 'Sonic Throat: Mach 1.000 Choked' },
                { slot: 'hotspot-exit', dataPosition: '0m 0m 0.065m', text: 'Supersonic Exit: Mach 2.2 Shock Train' }
            ]
        }
    };

    let currentLabModelKey = 'knuckle';

    function switchLabModel(key) {
        const viewer = document.getElementById('engineering-model-viewer');
        const titleEl = document.getElementById('lab-model-title');
        const discEl = document.getElementById('lab-model-discipline');
        const btnKnuckle = document.getElementById('lab-btn-knuckle');
        const btnNozzle = document.getElementById('lab-btn-nozzle');
        if (!viewer || !LAB_MODELS[key]) return;

        currentLabModelKey = key;
        const data = LAB_MODELS[key];
        viewer.src = data.src;
        viewer.cameraOrbit = data.cameraOrbit;
        viewer.fieldOfView = data.fieldOfView;

        if (titleEl) titleEl.textContent = data.title;
        if (discEl) discEl.textContent = data.discipline;

        if (btnKnuckle && btnNozzle) {
            if (key === 'knuckle') {
                btnKnuckle.className = 'px-4 py-2 rounded-xl bg-[#F59E46] text-[#080A0D] font-mono text-xs font-bold transition-all shadow-md';
                btnNozzle.className = 'px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 border border-white/10 font-mono text-xs font-semibold transition-all';
            } else {
                btnNozzle.className = 'px-4 py-2 rounded-xl bg-[#06B6D4] text-[#080A0D] font-mono text-xs font-bold transition-all shadow-md';
                btnKnuckle.className = 'px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 border border-white/10 font-mono text-xs font-semibold transition-all';
            }
        }
    }

    function toggleLabAutoRotate() {
        const viewer = document.getElementById('engineering-model-viewer');
        const btn = document.getElementById('lab-btn-rotate');
        if (!viewer) return;
        viewer.autoRotate = !viewer.autoRotate;
        if (btn) {
            btn.textContent = viewer.autoRotate ? '⏸ PAUSE ROTATION' : '▶ AUTO-ROTATE';
        }
    }

    function resetLabView() {
        const viewer = document.getElementById('engineering-model-viewer');
        if (!viewer) return;
        const data = LAB_MODELS[currentLabModelKey];
        if (data) {
            viewer.cameraOrbit = data.cameraOrbit;
            viewer.fieldOfView = data.fieldOfView;
        }
    }

    // =========================================================================
    // NEW PREMIUM EXPERIENCE 2: HERO VIDEO CONTROLLER
    // =========================================================================
    function toggleHeroVideoPlayback() {
        const vid = document.getElementById('hero-cinema-video');
        const icon = document.getElementById('hero-video-toggle-icon');
        const text = document.getElementById('hero-video-toggle-text');
        if (!vid) return;
        if (vid.paused) {
            vid.play().catch(() => {});
            if (icon) icon.textContent = '⏸';
            if (text) text.textContent = 'PAUSE';
        } else {
            vid.pause();
            if (icon) icon.textContent = '▶';
            if (text) text.textContent = 'PLAY';
        }
    }

    // =========================================================================
    // NEW PREMIUM EXPERIENCE 3: WORKFLOW TIMELINE SCROLL OBSERVER
    // =========================================================================
    function initWorkflowObserver() {
        const steps = document.querySelectorAll('.workflow-step-node');
        if (!steps.length || !('IntersectionObserver' in window)) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('opacity-100', 'scale-100');
                    entry.target.classList.remove('opacity-50', 'scale-95');
                }
            });
        }, { threshold: 0.3 });

        steps.forEach(s => observer.observe(s));
    }

document.addEventListener('DOMContentLoaded', () => {
        initModalDialog();
        initNavigation();

        // Initialize embedded comparison sliders
        document.querySelectorAll('.comparison-slider').forEach(el => new ComparisonSlider(el));

        // Initialize keyboard accessible cards
        document.querySelectorAll('[data-project-id]').forEach(card => {
            const pid = card.getAttribute('data-project-id');
            card.addEventListener('click', (e) => {
                if (e.target.closest('a')) return;
                openCaseStudy(pid, card);
            });
            card.addEventListener('keydown', (e) => {
                if (e.target !== card) return;
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openCaseStudy(pid, card);
                }
            });
        });

        // Initialize restored signature interactive modules
        initLusionPreloader();
        initOrbitCarousel();
        initMoreWorkWaterRipple();
        initFluidContactCanvas();
        initSpecularLighting();
        initMagneticButtons();
        init3DCardTiltPhysics();
        init14islandsFluidFlow();
        initHeroCfdCanvas();
        initWorkflowObserver();
    });

    // Expose needed APIs to window
    window.openCaseStudy = openCaseStudy;
    window.closeModal = closeModal;
    window.switchModalTab = switchModalTab;
    window.toggleHeroTheme = toggleHeroTheme;
    window.toggleFaq = toggleFaq;
    window.CASE_STUDIES = CASE_STUDIES;
    window.rotateOrbitTo = rotateOrbitTo;
    window.nextOrbitCard = nextOrbitCard;
    window.prevOrbitCard = prevOrbitCard;
    window.handleCardClick = handleCardClick;
    window.dismissPreloader = window.dismissPreloader || dismissPreloader;
    window.switchLabModel = switchLabModel;
    window.toggleLabAutoRotate = toggleLabAutoRotate;
    window.resetLabView = resetLabView;
    window.toggleHeroVideoPlayback = toggleHeroVideoPlayback;

})();
