



// export async function requestBackgroundSync() {
//     const registration = await navigator.serviceWorker.ready;
//     await registration.sync.register('my-tag-name');
// }

// navigator.serviceWorker.ready.then(registration => {
//     if (registration.sync) {
//         // Periodic Background Sync is supported.
//         console.log("ayeee")
//     } else {
//         // Periodic Background Sync isn't supported.
//         console.log("nope")
//     }
// });





export  async function registerPeriodicSync() {
    await registration.periodicSync.register('get-daily-news', {
        minInterval: 24 * 60 * 60 * 1000
    });

    console.log("ayeee")
}