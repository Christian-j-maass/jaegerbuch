# Regelprüfung vor dem Spieltermin 24.10.2026

Stand: 23.10.2026, Profil-Regelstand `2026-10-23.1`.
Basis der Änderung: `0021cdfda0100095f6e6d5ad49a583e48bdcb2cc`.
Die veröffentlichte zweistufige Charakterauswahl und die danach vorgenommenen Kopfzeilenkorrekturen bleiben erhalten.

## Quellen und Prüfumfang

Die drei bereitgestellten PDFs wurden vollständig als Text/Formularwerte gelesen; Caprices Seiten 1–2 sowie die Werte-/Waffenseiten von Hagen und Maximilian zusätzlich bildlich geprüft. Die Original-PDFs werden nicht in das öffentliche Repository kopiert.

| Quelle | Verwendete Seiten | SHA-256 |
| --- | --- | --- |
| `Caprice_2.pdf` | 1–2, Formularwerte und sichtbarer Bogen | `cfd5b5211f8215bd8a08419f18b29fb2101ae181da9541bf983e27b74e955284` |
| `US81064PDF_Einsteigerset_Charakterbogen_Hagen_meta.pdf` | 2–3: Werte, Waffen, Ressourcen; 6: Entwicklung; 6–7: Kräfte/Ausrüstung | `89037491dcf4c640bc4cd341c20e67019c1e1547d3252ebbbce01a55ea619134` |
| `US81064PDF_Einsteigerset_Charakterbogen_Maximilian_meta.pdf` | 2–3: Werte, Waffen, Ressourcen; 6: Entwicklung; 6–7: Kräfte/Ausrüstung | `e30e455a04c2a9f99c445d6e3dce79aaa3ac9b5e98fe577c5de9358eb097988e` |
| Mali | Vorhandene `MALI_BASIS` / `MALI_AUFSTIEGE` im Hauptbranch | **Kein Originalbogen im verfügbaren Bestand auffindbar.** Die Suche in Dateien und früherem Kontext ergab nur App-Screenshots. Unabhängige Papierprüfung bleibt offen. |

Bei Mali wurden sämtliche vorhandenen Werte, Fertigkeiten, Waffen, Ressourcen, Ausrüstung und Freischaltungen geprüft und gegen unbeabsichtigte Änderungen abgesichert. Diese Regression ist ausdrücklich keine neue Bestätigung der Originalregeln. Malis Profildaten bleiben unverändert.

## Korrigierte und bestätigte Werte

Attributreihenfolge: Kkr / Ath / Ges / Sin / Wis / Wil.

| Profil / Spielstufe | Attribute | Lep | Initiative | Pw / Ap | Coups / Ideen | Startgeld / Unterhalt |
| --- | --- | ---: | ---: | --- | --- | --- |
| Mali 3 | 5 / 3 / 2 / 3 / 5 / 4 | 16 | 5 | 2 / 4 | 3 / 6 | 155 / 50 |
| Mali 4 | 5 / 3 / 2 / 3 / 5 / 4 | 16 | 5 | 2 / 4 | 3 / 6 | 155 / 50 |
| Mali 5 | 5 / 3 / 2 / 3 / 5 / 4 | 17 | 5 | 2 / 4 | 3 / 6 | 155 / 50 |
| Caprice 3, 4, 5 – jeweils Bogen Stufe 2 | 3 / 4 / 5 / 4 / 2 / 3 | 13 | 9 | 2 / 4 | 5 / 2 (*) | 90 / 140 |
| Hagen 3, 4, 5 | 3 / 3 / 5 / 5 / 4 / 2 | 13 | 11 | 1 / 5 | 3 / 4 | 195 / 130 |
| Maximilian 3, 4 | 5 / 3 / 2 / 3 / 4 / 5 | 18 | 5 | 3 / 3 | 3 / 5 | 245 / 50 |
| Maximilian 5 | 5 / 3 / 2 / 3 / 4 / 5 | 19 | 5 | 3 / 3 | 3 / 5 | 245 / 50 |

Geldbeträge in Gulden. Alle zwölf Profile: 2 EH- und 4 MH-Kästchen. Sonderressourcen werden nicht aus nicht angekreuzten Feldern erfunden.

### Caprice

- Initiative 5 → 9, Sin 3 → 4, Wis 3 → 2, Wil 2 → 3; Ideen 3 → 2. Unterhalt und Vermögen wieder richtig zugeordnet: 140 / 90.
- Name aus dem Bogen: Catherine de Montclair. Technischer Schlüssel `catherine` bleibt bestehen, damit gespeicherte Figuren weiter gefunden werden.
- Sämtliche 16 Fertigkeiten aus ihrem eigenen Bogen übernommen, einschließlich Alchemistisches/Mystisches/Praktisches Wissen, Recherche, Seefahrt und Land und Leute. Keine unbelegten Kategorien/Fertigkeitswerte aus Malis Vorlage.
- Dolche Fw 2, Pistole Fw 2, Schwerter Fw 0. Der Säbel wird unter Schwerter geführt, wie im Bogen angekreuzt. Dessen Schaden beträgt hier 4; der Musketenschaden dieses Bogens beträgt 9. Auch nicht besessene Waffen führen die Werte dieses Bogens.
- Fausthieb, Dolch, Schwerter/Säbel, Pistole und Ausweichen sind verfügbar. Reisekleidung, Lederkoller und Labor sind aufgeführt. Keine erfundenen Gift-Stückzahlen.
- Drei belegte Kräfte: Meister der Dolche, Gifte herstellen, Teufelsaustreibung. Keine neuen Kräfte oder Werte für Spielstufen 3–5.
- Stufe-2-Hinweis erscheint in der Stufenwahl und dauerhaft unter dem Charakternamen.

(*) **Quellenabweichung bei Coups:** Der Bogen enthält Basisfeld 4, aktuelles Feld 5 und Motivation „Unbeugsam (Coups +1)“. Die App verwendet weiterhin 5 als regenerierenden Wert aus Ath 4 + Motivationsbonus 1. Diese Interpretation wird in der App angezeigt; sie ist keine Aufstiegssteigerung. Falls die Spielleitung strikt das separate Basisfeld 4 verwenden möchte, kann sie die Bogenwerte bearbeiten.

**Weitere Unsicherheit:** Die Kleidung nennt „+2 Lep“, gleichzeitig sind Lep und Basis-Lep ausdrücklich mit 13 eingetragen. Die App übernimmt 13 und addiert die 2 nicht nochmals. Eine andere Lesart benötigt eine Entscheidung am Spieltisch. Vorhandene Gifte sind nicht eindeutig als Stückzahl markiert; kein automatisches Auffüllen.

### Hagen

- Initiative 6 → 11: Original Stufe 2 = 10, auf Stufe 3 durch Ges 4 → 5 nochmals +1. Wachsam nicht doppelt zählen.
- Pw 0 → 1; 5 Ap bleiben. Schwerter Fw 0 → 2.
- Muskete Stufe 3: Fw 2 (Summe 7); erst Stufe 4: Fw 3 (Summe 8).
- Elixiere herstellen ab 3, Scharfschütze ab 4, Unscheinbar ab 5. Stufe 5: Schleuder Fw 3 (Summe 8); davor Fw 2 (Summe 7).
- Handwerkerkleidung mit +2 Janus-Bonus auf Handwerken ergänzt; zu Spielbeginn jeweils 3 Brandgeschosse, Blitzgeschosse und Wurfgranaten als Ausrüstung dokumentiert. Freischaltung der Elixierherstellung erzeugt keine fertigen Elixiere.
- Feuerregen mit 3 Ap hinterlegt. Fausthieb und Ausweichen wieder verfügbar.
- **Druckfehler im Original:** Die Erklärung nennt 3 Coups, fordert danach aber 2 Marker. Tabelle und Ath 3 bestätigen 3; die App verwendet 3.

### Maximilian

- Schwerter Stufe 3: Fw 2 (Summe 7); erst ab 4 Fw 3 (Summe 8). Gegenschlag erst ab 4.
- Schwachstelle erkennen ab 3, einschließlich dauerhaft +1 Idee durch Rüstkunde. Daher **5 Ideen sind korrekt**, obwohl der Stufe-2-Bogen 4 nennt.
- Stufe 5: Unempfindlichkeit 2, Muskelspiel 1, Lep 19 und Neu formieren.
- Gardeuniform-Bonus auf Parade/Schildbenutzung und Dominant-Erstattungswurf als Bogenhinweise ergänzt. Dies sind Janus-Boni, keine Erhöhung der grünen Würfelzahl.
- Fausthieb und Ausweichen wieder verfügbar.

## Spielstandschutz und bewusste Übernahme

Neue Figuren erhalten die korrigierten Werte. Bereits gespeicherte Profile werden beim Charakterwechsel nicht ersetzt. Ein Hinweis bietet für die drei betroffenen Profile **„Korrigierte Bogenwerte übernehmen“** an, mit Bestätigung vor dem Ersetzen eigener Bogenänderungen.

Diese Aktion ersetzt statische Profildaten. Die vollständigen Spielzustände bleiben erhalten: aktuelle Lep, Ap, Coups/Ideen, Puffer, Einflüsse, Heilkästchen, Kampfstatus, Buchungen, Merkzettel und Logbuch. Auch das bisher gebuchte Startgeld wird nicht still verändert. Bei alten Caprice-Spielständen ist deshalb ggf. eine bewusst gebuchte Kassenkorrektur erforderlich (altes Startgeld 140 statt 90: Differenz −50, sofern die 140 tatsächlich gebucht waren).

Zusätzlich behoben:

1. Merkzetteltexte werden vor einem schnellen Wechsel gespeichert und können nicht mehr durch einen verzögerten Callback beim nächsten Jäger landen.
2. Eine absichtlich geleerte Buchungsliste bleibt leer. Beim Anzeigen oder Wechsel wird Startgeld nicht erneut eingebucht.
3. Ungültige Profil-IDs und Stufen werden ohne Änderung des Buchs verworfen.

## Automatisierte Prüfung

- `npm test`: 18 Tests. Alle zwölf Kombinationen werden einzeln gegen unabhängige Erwartungen geprüft: Attribute, Lep, Initiative, Pw/Ap, Ressourcen, sämtliche Fertigkeitswerte, Waffenwerte/Schäden/Ap/Attribute/Besitz, Ausrüstung und Freischaltstufen. Hinzu kommen Speicher-, Korrektur- und Merkzettelregressionen.
- `npm run test:browser`: echter Chromium-Browser, mobiler Viewport 390 × 844. Alle zwölf Kombinationen durch die zweistufige Oberfläche auswählen, alle fünf Reiter rendern, horizontales Überlaufen und JavaScript-Fehler prüfen. Spielstände wechseln und neu laden; schnelle Merkzetteleingabe sowie Zurück/Abbruch prüfen.
- Extern reproduzierbar: `npm install --no-save playwright`, `npx playwright install chromium`, danach `npm run test:browser`. Mit `JAEGERBUCH_URL=https://christian-j-maass.github.io/jaegerbuch/` dieselbe Prüfung gegen die tatsächlich ausgelieferte Fassung ausführen. `CHROMIUM_EXECUTABLE_PATH` optional für einen bereits installierten Browser.
- GitHub Actions führt die 18 Node-Tests bei Push und Pull Request aus, ohne weitere Paketinstallation.

**Grenzen:** Die App bleibt eine Spielhilfe mit manuell geführten Würfeln und Markern, keine vollständige Regelautomatisierung. Janus-Boni, bedingte Espritwirkungen und verbrauchte Geschosse/Gifte sind entsprechend den Hinweisen am Spieltisch zu verwalten. Mobile Prüfung ist eine Chromium-Emulation, kein Test auf einem physischen iPhone/Safari. Malis unabhängiger Originalbogen-Abgleich und Caprices Aufstiege bleiben offen.


## Tatsächliches Prüfergebnis der Veröffentlichung

- Release-Commit: [`fcc34ae54545df0ae620e24b31f589f52b19810e`](https://github.com/Christian-j-maass/jaegerbuch/commit/fcc34ae54545df0ae620e24b31f589f52b19810e).
- Lokal: 18/18 Node-Regressionstests erfolgreich; alle zwölf Kombinationen im mobilen Chromium-Browser erfolgreich.
- [GitHub-Hauptbranch-CI](https://github.com/Christian-j-maass/jaegerbuch/actions/runs/40018329989): erfolgreich.
- [GitHub-Pages-Build und Deployment](https://github.com/Christian-j-maass/jaegerbuch/actions/runs/40018329218): erfolgreich.
- [Ausgelieferte Anwendung](https://christian-j-maass.github.io/jaegerbuch/): HTTP 200. Der Git-Blob-Hash des heruntergeladenen HTML ist `ca95e1f6170f1628294004ced0a672f5472eee79` und stimmt exakt mit der lokal getesteten und veröffentlichten `index.html` überein.
- Gegen diese tatsächlich ausgelieferte Fassung erneut alle zwölf Kombinationen im Viewport 390 × 844 durch die Oberfläche geprüft: erfolgreich. Alle fünf Reiter, Speichern/Wechsel/Neuladen, schnelle Merkzetteleingabe, Zurück/Abbruch und Caprices Warnhinweis erfolgreich; keine JavaScript-Seitenfehler und kein horizontales Überlaufen.
- Die Prüfung verwendete eine neue, isolierte Browsersitzung mit synthetischen Spielständen. Bestehende persönliche Browserdaten wurden nicht angefasst.
