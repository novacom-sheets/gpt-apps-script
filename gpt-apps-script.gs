/**
 * Кастомная функция для вызова OpenAI.
 * Используется как =GPTMY("Промпт"; A1)
 */
function GPTMY(prompt, input) {
  var apiKey = "--"

  var payload = {
    "model": "gpt-4o-mini",
    "messages": [
      {
        "role": "system",
        "content": "Отвечай строго по существу. Не добавляй пояснений, вступлений или лишнего текста."
      },
      {
        "role": "user",
        "content": prompt + (input ? " " + input : "")
      }
    ],
    "temperature": 0.3
  };

  var options = {
    "method": "post",
    "headers": {
      "Authorization": "Bearer " + apiKey,
      "Content-Type": "application/json"
    },
    "payload": JSON.stringify(payload),
    "muteHttpExceptions": true
  };

  var response = UrlFetchApp.fetch("https://api.openai.com/v1/chat/completions", options);
  var json = JSON.parse(response.getContentText());

  try {
    return json.choices[0].message.content.trim();
  } catch (e) {
    return "Ошибка: " + response.getContentText();
  }
}
