"""
将像素风梨子 PNG 转换为优化的 SVG favicon
- 自动裁剪到内容区域再缩放
- 合并深色背景像素
- 水平合并相同颜色像素减小体积
"""
from PIL import Image
import os

input_path = "/Users/fanxueli/.gemini/antigravity/brain/50274ece-715e-491a-a33a-25b5faf8b81b/pixel_pear_reference_1772363878880.png"
output_path = "/Users/fanxueli/Desktop/个人网站搭建/public/pear-favicon.svg"

TARGET_SIZE = 32
CORNER_RADIUS = 4
BG_COLOR = "#1a1a1a"

def rgb_to_hex(r, g, b):
    return f"#{r:02x}{g:02x}{b:02x}"

def is_dark_bg(r, g, b, a=255):
    """判断是否为深色背景（黑色/深灰色区域）"""
    if a < 128:
        return True
    # 非常暗的颜色视为背景
    if r < 45 and g < 45 and b < 45:
        return True
    return False

def is_white_bg(r, g, b, a=255):
    """判断是否为白色背景"""
    if a < 128:
        return True
    if r > 230 and g > 230 and b > 230:
        return True
    return False

def quantize_color(r, g, b):
    """量化颜色以减少唯一颜色数"""
    step = 12
    return (r // step * step, g // step * step, b // step * step)

def find_content_bounds(img):
    """找到非背景内容的边界框"""
    pixels = img.load()
    w, h = img.size
    
    min_x, min_y = w, h
    max_x, max_y = 0, 0
    
    for y in range(h):
        for x in range(w):
            r, g, b, a = pixels[x, y]
            if not is_white_bg(r, g, b, a):
                min_x = min(min_x, x)
                min_y = min(min_y, y)
                max_x = max(max_x, x)
                max_y = max(max_y, y)
    
    return (min_x, min_y, max_x + 1, max_y + 1)

def main():
    img = Image.open(input_path).convert("RGBA")
    print(f"原始图片尺寸: {img.size}")
    
    # 找到内容边界（裁掉白色边框）
    bounds = find_content_bounds(img)
    print(f"内容边界: {bounds}")
    
    # 裁剪到内容区域
    img_cropped = img.crop(bounds)
    print(f"裁剪后尺寸: {img_cropped.size}")
    
    # 缩放到目标尺寸
    img_resized = img_cropped.resize((TARGET_SIZE, TARGET_SIZE), Image.NEAREST)
    
    pixels = img_resized.load()
    
    # 收集像素数据，深色背景统一为 None（由背景矩形覆盖）
    pixel_data = []
    for y in range(TARGET_SIZE):
        row = []
        for x in range(TARGET_SIZE):
            r, g, b, a = pixels[x, y]
            if is_dark_bg(r, g, b, a) or is_white_bg(r, g, b, a):
                row.append(None)  # 背景
            else:
                qr, qg, qb = quantize_color(r, g, b)
                row.append(rgb_to_hex(qr, qg, qb))
        pixel_data.append(row)
    
    # 水平合并相同颜色的相邻像素
    rects = []
    for y in range(TARGET_SIZE):
        x = 0
        while x < TARGET_SIZE:
            color = pixel_data[y][x]
            if color is None:
                x += 1
                continue
            run_length = 1
            while x + run_length < TARGET_SIZE and pixel_data[y][x + run_length] == color:
                run_length += 1
            rects.append((x, y, run_length, 1, color))
            x += run_length
    
    # 生成 SVG - 按颜色分组
    svg_parts = []
    svg_parts.append(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {TARGET_SIZE} {TARGET_SIZE}" width="{TARGET_SIZE}" height="{TARGET_SIZE}">')
    svg_parts.append(f'<rect width="{TARGET_SIZE}" height="{TARGET_SIZE}" rx="{CORNER_RADIUS}" fill="{BG_COLOR}"/>')
    
    # 按颜色分组
    color_groups = {}
    for rect in rects:
        x, y, w, h, color = rect
        if color not in color_groups:
            color_groups[color] = []
        color_groups[color].append((x, y, w, h))
    
    for color, group_rects in color_groups.items():
        if len(group_rects) == 1:
            x, y, w, h = group_rects[0]
            svg_parts.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{color}"/>')
        else:
            svg_parts.append(f'<g fill="{color}">')
            for x, y, w, h in group_rects:
                svg_parts.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}"/>')
            svg_parts.append('</g>')
    
    svg_parts.append('</svg>')
    
    svg_content = '\n'.join(svg_parts)
    
    with open(output_path, 'w') as f:
        f.write(svg_content)
    
    file_size = os.path.getsize(output_path)
    unique_colors = list(set(r[4] for r in rects))
    print(f"\n✅ SVG 生成成功!")
    print(f"📁 输出: {output_path}")
    print(f"📦 大小: {file_size} bytes ({file_size/1024:.1f} KB)")
    print(f"🎨 颜色数: {len(unique_colors)}")
    print(f"▪️ 矩形数: {len(rects)}")

if __name__ == "__main__":
    main()
