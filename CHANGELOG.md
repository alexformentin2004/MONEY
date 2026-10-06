## 0.8.0 - 2026-10-06

- Categorie/sottocategorie gestibili e archiviabili.
- Nuovo schema dati 3 con migrazione automatica.
- Limiti di spesa per categoria.
- Storico mensile.
- Scheda dettaglio conto e conto preferito.
- Ricorrenze con previsioni 7/30/60 giorni ed equivalente mensile.
- Analisi avanzata 3/6/12 mesi, top spese e salute finanziaria.
- Inserimento rapido, suggerimenti dallo storico e duplicazione movimento.
- Ricerca globale.
- Report PDF/stampa professionale ampliato.
- Backup/import aggiornati ai nuovi dati.

## 0.5.0 - 2026-10-06

- Aggiunta schermata Esporta & Backup.
- Backup completo JSON migliorato.
- CSV selezionabile per mese o storico completo.
- Report mensile dedicato pronto per stampa/PDF.
- Import backup con validazione e conferma.
- Reset completo con doppia protezione tramite parola RESET.

## 0.4.0 - 2026-10-06

- Dashboard iniziale compatta.
- Launcher a pulsanti per accedere alle funzioni principali.
- Nuove schermate dedicate: Conti, Limite spesa, Risparmio, Analisi e Wishlist.
- Navigazione inferiore semplificata.
- Ridotto lo scrolling nella Home e separati i contenuti analitici.

## 0.3.0 - 2026-10-06

- Nuovo modello Conti & portafogli con tipo, saldo iniziale, stato attivo/archiviato e saldo calcolato.
- Selezione conto obbligatoria per entrate e spese.
- Trasferimenti conto → conto senza impatto su spesa/entrata mensile.
- Analisi mensili per settore/categoria e per conto.
- Filtro movimenti per conto.
- Budget rinominato e spiegato come limite spesa mensile.
- schemaVersion 2 con migrazione automatica.

# MONEY Changelog

## 0.1.0 — 2026-10-06

- Prima release PWA senza dipendenze e con schermate Home, Movimenti, Ricorrenze, Piani, Altro.
- Contabilità conti, entrate/spese, giroconti, filtri, categorie e sottocategorie.
- Budget, obiettivi, wishlist, confronto entrate/spese 3/6/12 mesi.
- Ricorrenze con avanzamento per giorno civile, giorni mese corti, eccezioni singole, pause e disdette, previsioni.
- Export/import JSON con schema validation, CSV, report print/PDF, payload per ALEX HUB.
- Contratti TODAY/INSIGHTS/HUB/EVENTS/QUICK ACTIONS.
- IndexedDB con namespace e fallback localStorage; cache PWA offline.
- Test per date, idempotenza ricorrenze, giroconti, budget, anomalie, validazione backup.

## 0.1.1 — 2026-10-06
- Pacchetto di distribuzione preparato con contenuti direttamente alla radice dello ZIP.
- Aggiunta diagnostica di avvio: se `js/ui/app.js` o altre risorse non vengono caricate, MONEY mostra un messaggio utile invece di restare su “Caricamento dati locali…”.
- Nessuna modifica allo schema dati (`schemaVersion` resta 1).
