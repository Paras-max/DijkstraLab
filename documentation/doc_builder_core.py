"""
Core styling and formatting utilities for DijkstraLab Documentation Generator
"""

import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import parse_xml, OxmlElement
from docx.oxml.ns import nsdecls, qn

# Color Palette
COLOR_PRIMARY = RGBColor(15, 23, 42)     # Deep Slate #0F172A
COLOR_SECONDARY = RGBColor(2, 132, 199)  # Cyan/Blue #0284C7
COLOR_ACCENT = RGBColor(217, 119, 6)     # Amber/Gold #D97706
COLOR_DARK = RGBColor(30, 41, 59)        # Slate 800 #1E293B
COLOR_MUTED = RGBColor(100, 116, 139)    # Slate 500 #64748B
COLOR_SUCCESS = RGBColor(16, 185, 129)   # Emerald #10B981
COLOR_DANGER = RGBColor(225, 29, 72)     # Rose #E11D48

HEX_HEADER_BG = "0F172A"
HEX_ZEBRA_BG = "F8FAFC"
HEX_CODE_BG = "F1F5F9"
HEX_CALLOUT_BG = "F0FDF4"
HEX_BORDER = "CBD5E1"
HEX_ACCENT_BG = "FEF3C7"


def create_document():
    doc = docx.Document()
    for section in doc.sections:
        section.top_margin = Inches(1)
        section.bottom_margin = Inches(1)
        section.left_margin = Inches(1)
        section.right_margin = Inches(1)
        section.different_first_page_header_footer = True
        
        # Header for subsequent pages
        header = section.header
        hp = header.paragraphs[0]
        hp.alignment = WD_ALIGN_PARAGRAPH.RIGHT
        hrun = hp.add_run("DijkstraLab – Complete Project Documentation & Technical Report")
        hrun.font.name = "Arial"
        hrun.font.size = Pt(8.5)
        hrun.font.color.rgb = COLOR_MUTED

        # Footer for subsequent pages
        footer = section.footer
        fp = footer.paragraphs[0]
        fp.alignment = WD_ALIGN_PARAGRAPH.RIGHT
        frun = fp.add_run("Analysis of Algorithms (AOA) | College Project Documentation")
        frun.font.name = "Arial"
        frun.font.size = Pt(8.5)
        frun.font.color.rgb = COLOR_MUTED

    # Set normal style
    normal_style = doc.styles['Normal']
    normal_style.font.name = 'Arial'
    normal_style.font.size = Pt(10.5)
    normal_style.font.color.rgb = COLOR_DARK
    normal_style.paragraph_format.line_spacing = 1.18
    normal_style.paragraph_format.space_after = Pt(6)

    return doc


def add_cover_page(doc):
    p_pre = doc.add_paragraph()
    p_pre.paragraph_format.space_before = Pt(36)
    p_pre.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_sub = p_pre.add_run("ANALYSIS OF ALGORITHMS (AOA) • MAJOR PROJECT REPORT")
    r_sub.font.name = "Arial"
    r_sub.font.size = Pt(11)
    r_sub.font.bold = True
    r_sub.font.color.rgb = COLOR_SECONDARY

    p_title = doc.add_paragraph()
    p_title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_title.paragraph_format.space_before = Pt(12)
    p_title.paragraph_format.space_after = Pt(12)
    r_title = p_title.add_run("DIJKSTRALAB")
    r_title.font.name = "Arial"
    r_title.font.size = Pt(34)
    r_title.font.bold = True
    r_title.font.color.rgb = COLOR_PRIMARY

    p_subtitle = doc.add_paragraph()
    p_subtitle.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_subtitle.paragraph_format.space_after = Pt(24)
    r_subt = p_subtitle.add_run("Intelligent Shortest Path Visualization and\nSmart Dark Store Delivery Route Optimizer")
    r_subt.font.name = "Arial"
    r_subt.font.size = Pt(16)
    r_subt.font.color.rgb = COLOR_ACCENT
    r_subt.font.bold = True

    # Decorative Line
    p_line = doc.add_paragraph()
    p_line.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_line.paragraph_format.space_after = Pt(24)
    r_line = p_line.add_run("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
    r_line.font.color.rgb = COLOR_SECONDARY

    # Abstract / Overview Callout box on cover
    p_desc = doc.add_paragraph()
    p_desc.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    p_desc.paragraph_format.left_indent = Inches(0.5)
    p_desc.paragraph_format.right_indent = Inches(0.5)
    p_desc.paragraph_format.space_after = Pt(36)
    r_desc = p_desc.add_run(
        "A dual-component algorithmic platform integrating rigorous academic graph theory with real-world quick-commerce logistics. "
        "Component 1 provides an interactive step-by-step visualizer for Dijkstra's Single-Source Shortest Path algorithm on weighted undirected graphs. "
        "Component 2 models an urban road network to solve the multi-store fulfillment problem inspired by Zepto and Blinkit: filtering candidate dark stores by multi-item inventory constraints and executing Dijkstra's algorithm to determine the strictly minimal delivery route."
    )
    r_desc.font.name = "Arial"
    r_desc.font.size = Pt(10)
    r_desc.font.italic = True
    r_desc.font.color.rgb = COLOR_MUTED

    # Metadata Grid
    table = doc.add_table(rows=6, cols=2)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    meta = [
        ("Course / Subject:", "Analysis of Algorithms (AOA) - CS / IT"),
        ("Project Title:", "DijkstraLab – Visualizer & Dark Store Optimizer"),
        ("Technology Stack:", "React 19, TypeScript, Vite, Tailwind CSS, Lucide, Vitest"),
        ("Algorithm Foundation:", "Dijkstra's Algorithm (Min-Heap Priority Queue, O((V + E) log V))"),
        ("Validation Status:", "20 / 20 Comprehensive Automated Test Cases Verified Passing"),
        ("Documentation Scope:", "Architecture, Code Walkthrough, Complexity, Worked Examples & 70+ Viva Q&A"),
    ]
    for idx, (label, val) in enumerate(meta):
        row = table.rows[idx]
        c0 = row.cells[0]
        c1 = row.cells[1]
        c0.width = Inches(2.2)
        c1.width = Inches(4.3)
        
        p0 = c0.paragraphs[0]
        p0.paragraph_format.space_after = Pt(2)
        r0 = p0.add_run(label)
        r0.font.bold = True
        r0.font.size = Pt(9.5)
        r0.font.color.rgb = COLOR_PRIMARY

        p1 = c1.paragraphs[0]
        p1.paragraph_format.space_after = Pt(2)
        r1 = p1.add_run(val)
        r1.font.size = Pt(9.5)
        r1.font.color.rgb = COLOR_DARK

    doc.add_page_break()


def add_heading_1(doc, text):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(20)
    p.paragraph_format.space_after = Pt(8)
    p.paragraph_format.keep_with_next = True
    run = p.add_run(text)
    run.font.name = "Arial"
    run.font.size = Pt(16)
    run.font.bold = True
    run.font.color.rgb = COLOR_PRIMARY
    return p


def add_heading_2(doc, text):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(14)
    p.paragraph_format.space_after = Pt(5)
    p.paragraph_format.keep_with_next = True
    run = p.add_run(text)
    run.font.name = "Arial"
    run.font.size = Pt(13)
    run.font.bold = True
    run.font.color.rgb = COLOR_SECONDARY
    return p


def add_heading_3(doc, text):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(10)
    p.paragraph_format.space_after = Pt(3)
    p.paragraph_format.keep_with_next = True
    run = p.add_run(text)
    run.font.name = "Arial"
    run.font.size = Pt(11)
    run.font.bold = True
    run.font.color.rgb = COLOR_ACCENT
    return p


def add_paragraph(doc, text, bold_prefix=None, italic=False):
    p = doc.add_paragraph()
    p.paragraph_format.space_after = Pt(5)
    p.paragraph_format.line_spacing = 1.15
    if bold_prefix:
        r_pre = p.add_run(bold_prefix)
        r_pre.font.name = "Arial"
        r_pre.font.size = Pt(10)
        r_pre.font.bold = True
        r_pre.font.color.rgb = COLOR_PRIMARY
    run = p.add_run(text)
    run.font.name = "Arial"
    run.font.size = Pt(10)
    run.font.italic = italic
    run.font.color.rgb = COLOR_DARK
    return p


def add_bullet(doc, text, bold_prefix=None, level=0):
    p = doc.add_paragraph(style='List Bullet')
    p.paragraph_format.space_after = Pt(3)
    p.paragraph_format.left_indent = Inches(0.25 * (level + 1))
    if bold_prefix:
        r_pre = p.add_run(bold_prefix)
        r_pre.font.name = "Arial"
        r_pre.font.size = Pt(10)
        r_pre.font.bold = True
        r_pre.font.color.rgb = COLOR_PRIMARY
    run = p.add_run(text)
    run.font.name = "Arial"
    run.font.size = Pt(10)
    run.font.color.rgb = COLOR_DARK
    return p


def add_callout(doc, text, title="NOTE / ARCHITECTURAL PRINCIPLE", kind="info"):
    table = doc.add_table(rows=1, cols=1)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    cell = table.cell(0, 0)
    cell.width = Inches(6.5)
    
    bg_hex = HEX_CALLOUT_BG if kind == "success" else "EFF6FF" if kind == "info" else HEX_ACCENT_BG
    border_hex = "10B981" if kind == "success" else "3B82F6" if kind == "info" else "F59E0B"
    
    tcPr = cell._tc.get_or_add_tcPr()
    shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{bg_hex}"/>')
    tcPr.append(shd)
    
    borders = parse_xml(f'''
        <w:tcBorders {nsdecls("w")}>
            <w:top w:val="none"/>
            <w:left w:val="single" w:sz="24" w:space="0" w:color="{border_hex}"/>
            <w:bottom w:val="none"/>
            <w:right w:val="none"/>
        </w:tcBorders>
    ''')
    tcPr.append(borders)
    
    p = cell.paragraphs[0]
    p.paragraph_format.space_before = Pt(4)
    p.paragraph_format.space_after = Pt(4)
    r_t = p.add_run(f"[{title}] ")
    r_t.font.name = "Arial"
    r_t.font.bold = True
    r_t.font.size = Pt(9.5)
    r_t.font.color.rgb = COLOR_PRIMARY
    
    r_body = p.add_run(text)
    r_body.font.name = "Arial"
    r_body.font.size = Pt(9.5)
    r_body.font.color.rgb = COLOR_DARK
    
    doc.add_paragraph().paragraph_format.space_after = Pt(4)


def add_code_block(doc, code_str, caption=None):
    if caption:
        p_cap = doc.add_paragraph()
        p_cap.paragraph_format.space_before = Pt(6)
        p_cap.paragraph_format.space_after = Pt(2)
        r_cap = p_cap.add_run(f"Code Listing: {caption}")
        r_cap.font.name = "Arial"
        r_cap.font.size = Pt(9)
        r_cap.font.bold = True
        r_cap.font.color.rgb = COLOR_SECONDARY

    table = doc.add_table(rows=1, cols=1)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    cell = table.cell(0, 0)
    cell.width = Inches(6.5)
    
    tcPr = cell._tc.get_or_add_tcPr()
    shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{HEX_CODE_BG}"/>')
    tcPr.append(shd)
    
    borders = parse_xml(f'''
        <w:tcBorders {nsdecls("w")}>
            <w:top w:val="single" w:sz="4" w:space="0" w:color="{HEX_BORDER}"/>
            <w:left w:val="single" w:sz="18" w:space="0" w:color="{HEX_HEADER_BG}"/>
            <w:bottom w:val="single" w:sz="4" w:space="0" w:color="{HEX_BORDER}"/>
            <w:right w:val="single" w:sz="4" w:space="0" w:color="{HEX_BORDER}"/>
        </w:tcBorders>
    ''')
    tcPr.append(borders)
    
    p = cell.paragraphs[0]
    p.paragraph_format.space_before = Pt(3)
    p.paragraph_format.space_after = Pt(3)
    p.paragraph_format.line_spacing = 1.05
    run = p.add_run(code_str)
    run.font.name = "Consolas"
    run.font.size = Pt(8.5)
    run.font.color.rgb = RGBColor(30, 41, 59)
    
    doc.add_paragraph().paragraph_format.space_after = Pt(4)


def add_table_data(doc, headers, rows_data, col_widths=None):
    table = doc.add_table(rows=len(rows_data) + 1, cols=len(headers))
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    
    # Header row
    hdr_cells = table.rows[0].cells
    for i, h_text in enumerate(headers):
        hdr_cells[i].text = h_text
        if col_widths and i < len(col_widths):
            hdr_cells[i].width = col_widths[i]
        tcPr = hdr_cells[i]._tc.get_or_add_tcPr()
        tcPr.append(parse_xml(f'<w:shd {nsdecls("w")} w:fill="{HEX_HEADER_BG}"/>'))
        p = hdr_cells[i].paragraphs[0]
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p.paragraph_format.space_before = Pt(4)
        p.paragraph_format.space_after = Pt(4)
        for r in p.runs:
            r.font.name = "Arial"
            r.font.bold = True
            r.font.size = Pt(9)
            r.font.color.rgb = RGBColor(255, 255, 255)
            
    # Data rows
    for r_idx, row in enumerate(rows_data):
        cells = table.rows[r_idx + 1].cells
        is_even = (r_idx % 2 == 1)
        for c_idx, val in enumerate(row):
            cells[c_idx].text = str(val)
            if col_widths and c_idx < len(col_widths):
                cells[c_idx].width = col_widths[c_idx]
            tcPr = cells[c_idx]._tc.get_or_add_tcPr()
            if is_even:
                tcPr.append(parse_xml(f'<w:shd {nsdecls("w")} w:fill="{HEX_ZEBRA_BG}"/>'))
            p = cells[c_idx].paragraphs[0]
            p.paragraph_format.space_before = Pt(3)
            p.paragraph_format.space_after = Pt(3)
            for r in p.runs:
                r.font.name = "Arial"
                r.font.size = Pt(8.5)
                r.font.color.rgb = COLOR_DARK
                
    doc.add_paragraph().paragraph_format.space_after = Pt(6)
