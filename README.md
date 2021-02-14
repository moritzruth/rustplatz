# RUSTplatz
> (Inoffizielle) Website für das Rust-Projekt von Dhalucard, Bonjwa und RocketBeans

:fire: [**rustplatz.live**](https://rustplatz.live)

Die Seite listet die Teams auf und zeigt, welche Streamer gerade mit Rust live sind.
Außerdem gibt es für jedes Team einen multitwitch.tv Link.

## Mithelfen

### Teams
Die Team-Daten sind in [`data.json`](./data.json) gespeichert.

Bitte beachte folgendes, wenn du einen Pull Request erstellst:
- Die ID eines Teams (`id`) wird nur intern verwendet und darf nicht mehr verändert werden, sobald das Team existiert. Der konkrete Wert ist egal, er muss allerdings einzigartig sein.
- Der Twitch-Name muss exakt dem entsprechen, der auf twitch.tv angezeigt wird,
  d. h. **Groß- und Kleinschreibung muss beachtet werden**.
- Wenn statt einem Objekt mit den Keys `displayed`, `twitch` und `game` ein String verwendet wird,
  wird dieser für alle drei Werte benutzt.
- Wenn du weißt, dass ein Streamer mitspielt, jedoch noch nicht seinen In-Game-Namen herausfinden konntest,
  füge ihn trotzdem hinzu und schreibe seinen Namen in die Liste unter diesem Text.
- Wenn der RP-Charakter einen anderen Namen hat als der Spieler selbst und der eigentliche Name des Spielers im
  In-Game-Namen enthalten ist, lass den Teil weg.  
  Beispiel: Statt `V. Popowitch | thekraeuterbutter` nur `V. Popowitch`,
  aber trotzdem `Hauptkommissar Dhalucard` und nicht `Hauptkommissar`.

### Ereignisse
Ereignisse sind in [`src/assets/static-data.json`](./src/assets/static-data.json) gespeichert.

Beispiel:
```json
{
  "events": [
    {
      "date": "Dies ist das Datum. Es ist bewusst nur ein Text und kein Zeitstempel. Sollte möglichst kurz gehalten werden.",
      "text": "Dies ist der Text, der unter dem Datum angezeigt wird."
    },
    {
      "date": "Mittwoch 3.2., 20 Uhr",
      "text": "Season-Finale, danach Wipe und Pause bis 7.2."
    }
  ],
  "nextSeasonDate": null
}
```

Ereignisse müssen manuell entfernt werden, sobald sie nicht mehr relevant sind.

## In-Game Name nicht überprüft
- JuliJones
- Dave (eventuell ist er doch Streamer)
- Filow
- Doom Design

## Notizen

- `scheppertlive2` wird wieder auf `scheppertlive` streamen, sobald er wieder Zugriff hat.
- Balui hat Kommissar falsch geschrieben, das wird er eventuell bald korrigieren.
- DoomDesign hat gesagt, dass er bald einem Team beitreten wird.
