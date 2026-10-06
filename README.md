# MONEY · ALEX HUB — PWA personale (v0.1.0)

MONEY è il modulo **money** della futura suite ALEX HUB. App web statica, senza backend e senza conti bancari collegati. Pensata prima di tutto per **iPhone 17 Pro**, utilizzabile anche da browser su Windows. Licenze, abbonamenti tecnici e servizi cloud necessari: **0 €**.

## 1. Funzioni disponibili

- Inserimento, modifica ed eliminazione di spese, entrate e giroconti fra conti.
- Conti/portafogli configurabili con saldo iniziale, saldo aggiornato e archiviazione.
- Categorie di entrata e spesa; sottocategorie con gerarchia. Le categorie utilizzate si possono archiviare mantenendo lo storico.
- Budget per mese, globale e/o per categoria; indicatori di limite, utilizzo e residuo.
- Obiettivi di risparmio con saldo accantonato **manuale e separato dalla contabilità**.
- Dashboard con mese selezionabile, dati del giorno, saldo mensile, grafico entrate/spese 3/6/12 mesi, scadenze e abbonamenti.
- Elenco movimenti con ricerca per descrizione/categoria/conto/data, filtri tipologia, conto, categoria, intervallo di date e lista progressiva.
- Ricorrenze settimanali, mensili, annuali e personalizzate (ogni N giorni/settimane/mesi/anni); inizio, fine facoltativa, pausa, ripresa, disdetta, modifica serie e modifica/salto di **una futura occorrenza**.
- Recupero automatico delle scadenze maturate quando si apre o si riporta in primo piano l'app, con anti-duplicazione per coppia `recurrenceId:occurrenceDate`.
- Previsioni a 60 giorni; somma dei costi degli abbonamenti previsti nei prossimi 365 giorni.
- Segnalazione di spese potenzialmente anomale, basata sulla mediana della categoria.
- Wishlist facoltativa con prezzo, priorità, scadenza e stato completato.
- Export JSON completo, CSV dei movimenti, report stampabile/salvabile come PDF tramite stampa nativa del browser.
- Export di payload integrazione ALEX HUB; API interna nella pagina `window.MoneyBridge`.

**Nessun dato finanziario personale viene inviato a un nostro server.** Il codice è statico, i dati rimangono nella memoria del browser su quel dispositivo.

## 2. Installazione su iPhone — zero euro

### Importante per GitHub
Nel repository **non caricare lo ZIP come unico file** e non lasciare tutti i file dentro una sottocartella `MONEY_v0.1.1/`. La root del repository deve contenere direttamente `index.html`, `manifest.webmanifest`, `sw.js`, `css/`, `js/`, `assets/` e gli altri file del progetto. Se manca `js/` la pagina resta senza logica applicativa; dalla v0.1.1 viene mostrato un errore diagnostico.

Non basta aprire `index.html` nell'app File: per il Service Worker e la PWA serve un'origine **HTTPS** (oppure `localhost` per test sul computer).

1. Sul PC Windows, estrai lo ZIP e verifica che `index.html`, `manifest.webmanifest`, `sw.js`, `css/`, `js/`, `assets/` siano nella stessa cartella di progetto.
2. Pubblica **solo i file dell'app, mai i tuoi backup** su un hosting statico HTTPS gratuito, ad esempio GitHub Pages. Con GitHub Pages in un repository pubblico il **codice** è pubblico, ma i dati che digiti nell'app non vengono caricati nel repository.
3. Apri l'URL HTTPS in **Safari** su iPhone.
4. Menu Condividi → **Aggiungi alla schermata Home** → Aggiungi. Apri MONEY dall'icona creata.
5. Dopo la prima visita con Internet, l'app e le sue risorse vengono memorizzate per l'uso offline. Prova la modalità aereo dopo averla aperta e caricata almeno una volta.
6. Vai in **Altro → Esporta backup JSON completo** e conserva backup regolari nell'app **File** (idealmente iCloud Drive).

L'indirizzo URL dell'hosting deve rimanere stabile. Cambiare dominio, sottopercorso o modalità di apertura può far apparire un archivio vuoto perché cambia l'origine di archiviazione.

### Avvio locale su Windows

Se Python è installato:

```bash
cd MONEY_v0.1.0
python -m http.server 8080
```

Apri `http://localhost:8080` sul computer. Test automatici (facoltativi, richiedono Node.js): `npm test`. La PWA installata su iPhone deve essere servita tramite HTTPS, non attraverso la cartella File.

## 3. Albero del progetto

```text
MONEY_v0.1.0/
├── index.html                  # App HTML semantica e contenitori
├── manifest.webmanifest        # Identità PWA, icone e scope
├── sw.js                       # Cache offline dell'app shell
├── css/styles.css              # Interfaccia mobile, stampa A4
├── assets/                     # Icone PWA e Apple touch icon
├── js/
│   ├── core/
│   │   ├── constants.js        # Versioni, namespace, seed iniziale
│   │   ├── date.js             # Operazioni calendario/ancoraggio
│   │   ├── money.js            # Centesimi interi, format, mediana
│   │   ├── recurrence.js       # Pianificazione, eccezioni, registrazione
│   │   ├── analytics.js        # Budget, bilanci, trend, anomalie
│   │   └── schema.js           # Validazione/import JSON
│   ├── storage/
│   │   ├── db.js               # IndexedDB + fallback localStorage
│   │   └── repository.js       # Commit serializzati e salvataggio
│   ├── services/
│   │   ├── backup.js           # JSON/CSV, import, dati HUB
│   │   └── integration.js      # Contratti ALEX HUB
│   └── ui/
│       ├── charts.js           # Grafici SVG senza dipendenze
│       └── app.js              # Presentazione, form, comandi, report
├── tests/core.test.mjs         # Test logica di dominio
├── package.json               # Esecuzione test
├── CHANGELOG.md
└── README.md
```

## 4. Identità e storage

| Proprietà | Valore |
|---|---|
| `moduleId` | `money` |
| `appVersion` | `0.1.0` |
| `schemaVersion` | `1` |
| Database IndexedDB | `alex.money.db` |
| Object store IndexedDB | `alex.money.state` |
| Chiave record | `alex.money.root` |
| Fallback `localStorage` | `alex.money.fallback` |
| Cache Service Worker | `alex.money.shell.v0.1.0` |

Salvataggio per snapshot: lo stato completo viene scritto in una transazione IndexedDB atomica e serializzata. Il fallback localStorage viene usato **solo se IndexedDB non è disponibile**. I due archivi non sono automaticamente sincronizzati tra loro. `schemaVersion` è indipendente da `appVersion`.

## 5. Schema dei dati

Il contenuto dello stato è `{settings, data, metadata}`.

- `settings`: `currency='EUR'`, `locale='it-IT'`, `anomalyMultiplier`, `anomalyMinimumCents`.
- `data.accounts[]`: `id`, `name`, `openingBalanceCents` (anche negativo), `archived`, `createdAt`.
- `data.categories[]`: `id`, `name`, `type='income'|'expense'`, `parentId` nullable, `archived`.
- `data.transactions[]`: `id`, `date` (`YYYY-MM-DD`), `kind='income'|'expense'|'transfer'`, `amountCents`, `accountId`, `toAccountId` nullable, `categoryId` nullable, `note`, `recurrenceId`/`occurrenceDate` facoltativi, `createdAt`, `updatedAt`.
- `data.budgets[]`: `id`, `month` (`YYYY-MM`), `categoryId` nullable (null = generale), `limitCents`.
- `data.goals[]`: `id`, `title`, `targetCents`, `savedCents`, `deadline` nullable.
- `data.recurrences[]`: `id`, `title`, `kind`, `amountCents`, `accountId`, `categoryId`, `unit='day'|'week'|'month'|'year'`, `interval`, `startDate`, `endDate` nullable, `isSubscription`, `status='active'|'paused'|'cancelled'`, `pausePeriods`, `cancelledAt`, `exceptions` (per data programmata), timestamp.
- `data.wishlist[]`: `id`, `title`, `amountCents`, `plannedDate` nullable, `priority`, `done`.
- `metadata`: `createdAt`, `lastUpdatedAt`, `lastOpenedDate`, `revision`.

**Moneta:** centesimi interi in storage per evitare arrotondamenti floating point, sempre EUR in v0.1.0. **Date:** giorno civile locale `YYYY-MM-DD`; calcoli calendario UTC per evitare cambi ora legale. Le scadenze al 29/30/31 vengono adattate all'ultimo giorno del mese corto e **restano ancorate al giorno originale** nei mesi successivi.

**Contabilità:** entrate aumentano il saldo del conto, spese lo diminuiscono, giroconti spostano denaro tra due conti e **non** influenzano il risultato del mese. Risparmio del mese = entrate meno spese, non trasferimenti. Il risparmio assegnato a un obiettivo è manuale e non si sottrae dal saldo.

**Budget:** se esiste il budget generale, il residuo della dashboard si calcola su tutte le spese. Se esistono soltanto budget per categoria, il residuo si riferisce **solo alle categorie coperte**. Non è consentito assegnare contemporaneamente budget alla categoria padre e alla sua sottocategoria nello stesso mese per evitare doppi conteggi.

**Anomalie:** confronto con almeno 4 spese precedenti nella stessa categoria durante i 12 mesi precedenti, segnalazione se la spesa supera `anomalyMultiplier` × mediana e `anomalyMinimumCents`.

## 6. Formato JSON export / import

```json
{
  "moduleId": "money",
  "appVersion": "0.1.0",
  "schemaVersion": 1,
  "exportedAt": "2026-10-06T09:00:00.000Z",
  "settings": {"currency":"EUR","locale":"it-IT","anomalyMultiplier":2,"anomalyMinimumCents":2000},
  "data": {"accounts":[],"categories":[],"transactions":[],"budgets":[],"goals":[],"recurrences":[],"wishlist":[]},
  "metadata": {"createdAt":"...","lastUpdatedAt":"...","lastOpenedDate":"...","revision":0}
}
```

L'esempio mostra soltanto la **struttura**: un import reale deve avere almeno un conto, categorie e riferimenti coerenti. Il parser rifiuta moduli diversi da MONEY, ID doppi, date impossibili, riferimenti errati, importi non interi e versioni schema non compatibili. Import **sostitutivo**: salva un backup prima di importare. Il commit è atomico; in caso di validazione fallita non sovrascrive il database. Il codice è predisposto a migratori espliciti: in questa prima release **non ci sono schemi MONEY precedenti** da migrare; una futura `schemaVersion=2` richiederà una funzione di migrazione controllata. Non vengono tentate conversioni automatiche di formato ignoto.

## 7. Contratti di integrazione ALEX HUB

Le funzioni sono esportate in `js/services/integration.js` ed esposte nella stessa pagina come `window.MoneyBridge`. Le chiavi contengono dati locali reali; nessun HUB deve supporre che MONEY sia installata.

### TODAY contract — `getTodaySummary(day?)`

Ritorna ad esempio:

```json
{
  "title":"MONEY",
  "status":"ok",
  "priority":"normal",
  "shortText":"Oggi 12,50 € · mese 423,50 €",
  "actionLabel":"Aggiungi spesa",
  "actionTarget":"./?action=add-expense",
  "timestamp":"2026-10-06"
}
```

Lo status diventa `warning` per budget superato, `attention` in presenza di un prossimo addebito entro 3 giorni. Le priorità possibili sono `high`, `medium`, `normal`.

### INSIGHTS contract — `getInsights(day?)`

Restituisce array di righe `{timestamp, metricId, value, unit, category, sourceModule}`. Metriche: `monthly_spend`, `monthly_income`, `monthly_savings` per gli ultimi 12 mesi, `avg_spend_3m`, `avg_spend_6m`, `avg_spend_12m`, `daily_spend`, `anomaly_count`, `budget_remaining` quando presente. I valori monetari INSIGHTS sono **euro** (`unit='EUR'`), non centesimi.

### HUB SUMMARY — `getHubSummary(day?)`

Ritorna 2–5 elementi `{metricId,label,value,unit,timestamp?}`. Indicatori: spesa mensile, risparmio netto mensile, budget residuo se definito, prima scadenza futura se presente, numero anomalie. I valori monetari interni del sommario HUB sono centesimi (`unit='EUR_CENTS'`), espliciti; l'HUB deve convertirli quando visualizza.

### EVENTS — `getEvents(day?)`

Array `{eventId,sourceModule,type,title,startAt,endAt?,priority,completed?}` per prossime ricorrenze (60 giorni) e acquisti pianificati con data (60 giorni). Event IDs deterministici (serie + data) ove possibile.

### QUICK ACTIONS — `getQuickActions()`

`[{"id":"add-expense","label":"Aggiungi spesa","actionTarget":"./?action=add-expense"}]`.

### Integrazione cross-app reale

JavaScript di due PWA installate su **origini diverse** non può leggere direttamente IndexedDB o `window.MoneyBridge` dell'altra a causa dell'isolamento del browser. Questa release fornisce il contratto e l'**export JSON di integrazione**. Per un futuro TODAY/ALEX HUB servirà un canale esplicito e autorizzato (import/export JSON, flusso di condivisione, o architettura sotto la stessa origine) senza imporre ora server o dipendenze. L'azione relativa `./?action=add-expense` va risolta rispetto all'URL base pubblico di MONEY.

## 8. Ricorrenze: semantica e limiti

- Una regola attiva genera transazioni con data programmata fino a oggi **all'apertura / ritorno in primo piano**. Il salvataggio include chiavi anti-duplicato.
- Una pausa registra un intervallo di date escluso dalle nuove occorrenze. Riprendendo, le date saltate durante la pausa non vengono recuperate.
- La disdetta blocca le occorrenze future e non cancella lo storico già generato.
- Cambiare importo, nome, conto, categoria di una serie applica i cambiamenti alle **future transazioni non ancora generate**. Le passate restano immutate.
- Cambiare data iniziale/intervallo/unità di una serie conclude la vecchia serie e ne avvia una nuova **non prima di domani**, per evitare il doppio conteggio nel giorno di modifica.
- La modifica di una singola **futura** occorrenza riguarda titolo, importo, conto e categoria, oppure può saltare quella scadenza. La modifica individuale della **data di pagamento** non è ancora implementata: si può saltare la scadenza e registrare un movimento manuale nella data desiderata.
- Le ricorrenze registrate automaticamente **non equivalgono a un addebito bancario verificato**: se una spesa non è avvenuta bisogna correggere/eliminare la relativa registrazione.
- Non esistono notifiche push né esecuzioni garantite quando l'app è chiusa; le PWA iOS non offrono un timer locale affidabile in background.
- Il costo abbonamenti è la somma delle future occorrenze marcate `isSubscription` nei prossimi **365 giorni**, non una promessa di spesa reale.

## 9. Limiti noti v0.1.0

1. Disponibile solo EUR. Nessuna sincronizzazione automatica tra iPhone/PC, nessuna autenticazione, nessuna integrazione bancaria.
2. **I dati possono andare persi** se Safari/iOS elimina i dati del sito o se si cambia origine; esportare periodicamente JSON in File/iCloud Drive è fondamentale. I backup non sono cifrati dall'app (trattarli come dati sensibili).
3. Le automazioni non eseguono in background a PWA chiusa, né inviano promemoria di pagamento di sistema.
4. Report PDF tramite finestra di stampa/salvataggio PDF di Safari/browser, non generazione binaria diretta di un file `.pdf` con libreria dedicata.
5. Si possono modificare importi/conti/categorie delle singole future occorrenze, **non spostarne la data**. Non ci sono revisioni contabili/audit trail delle modifiche.
6. La previsione mostra fino a 60 giorni; gli abbonamenti sono conteggiati a 365 giorni. Per regole quotidiane molto vecchie la generazione ha un limite di sicurezza di 25.000 occorrenze per regola.
7. La ricerca non comprende OCR, ricevute né documenti allegati: si usa l'app File nativa per i documenti.
8. IndexedDB e fallback localStorage sono archivi alternativi non sincronizzati; il fallback serve a impedire un blocco totale dove possibile.
9. La validazione controlla struttura e coerenza, ma **non** costituisce cifratura o protezione contro l'accesso fisico al dispositivo.
10. I test automatici sono eseguiti sul motore JavaScript; la UI è stata verificata in un browser Chromium, non ancora collaudata direttamente su Safari/iPhone 17 Pro.

## 10. Piano delle prossime milestone

- **v0.1.1 (questo ZIP):** struttura e prototipo completo delle sezioni principali; storage locale, ricorrenze, dashboard, contratti HUB, backup e test.
- **v0.2.0:** test reali su iPhone, correzioni UX Safari, modifica della data delle occorrenze, import CSV guidato opzionale e migliore gestione multi-tab.
- **v0.3.0:** riconciliazione delle registrazioni ricorrenti con addebiti effettivi, statistiche avanzate e PDF diretto opzionale senza dipendenze a pagamento.
- **v1.0.0:** dopo test sul dispositivo e verifica completa dei casi limite.

## 11. Checklist manuale consigliata su iPhone

- Installa da Safari HTTPS, disattiva la rete e ricarica: la Home deve aprirsi.
- Registra un'entrata, una spesa e un giroconto; verifica i saldi di entrambi i conti.
- Crea una ricorrenza con inizio precedente a oggi, chiudi/riapri, controlla che non compaiano duplicati.
- Metti in pausa una ricorrenza, riprendila e controlla la previsione.
- Imposta budget generale e per categoria, poi registra una spesa e controlla i residui.
- Esporta JSON; importa il backup in un'installazione di test e confronta saldi/ricorrenze.
- Esporta CSV e salva il report tramite Stampa → PDF/File.
- Cambia mese e confronta grafico 3/6/12 con la lista movimenti.

---

Questo progetto non richiede la presenza di TODAY, INSIGHTS o altre app ALEX HUB, e non legge dati da altre app.


## Conti & portafogli · v0.3.0

- Conti configurabili con tipo: spese, risparmio, contanti o altro.
- Saldo iniziale e saldo corrente calcolato dai movimenti.
- Ogni entrata/spesa richiede il conto di accredito/addebito.
- Trasferimenti tra conti con origine e destinazione, esclusi dai totali di spesa/entrata mensile.
- Dashboard con saldi dei conti, spese mensili per conto e spese per categoria/settore.
- Filtri movimenti per conto.
- Budget chiarito come limite volontario di spesa mensile; 0 disattiva il limite.
- Migrazione automatica dei vecchi conti allo schemaVersion 2.
