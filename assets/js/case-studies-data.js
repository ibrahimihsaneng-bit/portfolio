/**
 * CASE_STUDIES_DATA
 * Technical database of mechanical engineering case studies and project records.
 * Separates validated results from design targets and clearly defines problem,
 * role, constraints, tools, methodology, verification, and engineering limitations.
 */

export const CASE_STUDIES = {
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
