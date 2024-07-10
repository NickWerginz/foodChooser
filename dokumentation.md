# FoodChooser - Systemdokumentation

## Anforderungen und Technologien
Die App muss mit React-Native umgesetzt und demzufolge mit JavaScript/JSX geschrieben werden. Für die Umsetzung dürfen auch Komponenten und Libraries aus dem Internet verwendet werden.
Die App soll einen echten App-Charakter und eine gute Usability aufweisen. Sie muss über mehrere Views verfügen, die untereinander verlinkt sind. Zudem müssen zwingend Sensoren in der App genutzt werden.
Für das Speichern von Daten soll die App diese dynamisch von einer Datenbank oder Datenquelle laden und beispielsweise einem REST-Service nutzen.

## Grundkonzept
FoodChooser ist eine innovative App, die es Benutzern ermöglicht, basierend auf den Zutaten, die sie bereits zu Hause haben, passende Rezepte zu finden. Das Hauptziel der App ist es, Lebensmittelverschwendung zu vermeiden und gleichzeitig kreative und leckere Mahlzeiten zu fördern. Die App bietet eine benutzerfreundliche Oberfläche, um Zutaten einzugeben, Rezepte zu durchsuchen und Lieblingsrezepte zu speichern.

## Architektur
FoodChooser verwendet die folgenden Hauptkomponenten:
- **Frontend:** Entwickelt mit React Native, um eine plattformübergreifende mobile App für iOS und Android bereitzustellen.
- **Backend:** Firebase dient als Backend-Datenbank zum Speichern von Benutzerfavoriten und Rezeptdaten.
- **APIs:** Die App integriert externe APIs wie TheMealDB, um Rezeptvorschläge basierend auf den eingegebenen Zutaten abzurufen.

### Komponenten
1. **HomeScreen:** Ermöglicht die Eingabe von Zutaten und zeigt Rezeptvorschläge an.
2. **RecipeScreen:** Zeigt die Favoritenrezepte des Benutzers an.
3. **RecipeDetailScreen:** Bietet detaillierte Anleitungen und Zutatenlisten für ausgewählte Rezepte.

## Umsetzungspunkte
- **Zutaten-Eingabe:** Benutzer können Zutaten über ein Textfeld eingeben. Die Zutaten werden lokal gespeichert und bei Bedarf abgerufen.
- **Rezeptvorschläge:** Über eine API-Anfrage an TheMealDB werden basierend auf den eingegebenen Zutaten passende Rezepte abgerufen.
- **Favoriten:** Benutzer können Rezepte durch langes Drücken als Favoriten markieren, die in Firebase gespeichert und im Favoritenbildschirm angezeigt werden.
- **Vibrationsfeedback:** Bei der Interaktion mit der App erhalten Benutzer haptisches Feedback.

# Testdokumentation

## Testkonzept
Das Testkonzept von FoodChooser zielt darauf ab, alle Kernfunktionen der App systematisch zu überprüfen, um sicherzustellen, dass sie wie erwartet funktionieren. Die Tests umfassen sowohl manuelle als auch automatisierte Tests.

### Testfälle
1. **Zutaten-Eingabe**
    - **Beschreibung:** Überprüft, ob Benutzer Zutaten eingeben und speichern können.
    - **Vorgehensweise:** Geben Sie verschiedene Zutaten in das Textfeld ein und stellen Sie sicher, dass sie in der Zutatenliste angezeigt werden.
    - **Erwartetes Ergebnis:** Alle eingegebenen Zutaten werden korrekt angezeigt und gespeichert.

2. **Rezeptvorschläge**
    - **Beschreibung:** Überprüft, ob passende Rezepte basierend auf den eingegebenen Zutaten abgerufen werden.
    - **Vorgehensweise:** Geben Sie eine Kombination von Zutaten ein und klicken Sie auf "Get Recipes".
    - **Erwartetes Ergebnis:** Eine Liste von Rezeptvorschlägen wird angezeigt.

3. **Favoriten**
    - **Beschreibung:** Überprüft die Funktion zum Hinzufügen und Anzeigen von Favoriten.
    - **Vorgehensweise:** Markieren Sie ein Rezept als Favorit durch langes Drücken und navigieren Sie zum Favoritenbildschirm.
    - **Erwartetes Ergebnis:** Das markierte Rezept wird im Favoritenbildschirm angezeigt.

4. **Rezeptdetails**
    - **Beschreibung:** Überprüft die Anzeige von Rezeptdetails.
    - **Vorgehensweise:** Klicken Sie auf ein Rezept und navigieren Sie zum Detailbildschirm.
    - **Erwartetes Ergebnis:** Die detaillierte Anleitung und Zutatenliste des Rezepts werden korrekt angezeigt.

5. **Vibrationsfeedback**
    - **Beschreibung:** Überprüft das haptische Feedback bei Interaktionen.
    - **Vorgehensweise:** Führen Sie verschiedene Interaktionen durch (z.B. langes Drücken auf ein Rezept).
    - **Erwartetes Ergebnis:** Das Gerät vibriert bei der entsprechenden Interaktion.