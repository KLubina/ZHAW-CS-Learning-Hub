# Lokale Dateien öffnen (Voraussetzungen)

Da einige Studienmaterialien (wie PDF-Skripte) lokal auf dem Computer gespeichert sind, blockieren moderne Browser (insbesondere Firefox) aus Sicherheitsgründen standardmäßig den direkten Zugriff über `file:///`-Links aus dem Web.

Um die PDFs direkt über die Buttons im Studienplan öffnen zu können, wird folgende Erweiterung benötigt:

## 1. Browser-Erweiterung installieren

Installiere die Erweiterung **"Local Filesystem Links"** für deinen Browser (z.B. Firefox).

## 2. Native Application installieren (Wichtig!)

Damit die Erweiterung die Erlaubnis hat, lokale Programme auf deinem Rechner aufzurufen, musst du das dazugehörige kleine Host-Programm installieren:

1. Gehe in die Optionen der installierten Erweiterung.
2. Lade die **native application** ("Native Client") für dein Betriebssystem (Windows, Linux oder Mac) herunter.
3. Führe die Installation aus.

## 3. Whitelist konfigurieren

Damit die Links korrekt auf unserer Seite funktionieren, muss die lokale Webadresse zur Whitelist der Erweiterung hinzugefügt werden:

1. Öffne die Einstellungen der Erweiterung (Klick auf das Icon in der Menüleiste -> "Change settings...").
2. Füge unter **Whitelist** die (lokale) Adresse des Studienplans hinzu. Das Format sieht wie folgt aus:
   - Für den Live-Server: `http://127.0.0.1/*`
   - _(Hinweis: Ports wie `:5501` müssen weggelassen werden.)_
3. Speichere die Einstellungen.

---

**Tipp:** Falls du PDFs direkt in einem neuen Browser-Tab statt in einem externen PDF-Reader wie Acrobat oder PDF Xpert öffnen möchtest, musst du in Windows deinen Webbrowser als **Standard-App für .pdf-Dateien** festlegen.
