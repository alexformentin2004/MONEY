## 0.12.1 - 2026-10-06

- Home ridisegnata con maggiore fedeltà al render approvato.
- Hero Patrimonio totale con trend reale a 6 mesi.
- Delta patrimonio vs mese precedente.
- KPI Home premium con accenti pastello.
- Card dedicate per prossimo addebito e settore principale.
- Strumenti compatti in griglia 4×2.
- Ridotto il rumore informativo della dashboard.
- Dock inferiore più premium/flottante.
- Nessuna modifica allo schema dati; schemaVersion resta 6.

## 0.12.0 - 2026-10-06

- Restyling grafico completo di MONEY.
- Nuovo tema premium light fintech mint.
- Card più marcate e ombre più visibili.
- Header chiaro traslucido.
- Hero card patrimonio/saldi ridisegnata.
- Launcher e KPI riallineati al nuovo design system.
- Liste, conti, Auto, Analisi, Ricorrenze, Export e Altro uniformati.
- Form, modali, filtri, badge, tag e toast ridisegnati.
- Bottom navigation aggiornata con FAB centrale.
- Navigazione rapida: Home, Movimenti, Analisi, Risparmio.
- Nessuna modifica allo schema dati; schemaVersion resta 6.

## 0.11.0 - 2026-10-06

- Obiettivi di risparmio collegabili ai conti.
- Insight automatici mensili.
- Import CSV guidato con anteprima, mapping e deduplicazione.
- Archivio eventi HUB con eventId/sourceModule/syncStatus.
- Privacy mode per nascondere importi e saldi.
- KPI Home personalizzabili (2-4).
- Nuova suite di test di regressione.
- GitHub Action automatica per npm test.
- Financial Bridge esteso con syncStatus.
- schemaVersion 6.

## 0.10.0 - 2026-10-06

- Contratto HUB finanziario generico.
- API getFinancialEvents(), upsertFinancialEvent(), getIntegrationContract().
- Stati confirmed/planned/cancelled e origine dei movimenti.
- Forecast cash-flow 30/60/90 giorni.
- Chiusura mensile con snapshot aggiornabile.
- Merchant/esercente separato dalla nota.
- Tag liberi.
- Ultimo backup e promemoria backup.
- Controllo integrità dati.
- Dashboard annuale.
- Backup JSON e CSV aggiornati.
- Report mensile esclusivamente sui movimenti effettivi.
- schemaVersion 5.
- Non aggiunta gestione carte di credito/debiti/passività, come richiesto.

## 0.9.0 - 2026-10-06

- MONEY resa AUTO-ready.
- Nuova categoria Auto con costi veicolo strutturati.
- Separata la categoria Trasporti dai costi auto.
- Aggiunta gestione riferimenti veicolo.
- I movimenti possono essere collegati ad AUTO con eventId e vehicleId.
- Campi specifici per carburante/ricarica, litri/kWh, prezzo unitario, chilometraggio, pieno e fornitore.
- Nuova schermata Auto con costi mensili, veicoli e breakdown per tipo.
- Backup JSON e CSV estesi ai dati AUTO.
- Report mensile con sezione Auto.
- Bridge AlexMoneyIntegration con getVehicleCostEvents() e upsertVehicleCostEvent().
- Deduplicazione futura MONEY ↔ AUTO tramite eventId.
- schemaVersion 4.

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
