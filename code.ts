// Runs this code if the plugin is run in Figma
if (figma.editorType === 'figma') {
  // ===== Configure your desired page order here =====
  const PAGE_ORDER: string[] = [
    "📘 Cover",
    "🧭 Overview",
    "🔤 Styles",
    "🧩 Components",
    "🧪 Sandbox",
    "🎨 Design",
    "📱 Mobile",
    "🖥️ Desktop",
    "📝 Handoff"
  ];

  function findPageByName(name: string): PageNode | null {
    const nameLC = name.toLowerCase();
    return figma.root.children.find(p => p.name.toLowerCase() === nameLC) ?? null;
  }

  function ensurePageAtIndex(name: string, index: number): PageNode {
    let page = findPageByName(name);
    if (!page) {
      page = figma.createPage();
      page.name = name;
    }
    const currentIndex = figma.root.children.indexOf(page);
    if (currentIndex !== index) {
      figma.root.insertChild(index, page);
    }
    return page;
  }

  figma.on("run", async () => {
    if (figma.editorType !== "figma") {
      figma.notify("This plugin runs in Figma design files (not FigJam).");
      figma.closePlugin();
      return;
    }

    PAGE_ORDER.forEach((name, i) => ensurePageAtIndex(name, i));

    const first = findPageByName("🧭 Overview") || findPageByName("📘 Cover");
    if (first) await figma.setCurrentPageAsync(first);
    figma.notify(`Page structure applied.`);
    figma.closePlugin();
  });
}



// Runs this code if the plugin is run in Slides
if (figma.editorType === 'slides') {
 
}
