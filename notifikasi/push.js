var webPush = require('web-push');
const vapidKeys = {
   "publicKey": "BKK0dI1e_L0OT-8z362ejXEU3LqlXyyM7j74SuWEfvroT9WMDwIUsheVC_UMmd0kYgbfUdPpC9zv-fQKSaD-Q9s",
   "privateKey": "YR2fP63nw9m5whmvCek7HcKcVE2si4YDr7eFsJPFE_4"
};
webPush.setVapidDetails(
   'mailto:pancasila@indonesia.com',
   vapidKeys.publicKey,
   vapidKeys.privateKey
);
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/er7oTaEkrJg:APA91bGtPVvu-NylEIs0EXLngg5Ccqi3Kcney-B7ShtSzfRDIcg-fj85RHYd3CLhug_zbE6a6FO7JV92IYY-kGsDCJpCmM0KdtkpVuHQxCZEz_scGZZXhgb6VMvbFDXxKqoT-nV9bd1K",
   "keys": {
       "p256dh": "BLr5P69t1DIZ160Q4RcPcqPlcad9aAt3Kl3S4UT8bS7OdfxM7rQet/q8qzesQ4yCbolArNHkWmZU81HCp4jbuLk=",
       "auth": "JFQdemtkkSJ5l5P7kD66aQ=="
   }
};
var payload = 'Woi.. iki onok data anyar lho';
var options = {
   gcmAPIKey: '508637733990',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);