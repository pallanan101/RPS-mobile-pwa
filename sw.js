// This file listens for push events from the backend even when the PWA is closed
self.addEventListener('push', function (event) {
  if (event.data) {
    const data = event.data.json();
    
    const options = {
      body: data.body || 'You have a new notification.',
      icon: '/assets/images/icon.png', // Ensure this path matches your Expo exported icon
      badge: '/assets/images/icon.png',
      vibrate: [100, 50, 100],
      data: { url: data.url || '/' }
    };

    // Physically draw the notification on the device
    event.waitUntil(self.registration.showNotification(data.title || 'RPS Notification', options));
  }
});

// Handle what happens when the user taps the notification
self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  // Open the app or specific chat screen
  event.waitUntil(clients.openWindow(event.notification.data.url));
});