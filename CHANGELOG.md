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
