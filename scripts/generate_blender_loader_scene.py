"""
Blender 4.5 Headless Scene Generator: Cinematic CAD Wireframe & Kinetic Aerospace Assembly
Automated Python script for Blender 4.5 (C:\\Program Files\\Blender Foundation\\Blender 4.5\\blender.exe)
Executes: blender.exe -b -P scripts/generate_blender_loader_scene.py
"""

import bpy
import math

def clean_scene():
    bpy.ops.wm.read_factory_settings(use_empty=True)

def setup_scene():
    scene = bpy.context.scene
    scene.render.engine = 'CYCLES'
    scene.cycles.device = 'GPU'
    scene.render.resolution_x = 1920
    scene.render.resolution_y = 1080
    scene.render.resolution_percentage = 100
    scene.render.fps = 60
    scene.frame_start = 1
    scene.frame_end = 240  # 4 seconds at 60 fps
    
    # World background
    world = bpy.data.worlds.new("ObsidianVoid")
    scene.world = world
    world.use_nodes = True
    bg_node = world.node_tree.nodes.get("Background")
    if bg_node:
        bg_node.inputs[0].default_value = (0.02, 0.025, 0.035, 1.0) # #05070A
        bg_node.inputs[1].default_value = 0.5

def create_lighting():
    # Key light
    key_light_data = bpy.data.lights.new(name="KeyLight", type='AREA')
    key_light_data.energy = 800
    key_light_data.size = 5.0
    key_light_data.color = (0.95, 0.98, 1.0)
    key_light = bpy.data.objects.new("KeyLight", key_light_data)
    bpy.context.collection.objects.link(key_light)
    key_light.location = (4.0, -5.0, 6.0)
    key_light.rotation_euler = (math.radians(45), 0, math.radians(35))

    # Cyan Rim Light
    rim_cyan_data = bpy.data.lights.new(name="RimCyan", type='AREA')
    rim_cyan_data.energy = 1200
    rim_cyan_data.size = 8.0
    rim_cyan_data.color = (0.325, 0.733, 0.784)  # #53BBC8 Cyan
    rim_cyan = bpy.data.objects.new("RimCyan", rim_cyan_data)
    bpy.context.collection.objects.link(rim_cyan)
    rim_cyan.location = (-6.0, 6.0, 3.0)
    rim_cyan.rotation_euler = (math.radians(-30), 0, math.radians(-135))

    # Amber Accent Light
    accent_amber_data = bpy.data.lights.new(name="AccentAmber", type='POINT')
    accent_amber_data.energy = 500
    accent_amber_data.color = (0.96, 0.62, 0.27)  # #F59E46 Amber
    accent_amber = bpy.data.objects.new("AccentAmber", accent_amber_data)
    bpy.context.collection.objects.link(accent_amber)
    accent_amber.location = (0.0, 0.0, -2.5)

def create_materials():
    # 1. Glowing Cyan Wireframe Emission
    mat_wireframe = bpy.data.materials.new(name="Mat_WireframeCyan")
    mat_wireframe.use_nodes = True
    nodes = mat_wireframe.node_tree.nodes
    links = mat_wireframe.node_tree.links
    nodes.clear()
    
    node_output = nodes.new(type='ShaderNodeOutputMaterial')
    node_emission = nodes.new(type='ShaderNodeEmission')
    node_emission.inputs['Color'].default_value = (0.325, 0.733, 0.784, 1.0)
    node_emission.inputs['Strength'].default_value = 8.0
    links.new(node_emission.outputs['Emission'], node_output.inputs['Surface'])

    # 2. Brushed Aerospace Titanium PBR
    mat_titanium = bpy.data.materials.new(name="Mat_Titanium")
    mat_titanium.use_nodes = True
    bsdf = mat_titanium.node_tree.nodes.get("Principled BSDF")
    if bsdf:
        bsdf.inputs['Base Color'].default_value = (0.15, 0.16, 0.18, 1.0)
        bsdf.inputs['Metallic'].default_value = 0.95
        bsdf.inputs['Roughness'].default_value = 0.22
        bsdf.inputs['Anisotropic'].default_value = 0.65

    return mat_wireframe, mat_titanium

def build_aerospace_model(mat_wire, mat_titanium):
    # Main Turbine Hub Body
    bpy.ops.mesh.primitive_cylinder_add(radius=1.2, depth=3.0, vertices=48, location=(0, 0, 0))
    hub = bpy.context.active_object
    hub.name = "Turbine_Hub"
    hub.rotation_euler = (math.radians(90), 0, 0)
    hub.data.materials.append(mat_titanium)

    # Wireframe Modifier (for CAD aesthetic)
    wire_mod = hub.modifiers.new(name="CAD_Wireframe", type='WIREFRAME')
    wire_mod.thickness = 0.02
    wire_mod.use_replace = False
    wire_mod.material_offset = 1
    hub.data.materials.append(mat_wire)

    # Ducted Fan Blades Assembly
    blades = []
    num_blades = 16
    for i in range(num_blades):
        angle = (2 * math.pi / num_blades) * i
        bpy.ops.mesh.primitive_cube_add(size=1.0, location=(0, 0, 0))
        blade = bpy.context.active_object
        blade.name = f"Blade_{i:02d}"
        blade.scale = (0.08, 0.75, 0.02)
        blade.location = (math.cos(angle) * 1.5, 0.5, math.sin(angle) * 1.5)
        blade.rotation_euler = (0, angle, math.radians(35))
        blade.data.materials.append(mat_titanium)
        blades.append(blade)

    # Outer Nacelle Ring
    bpy.ops.mesh.primitive_torus_add(major_radius=2.3, minor_radius=0.15, major_segments=64, minor_segments=24, location=(0, 0.5, 0))
    nacelle = bpy.context.active_object
    nacelle.name = "Nacelle_Shroud"
    nacelle.rotation_euler = (math.radians(90), 0, 0)
    nacelle.data.materials.append(mat_titanium)

    # Animate Kinetic Assembly Explosion
    # Frame 1: Exploded zero-gravity state
    # Frame 120: Slid into precision tolerance position
    hub.location.y = -3.5
    hub.keyframe_insert(data_path="location", frame=1)
    hub.location.y = 0.0
    hub.keyframe_insert(data_path="location", frame=120)

    nacelle.location.y = 4.0
    nacelle.keyframe_insert(data_path="location", frame=1)
    nacelle.location.y = 0.5
    nacelle.keyframe_insert(data_path="location", frame=120)

    for i, blade in enumerate(blades):
        angle = (2 * math.pi / num_blades) * i
        # Exploded radial offset
        blade.location.x = math.cos(angle) * 3.8
        blade.location.z = math.sin(angle) * 3.8
        blade.keyframe_insert(data_path="location", frame=1)
        # Assembled position
        blade.location.x = math.cos(angle) * 1.5
        blade.location.z = math.sin(angle) * 1.5
        blade.keyframe_insert(data_path="location", frame=120)

def setup_camera():
    cam_data = bpy.data.cameras.new("CinematicCam")
    cam_data.lens = 45.0
    cam_data.dof.use_dof = True
    cam_data.dof.focus_distance = 6.5
    cam_data.dof.aperture_fstop = 2.8

    cam = bpy.data.objects.new("CinematicCam", cam_data)
    bpy.context.collection.objects.link(cam)
    bpy.context.scene.camera = cam

    # Orbit Camera Motion
    cam.location = (5.5, -6.5, 3.2)
    cam.rotation_euler = (math.radians(65), 0, math.radians(40))
    cam.keyframe_insert(data_path="location", frame=1)
    cam.keyframe_insert(data_path="rotation_euler", frame=1)

    # Final Hero Position
    cam.location = (2.2, -4.5, 1.4)
    cam.rotation_euler = (math.radians(78), 0, math.radians(25))
    cam.keyframe_insert(data_path="location", frame=240)
    cam.keyframe_insert(data_path="rotation_euler", frame=240)

def main():
    clean_scene()
    setup_scene()
    create_lighting()
    mat_wire, mat_titanium = create_materials()
    build_aerospace_model(mat_wire, mat_titanium)
    setup_camera()
    output_path = r"assets\videos\blender_loader_scene.blend"
    bpy.ops.wm.save_as_mainfile(filepath=output_path)
    print(f"Blender 4.5 scene successfully compiled and saved to {output_path}!")

if __name__ == "__main__":
    main()
