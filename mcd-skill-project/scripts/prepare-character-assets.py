"""Create a transparent derivative of the supplied checkerboard glasses (Pillow + NumPy)."""
from collections import deque
from pathlib import Path

import numpy as np
from PIL import Image

root = Path(__file__).resolve().parents[2] / "png"
for filename in ("deco_zero_glasses.png", "deco_sprite_glasses.png"):
    source = root / filename
    image = Image.open(source).convert("RGBA")
    pixels = np.array(image)
    rgb = pixels[:, :, :3].astype(np.int16)
    # Flood only bright neutral areas: outside plus both enclosed lens openings.
    # Enclosed metal highlights and screws remain opaque.
    background = (rgb.min(axis=2) >= 210) & (rgb.max(axis=2) - rgb.min(axis=2) <= 12)
    height, width = background.shape
    removed = np.zeros((height, width), dtype=bool)
    queue = deque()
    for x, y in [(0, 0), (int(width * .28), int(height * .51)),
                 (int(width * .72), int(height * .51))]:
        if background[y, x]:
            removed[y, x] = True
            queue.append((x, y))
    while queue:
        x, y = queue.popleft()
        for nx, ny in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)):
            if 0 <= nx < width and 0 <= ny < height and background[ny, nx] and not removed[ny, nx]:
                removed[ny, nx] = True
                queue.append((nx, ny))
    pixels[removed] = 0
    output = source.with_stem(source.stem + "_alpha")
    Image.fromarray(pixels).save(output)
    print(f"Prepared {output.name}; original preserved")
