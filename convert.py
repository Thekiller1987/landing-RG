import os
from PIL import Image

source_dir = 'fotos'
dest_dir = 'imagenes_optimizadas'

if not os.path.exists(dest_dir):
    os.makedirs(dest_dir)

for filename in os.listdir(source_dir):
    if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
        try:
            img_path = os.path.join(source_dir, filename)
            img = Image.open(img_path)
            
            # Convert to RGB if needed (e.g. for RGBA pngs)
            if img.mode in ("RGBA", "P"):
                img = img.convert("RGB")
            
            # Resize appropriately if it's too large (max 1920px width)
            max_size = (1920, 1080)
            img.thumbnail(max_size, Image.Resampling.LANCZOS)
            
            # Save as webp
            base_name = os.path.splitext(filename)[0]
            # Replace spaces and parentheses with underscores for web-friendly names
            clean_name = base_name.replace(' ', '_').replace('(', '').replace(')', '')
            dest_path = os.path.join(dest_dir, f"{clean_name}.webp")
            
            img.save(dest_path, 'WEBP', quality=80)
            print(f"Converted '{filename}' to '{dest_path}'")
        except Exception as e:
            print(f"Failed to convert {filename}: {e}")
