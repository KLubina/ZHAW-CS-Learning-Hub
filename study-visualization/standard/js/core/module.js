/**
 * MODULE RENDERING - Modul-Darstellung
 */

window.StudienplanModule = {
  hasMaterialClickListener: false,

  initialize() {
    if (this.hasMaterialClickListener) return;

    document.addEventListener("click", (event) => {
      const button = event.target.closest(".module-material-button");
      if (!button) return;

      event.preventDefault();
      event.stopPropagation();

      const materialPath = button.getAttribute("data-material-path");
      if (!materialPath) return;

      this.openMaterial(materialPath);
    });

    this.hasMaterialClickListener = true;
  },

  getModuleMaterialEntries(moduleName) {
    const details = window.StudiengangModuleDetails?.[moduleName];
    if (!details || !details.vorlesungsmaterial) return [];

    if (Array.isArray(details.vorlesungsmaterial)) {
      return details.vorlesungsmaterial
        .map((entry) => String(entry).trim())
        .filter(Boolean);
    }

    return String(details.vorlesungsmaterial)
      .split("\n")
      .map((entry) => entry.trim())
      .filter(Boolean);
  },

  escapeAttribute(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  },

  toFileHref(path) {
    const trimmedPath = String(path || "").trim();
    if (!trimmedPath) return "";

    if (/^(https?:|file:|vscode:)/i.test(trimmedPath)) {
      return trimmedPath;
    }

    if (/^[a-zA-Z]:\\/.test(trimmedPath)) {
      const normalized = trimmedPath.replace(/\\/g, "/");
      const segments = normalized.split("/");
      const drive = segments.shift();
      const driveLetter = drive ? drive.charAt(0).toUpperCase() : "C";
      const encodedPath = segments
        .map((segment) => encodeURIComponent(segment))
        .join("/");
      return `file:///${driveLetter}:/${encodedPath}`;
    }

    return trimmedPath;
  },

  copyPathFallback(path) {
    const text = String(path || "").trim();
    if (!text) return;

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          console.info("Pfad in Zwischenablage kopiert:", text);
        })
        .catch(() => {
          window.prompt("Pfad kopieren:", text);
        });
      return;
    }

    window.prompt("Pfad kopieren:", text);
  },

  showBlockedFileHint(fileHref, originalPath) {
    const message =
      "Der Browser blockiert lokale file:/// Links aus http:// Seiten. " +
      "Ich habe den Pfad bereitgestellt, damit du ihn direkt im Explorer oder Browser öffnen kannst.";
    console.warn(message, fileHref);
    window.prompt(
      "Lokalen Link/Pfad manuell öffnen:",
      fileHref || originalPath,
    );
  },

  tryOpenHref(href) {
    try {
      const opened = window.open(href, "_blank", "noopener");
      return !!opened;
    } catch (error) {
      console.warn("Lokaler Link konnte nicht direkt geöffnet werden:", error);
      return false;
    }
  },

  openMaterial(path) {
    const trimmedPath = String(path || "").trim();
    if (!trimmedPath) return;

    const targetHref = this.toFileHref(trimmedPath);
    const opened = this.tryOpenHref(targetHref);

    if (opened) return;

    if (
      targetHref.toLowerCase().startsWith("file:///") &&
      /^https?:$/i.test(window.location.protocol)
    ) {
      this.showBlockedFileHint(targetHref, trimmedPath);
      this.copyPathFallback(trimmedPath);
      return;
    }

    this.copyPathFallback(trimmedPath);
  },

  renderMaterialButtons(moduleName) {
    const materials = this.getModuleMaterialEntries(moduleName);
    if (materials.length === 0) return "";

    const buttonsHtml = materials
      .map((materialPath, index) => {
        const escapedPath = this.escapeAttribute(materialPath);
        const label = materials.length > 1 ? `M${index + 1}` : "PDF";
        return `<button type="button" class="module-material-button" data-material-path="${escapedPath}" title="Vorlesungsunterlagen öffnen">${label}</button>`;
      })
      .join("");

    return `<div class="module-material-buttons">${buttonsHtml}</div>`;
  },

  // Erstelle HTML für ein einzelnes Modul
  renderModule(module) {
    const ects = module.ects || 0;
    const category = module.standardcategory || "unknown";
    const name = module.name || "Unbekanntes Modul";

    // Berechne Größe basierend auf ECTS (4 ECTS = 100px)
    const baseSize = 100;
    const scale = Math.sqrt(ects / 4);
    const size = baseSize * scale;
    const style = `width: ${size}px; height: ${size}px;`;

    // Platzhalter-Module speziell markieren
    let placeholderClass = "";
    let wahlmodulSourceAttr = "";
    if (module.isPlaceholder && module.wahlmodulSource) {
      placeholderClass = "modul-platzhalter";
      wahlmodulSourceAttr = `data-wahlmodul-source="${module.wahlmodulSource}"`;
    }

    const materialButtons = this.renderMaterialButtons(name);

    return `
            <div class="modul ${category} ${placeholderClass}" data-ects="${ects}" style="${style}" ${wahlmodulSourceAttr}>
                <div class="modul-titel">${name}</div>
                <div class="modul-kp">${ects} KP</div>
                ${materialButtons}
            </div>
        `;
  },

  // Erstelle HTML für eine Semester-Liste von Modulen
  renderSemesterModules(modules) {
    return modules.map((module) => this.renderModule(module)).join("");
  },
};

window.StudienplanModule.initialize();

// Markiere als geladen
window.subModulesReady.module = Promise.resolve();
