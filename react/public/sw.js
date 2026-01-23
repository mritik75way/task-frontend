self.addEventListener("install", event => {
  self.skipWaiting(); 
});

self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());        
});

self.addEventListener("push", event => {

  let data = { title: "Fallback", body: "No payload" };

  if (event.data) {
    try {
      data = event.data.json();
    } catch {
      data = {
        title: "Raw push",
        body: event.data.text(),
      };
    }
  }

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      requireInteraction: true,
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const targetUrl = "/notifications"; 

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === targetUrl && "focus" in client) {
          return client.focus();
        }
      }

      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});


