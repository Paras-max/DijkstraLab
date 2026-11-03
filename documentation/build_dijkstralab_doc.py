"""
Master Builder for DijkstraLab Complete Project Documentation (.docx)
Executes all section builders and generates the final professional academic report.
"""

import sys
import os
import time

# Ensure current directory is on path
current_dir = os.path.dirname(os.path.abspath(__file__))
if current_dir not in sys.path:
    sys.path.insert(0, current_dir)

from doc_builder_core import create_document, add_cover_page
from doc_sections_part1 import build_part1_to_part7
from doc_sections_part2 import build_part8_to_part15
from doc_sections_part3 import build_part16_to_part26

def main():
    print("=" * 70)
    print("DIJKSTRALAB: GENERATING COMPLETE PROJECT DOCUMENTATION (.DOCX)")
    print("=" * 70)
    start_time = time.time()

    # Step 1: Initialize Document & Cover Page
    print("[1/5] Initializing document styles and generating cover page...")
    doc = create_document()
    add_cover_page(doc)

    # Step 2: Build Parts 1 to 7
    print("[2/5] Building Chapters 1 to 7 (Introduction, Problem, Architecture, Graph Theory, Dijkstra, Dark Store Working, Inventory)...")
    build_part1_to_part7(doc)

    # Step 3: Build Parts 8 to 15
    print("[3/5] Building Chapters 8 to 15 (Road Network, Priority Queue, Code Explanation, Tech Stack, File Structure, Complexity, Worked Example, Modes)...")
    build_part8_to_part15(doc)

    # Step 4: Build Parts 16 to 26
    print("[4/5] Building Chapters 16 to 26 (UI Features, 20-Scenario Test Suite, Results, Limitations, Future Scope, Comparisons, Real-World, 70+ Viva Q&A, Demo Script, Conclusion, References)...")
    build_part16_to_part26(doc)

    # Step 5: Save File
    output_path = os.path.join(current_dir, "DIJKSTRALAB_COMPLETE_DOCUMENTATION.docx")
    print(f"[5/5] Saving final document to: {output_path} ...")
    doc.save(output_path)

    elapsed = time.time() - start_time
    file_size_kb = os.path.getsize(output_path) / 1024
    print("=" * 70)
    print(f"SUCCESS! Documentation generated in {elapsed:.2f} seconds.")
    print(f"File Size: {file_size_kb:.1f} KB")
    print(f"Absolute Path: {output_path}")
    print("=" * 70)

if __name__ == "__main__":
    main()

