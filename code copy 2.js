var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { LOGO_SVG } from "./brandAssets";
// Runs this code only in Figma design files
if (figma.editorType === "figma") {
    function createCoverThumbnail(coverPage) {
        return __awaiter(this, void 0, void 0, function* () {
            yield figma.loadFontAsync({ family: "Roboto", style: "Regular" }).catch(() => { });
            yield figma.loadFontAsync({ family: "Roboto", style: "Medium" }).catch(() => { });
            yield figma.loadFontAsync({ family: "Roboto", style: "Bold" }).catch(() => { });
            // Find or create the main 1600x900 frame
            let thumb = coverPage.children.find((n) => n.name === "Thumbnail" && n.type === "FRAME");
            if (!thumb) {
                thumb = figma.createFrame();
                thumb.name = "Thumbnail";
                coverPage.appendChild(thumb);
            }
            // Frame layout & style
            thumb.resizeWithoutConstraints(1600, 900);
            thumb.x = 0;
            thumb.y = 0;
            thumb.clipsContent = true;
            thumb.fills = [{ type: "SOLID", color: hex("#D2EB7F") }]; // lime background
            thumb.strokes = [];
            thumb.effects = [];
            thumb.layoutMode = "NONE"; // free placement inside
            // create the logo from the shared SVG
            const logoNode = figma.createNodeFromSvg(LOGO_SVG);
            logoNode.name = "Logo";
            thumb.appendChild(logoNode);
            logoNode.x = 100;
            logoNode.y = 100;
            // ---- Content Wrapper: [ ASSET TYPE ] ----
            let contentWrapper = thumb.findOne((n) => n.name === "Content Wrapper" && n.type === "FRAME");
            if (!contentWrapper) {
                contentWrapper = figma.createFrame();
                contentWrapper.name = "Content Wrapper";
                thumb.appendChild(contentWrapper);
            }
            contentWrapper.layoutMode = "VERTICAL";
            contentWrapper.counterAxisSizingMode = "AUTO";
            contentWrapper.primaryAxisSizingMode = "AUTO";
            contentWrapper.fills = [];
            contentWrapper.effects = [];
            contentWrapper.x = 100;
            contentWrapper.y = 481;
            let assetTypeWrapper = thumb.findOne((n) => n.name === "Asset Type Wrapper" && n.type === "FRAME");
            if (!assetTypeWrapper) {
                assetTypeWrapper = figma.createFrame();
                assetTypeWrapper.name = "Asset Type Wrapper";
                contentWrapper.appendChild(assetTypeWrapper);
            }
            assetTypeWrapper.layoutMode = "VERTICAL";
            assetTypeWrapper.counterAxisSizingMode = "AUTO";
            assetTypeWrapper.primaryAxisSizingMode = "AUTO";
            assetTypeWrapper.fills = [];
            assetTypeWrapper.effects = [];
            assetTypeWrapper.paddingBottom = 18;
            assetTypeWrapper.paddingLeft = 30;
            assetTypeWrapper.paddingRight = 30;
            assetTypeWrapper.paddingTop = 18;
            assetTypeWrapper.strokes = [{ type: "SOLID", color: hex("#000000") }];
            assetTypeWrapper.strokeWeight = 2;
            assetTypeWrapper.strokeAlign = "INSIDE";
            assetTypeWrapper.cornerRadius = 100;
            let assetTypeText = contentWrapper.findOne((n) => n.name === "Asset Name" && n.type === "TEXT");
            if (!assetTypeText) {
                assetTypeText = figma.createText();
                yield applyText(assetTypeText, "Asset Name", "Roboto", "Testing Asset", 42, "Medium", { value: -2, unit: "PERCENT" }, "#000000");
                assetTypeWrapper.appendChild(assetTypeText);
            }
            let projectNameText = contentWrapper.findOne((n) => n.name === "Project Name" && n.type === "TEXT");
            if (!projectNameText) {
                projectNameText = figma.createText();
                yield applyText(projectNameText, "Project Name", "Roboto", "[Client Name]", 200, "Bold", { value: -2, unit: "PERCENT" }, "#000000");
                contentWrapper.appendChild(projectNameText);
            }
            // Optional: select the thumbnail so you see it
            figma.currentPage.selection = [thumb];
            // Helpers (scoped to thumbnail creation)
            function applyText(node, name, fontFamily, text, size, style, letterSpacing, colorHex) {
                return __awaiter(this, void 0, void 0, function* () {
                    yield figma.loadFontAsync({ family: fontFamily, style });
                    node.fontName = { family: fontFamily, style };
                    node.name = name;
                    node.characters = text;
                    node.fontSize = size;
                    node.letterSpacing = letterSpacing;
                    node.lineHeight = { unit: "AUTO" };
                    if (colorHex) {
                        node.fills = [{ type: "SOLID", color: hex(colorHex) }];
                    }
                });
            }
            function hex(hexStr) {
                const { r, g, b } = hexToRgb(hexStr);
                return { r: r / 255, g: g / 255, b: b / 255 };
            }
            function hexToRgb(h) {
                const s = h.replace("#", "");
                const n = parseInt(s.length === 3 ? s.split("").map((c) => c + c).join("") : s, 16);
                return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
            }
        });
    }
    // ---------- Desired structure ----------
    const STRUCTURE = [
        { type: "page", name: "Cover" },
        { type: "divider" },
        { type: "page", name: "Branding" },
        { type: "divider" },
        { type: "page", name: "Moodboard" },
        { type: "page", name: "  V0 - [Date]" },
        { type: "page", name: "  VX - [Date]" },
        { type: "divider" },
        { type: "page", name: "Pitch Deck" },
        { type: "page", name: "  V0 - [Date]" },
        { type: "page", name: "  VX - [Date]" },
        { type: "divider" },
        { type: "page", name: "Archive" },
        { type: "divider" },
    ];
    const EXTRA_PAGE_NAME = "Page";
    const MAX_TOTAL_PAGES = 300; // cap so we don't explode the file
    function isDivider(n) {
        return n && n.type === "PAGE_DIVIDER";
    }
    function findPageByName(name) {
        var _a;
        const lc = name.toLowerCase();
        const node = figma.root.children.find((n) => n.type === "PAGE" && n.name.toLowerCase() === lc);
        return (_a = node) !== null && _a !== void 0 ? _a : null;
    }
    function safeInsertAtIndex(parent, index, node) {
        const len = parent.children.length;
        if (index >= len)
            parent.appendChild(node);
        else
            parent.insertChild(index, node);
    }
    // Find the *second* page named "  V0 - [Date]"
    function getSecondV0DatePage() {
        const matches = figma.root.children.filter((n) => n.type === "PAGE" && n.name === "  V0 - [Date]");
        return matches.length >= 2 ? matches[1] : null;
    }
    // Create N slide frames on a page, arranged in a grid
    function createSlidesOnPage(page, count) {
        const W = 1920, H = 1080; // slide size
        const COLS = 3; // layout columns
        const GAP = 80; // spacing
        const START_X = 96, START_Y = 96;
        for (let i = 0; i < count; i++) {
            const f = figma.createFrame();
            f.name = `Slide ${i + 1}`;
            f.resizeWithoutConstraints(W, H);
            f.clipsContent = true;
            f.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
            const col = i % COLS;
            const row = Math.floor(i / COLS);
            f.x = START_X + col * (W + GAP);
            f.y = START_Y + row * (H + GAP);
            page.appendChild(f);
        }
    }
    // ---------- Main ----------
    figma.on("run", () => __awaiter(void 0, void 0, void 0, function* () {
        // 1) Show the UI and wait for the user's number
        figma.showUI(__html__, { width: 320, height: 320 });
        // 2) Handle the submit from UI and ONLY THEN run everything
        figma.ui.onmessage = (msg) => __awaiter(void 0, void 0, void 0, function* () {
            if ((msg === null || msg === void 0 ? void 0 : msg.type) !== "create-pitch-slides")
                return;
            const count = Math.max(1, Math.min(200, Number(msg.count) || 0));
            // --- Reuse existing REAL dividers (type === "PAGE_DIVIDER")
            const dividerPool = figma.root.children.filter(isDivider);
            // 1) Ensure items exist (append if missing)
            const orderedNodes = STRUCTURE.map((item) => {
                if (item.type === "page") {
                    let p = item.name ? findPageByName(item.name) : null;
                    if (!p) {
                        p = figma.createPage();
                        if (item.name)
                            p.name = item.name;
                        figma.root.appendChild(p);
                    }
                    else if (item.name && p.name !== item.name) {
                        p.name = item.name; // normalize
                    }
                    return p;
                }
                else {
                    // divider
                    let d = dividerPool.shift();
                    if (!d) {
                        d = figma.createPageDivider(); // when typings update, use figma.createPageDivider()
                        figma.root.appendChild(d);
                    }
                    return d;
                }
            });
            // 2) Reorder them safely to match STRUCTURE
            orderedNodes.forEach((node, i) => {
                if (figma.root.children[i] !== node) {
                    safeInsertAtIndex(figma.root, i, node);
                }
            });
            // 3) Append extra "Page" pages up to the cap
            let created = 0;
            while (figma.root.children.length < MAX_TOTAL_PAGES) {
                try {
                    const extra = figma.createPage();
                    extra.name = EXTRA_PAGE_NAME;
                    figma.root.appendChild(extra);
                    created++;
                }
                catch (_err) {
                    break; // stop if Figma refuses more pages
                }
            }
            // 4) Create slides on the second "  V0 - [Date]" page
            let target = getSecondV0DatePage();
            if (!target) {
                figma.notify('Could not find a second page named "  V0 - [Date]". Creating one.');
                target = figma.createPage();
                target.name = "  V0 - [Date]";
                figma.root.appendChild(target);
            }
            yield figma.setCurrentPageAsync(target);
            createSlidesOnPage(target, count);
            // 5) Build the Cover page thumbnail
            const cover = findPageByName("Cover");
            if (cover) {
                yield figma.setCurrentPageAsync(cover);
                yield createCoverThumbnail(cover);
            }
            figma.notify(`Structure applied. Created ${count} slides + any extra "${EXTRA_PAGE_NAME}" pages if needed.`);
            figma.closePlugin();
        });
    }));
}
// (Optional) Slides environment — nothing for now
if (figma.editorType === "slides") {
    // no-op
}
