- REST-интерфейс - <WEBUI_PORT>/api/emails
- Swagger — <WEBUI_PORT>/swagger-ui/index.html

For example

```sh
curl smtp://localhost:<SMTP_PORT> --mail-from example@mail.me --mail-rcpt some@mail.local --upload-file ./email.txt
```

email.txt

```
From: user
To: other
Subject: Hello
Date: Mon, 12 Dec 2022 08:00:00
Content-Type: text/html; charset=utf8

<html>
<body>
Hello!
</body>
</html>
```
