"""Create frontal covers from angled Pop Art wall photos.

The Pop Art source folder only has 3/4 wall shots. Gallery tiles use
file -1 as the cover, so this warps the canvas face to a straight-on
4:5 JPEG and writes it as *-1.jpg. Original wall/side shots are kept
as extra views (*-2 and up).
"""
from pathlib import Path
import shutil

import cv2
import numpy as np

SRC = Path(r"d:\Web pages\Pidlypna art photos 2\Pop Art")
DST = Path(r"d:\Sandbox\Paint web site 2.0\public\images")


def order_pts(pts):
    pts = np.array(pts, dtype=np.float32)
    xs = pts[:, 0].argsort()
    left = pts[xs[:2]]
    right = pts[xs[2:]]
    left = left[left[:, 1].argsort()]
    right = right[right[:, 1].argsort()]
    return np.array([left[0], right[0], right[1], left[1]], dtype=np.float32)


def inset(pts, factor=0.03):
    pts = np.array(pts, dtype=np.float32)
    center = pts.mean(axis=0)
    return center + (1.0 - factor) * (pts - center)


def warp(img, pts, out_w=1600, out_h=2000):
    quad = order_pts(pts)
    dest = np.array(
        [[0, 0], [out_w - 1, 0], [out_w - 1, out_h - 1], [0, out_h - 1]],
        dtype=np.float32,
    )
    M = cv2.getPerspectiveTransform(quad, dest)
    return cv2.warpPerspective(img, M, (out_w, out_h), flags=cv2.INTER_LANCZOS4)


def save_jpeg(img, path):
    cv2.imwrite(str(path), img, [int(cv2.IMWRITE_JPEG_QUALITY), 88])


def keep_original_as_extra(src_name, extra_name):
    src = DST / src_name
    extra = DST / extra_name
    if src.exists() and not extra.exists():
        shutil.copy2(src, extra)


keep_original_as_extra("pop-art-vibrant-spirit-1.jpg", "pop-art-vibrant-spirit-4.jpg")
keep_original_as_extra("pop-art-thoughts-1.jpg", "pop-art-thoughts-2.jpg")

tina = cv2.imread(str(SRC / "PXL_20260717_124437973.jpg"))
tina_pts = inset([[503, 589], [2190, 136], [1700, 3903], [444, 2942]], 0.035)
save_jpeg(warp(tina, tina_pts), DST / "pop-art-vibrant-spirit-1.jpg")

thoughts = cv2.imread(str(SRC / "PXL_20260717_130624498.jpg"))
thoughts_pts = [[760, 90], [3000, 360], [2780, 3880], [820, 4060]]
save_jpeg(warp(thoughts, thoughts_pts), DST / "pop-art-thoughts-1.jpg")

print("Wrote frontal Pop Art covers")
