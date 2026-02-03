from PIL import Image
import os

avatar_path = r"c:\Users\jainf\OneDrive\Desktop\chatbot\public\avatar\frame_0.png"
output_path = r"c:\Users\jainf\OneDrive\Desktop\chatbot\src\app\favicon.ico"

if os.path.exists(avatar_path):
    img = Image.open(avatar_path)
    # Icons usually look better with a slight resize or just square
    img.save(output_path, format='ICO', sizes=[(32, 32), (64, 64)])
    print(f"Favicon created at {output_path}")
else:
    print(f"Error: {avatar_path} not found")
